const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter with debug and logger enabled
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 465,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // full email address
    pass: process.env.EMAIL_PASS, // app password if using Gmail with 2FA
  },
  logger: true, // logs all info to console
  debug: true,  // shows SMTP communication
});

// Verify transporter connection (optional, runs once on server start)
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection verification failed:', error);
  } else {
    console.log('SMTP server is ready to send emails');
  }
});

const sendQuoteConfirmationEmail = async (recipientEmail, subject, htmlBody) => {
  // Basic email validation before sending
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!recipientEmail || !emailRegex.test(recipientEmail)) {
    throw new Error('Invalid or missing recipient email address.');
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: recipientEmail,
      subject,
      html: htmlBody,
    });

    console.log(`Email sent successfully to ${recipientEmail}:`, info.messageId);
    return info;
  } catch (error) {
    console.error(`Error sending email to ${recipientEmail}:`, error);
    throw error;
  }
};

module.exports = { sendQuoteConfirmationEmail };
