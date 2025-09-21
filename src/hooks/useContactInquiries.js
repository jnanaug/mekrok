import { useState } from "react";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const useContactInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitInquiry = async (inquiryData) => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Validate required fields
      if (!inquiryData.email || !inquiryData.name) {
        throw new Error("Missing required fields: name or email");
      }

      // ✅ Only send variables your template expects
      const templateParams = {
        from_name: inquiryData.name.trim(),
        from_email: inquiryData.email.trim(),
        phone: inquiryData.phone || "Not provided",
        company: inquiryData.company_name || "Not provided",
        subject: inquiryData.subject?.trim() || "No subject",
        message: inquiryData.message?.trim() || "No message",
      };

      // ✅ Send email
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // ✅ Handle success
      if (response.status >= 200 && response.status < 300) {
        setInquiries((prev) => [...prev, inquiryData]);
        setLoading(false);
        return { data: inquiryData, error: null };
      }

      throw new Error(`Request failed with status ${response.status}`);
    } catch (err) {
      console.error("EmailJS Error:", {
        error: err,
        inquiryData,
      });
      setError(err?.message || "Failed to send message");
      setLoading(false);
      return { data: null, error: err?.message || "Failed to send message" };
    }
  };

  return {
    inquiries,
    loading,
    error,
    submitInquiry,
  };
};
