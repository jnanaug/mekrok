const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { normalizeQuotePayload } = require('./src/utils/normalizeQuotePayload');
const { sendQuoteConfirmationEmail } = require('./src/utils/emailService');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001; // Use Render's PORT env var or fallback

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parser

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const otpStore = {}; // In-memory store for OTPs: { email: { code: '123456', expires: Date } }

function normalizeFields(data) {
  // This function is not used in the provided code, but it's part of the edit hint.
  // Keeping it as is, but it won't be called.
  return data;
}

// Quotes API routes
app.get('/api/quotes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/quotes", async (req, res) => {
  try {
    let payload = req.body;
    payload = normalizeQuotePayload(payload);

    const { data, error } = await supabase
      .from("quotes")
      .insert([payload]);

    if (error) throw error;
    
    try {
      const confirmationSubject = 'Your Quote Request Has Been Sent!';
      const confirmationHtmlBody = `
        <p>Dear ${payload.contact_name || 'Customer'},</p>
        <p>Thank you for your quote request. We have received your submission and are processing it.</p>
        <p>Here are some of the details you provided:</p>
        <ul>
          <li>Company: ${payload.company_name || 'N/A'}</li>
          <li>Equipment Items: ${payload.equipment_items ? payload.equipment_items.map(item => `${item.quantity} x ${item.brand} ${item.model}`).join(', ') : 'N/A'}</li>
          <li>Urgency: ${payload.urgency || 'N/A'}</li>
        </ul>
        <p>Our team will review your request and get back to you shortly.</p>
        <p>Best regards,</p>
        <p>The Mekrok Mining Equipment Team</p>
      `;
      await sendQuoteConfirmationEmail(payload.email, confirmationSubject, confirmationHtmlBody);
    } catch (emailError) {
      console.error("Failed to send quote confirmation email:", emailError);
      // Optionally, you might want to log this but still return success for the quote submission
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("API Error in POST /api/quotes:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  // Basic email format validation (more robust regex is in frontend)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expires = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes

    otpStore[email] = { code: otp, expires };

    // Send OTP via email
    const otpSubject = 'Your OTP for Mekrok Mining Equipment';
    const otpHtmlBody = `
      <p>Dear Customer,</p>
      <p>Your One-Time Password (OTP) is: <strong>${otp}</strong>. It is valid for 5 minutes.</p>
      <p>Please use this code to verify your email address.</p>
      <p>Best regards,</p>
      <p>The Mekrok Mining Equipment Team</p>
    `;
    await sendQuoteConfirmationEmail(email, otpSubject, otpHtmlBody);

    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: error.message || 'Failed to send OTP.' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required.' });
  }

  const storedOtp = otpStore[email];

  if (!storedOtp || storedOtp.code !== otp) {
    return res.status(401).json({ error: 'Invalid OTP.' });
  }

  if (new Date() > storedOtp.expires) {
    delete otpStore[email]; // Clear expired OTP
    return res.status(401).json({ error: 'OTP expired.' });
  }

  // OTP is valid and verified, clear it from store
  delete otpStore[email];
  res.status(200).json({ message: 'OTP verified successfully.' });
});

app.put('/api/quotes', async (req, res) => {
  try {
    const { id, ...updates } = req.body;
    const normalizedUpdates = normalizeQuotePayload(updates);
    const { data: updatedQuote, error: updateError } = await supabase
      .from('quotes')
      .update(normalizedUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (updateError) throw updateError;
    return res.status(200).json(updatedQuote);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.delete('/api/quotes', async (req, res) => {
  try {
    const { id: deleteId } = req.query; // Assuming ID is passed as a query parameter for DELETE
    const { error: deleteError } = await supabase
      .from('quotes')
      .delete()
      .eq('id', deleteId);

    if (deleteError) throw deleteError;
    return res.status(204).end(); // No content for successful deletion
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Add a root route to prevent 404 for basic requests
app.get('/', (req, res) => {
  res.status(200).send('Backend server is running.');
});

// Start the server
app.listen(port, () => {
});
