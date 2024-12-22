import axios from "axios";

const TRIPLESEAT_ENDPOINT = "https://api.tripleseat.com/v1/leads/create.js";
const LEAD_FORM_ID = "39986"; // Replace with your lead form ID
const PUBLIC_KEY = "01683b91c20e1a591c21d494b005770328f7b207"; // Replace with your public key

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { honeypot } = req.body;
  if (honeypot) {
    return res.status(400).json({ error: "Bot detected" });
  }
  try {
    const {
      first_name,
      last_name,
      email_address,
      phone_number,
      event_date,
      guest_count,
      event_description,
      additional_information,
      company,
      contact_preference,
      location_id,
      start_time,
      end_time,
      email_opt_in = true, // Defaults to true
      gdpr_consent_granted = 1, // Defaults to 1 for GDPR compliance
      event_style,
    } = req.body;

    // Validate required fields
    const requiredFields = {
      first_name,
      last_name,
      email_address,
      phone_number,
      event_date,
      guest_count,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(400).json({ error: `Missing required field: ${key}` });
      }
    }

    // Prepare query parameters
    const queryParams = new URLSearchParams({
      lead_form_id: LEAD_FORM_ID,
      public_key: PUBLIC_KEY,
    }).toString();

    // Prepare payload for Tripleseat
    const payload = {
      first_name,
      last_name,
      email_address,
      phone_number,
      event_date,
      guest_count,
      event_description,
      additional_information,
      company,
      contact_preference,
      location_id,
      start_time,
      end_time,
      email_opt_in,
      gdpr_consent_granted,
      event_style,
    };

    // Send data to Tripleseat
    const response = await axios.post(`${TRIPLESEAT_ENDPOINT}?${queryParams}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const tripleseatResponse = response.data;
    if (tripleseatResponse?.errors) {
      // If errors exist in the response, send a 400 error back to the client
      return res.status(400).json({
        error: "Failed to submit lead to TripleSeat.",
        details: tripleseatResponse.errors,
      });
    }

    if (!tripleseatResponse?.success_message) {
      // If there is no success message, handle as an unexpected response
      return res.status(500).json({
        error: "Unexpected response from TripleSeat.",
        details: tripleseatResponse,
      });
    }

    // If the request was successful
    return res.status(200).json({
      message: "Lead data successfully sent to TripleSeat.",
      success_message: tripleseatResponse.success_message,
      lead_id: tripleseatResponse.lead_id,
    });
  } catch (error: any) {
    console.error("Error sending lead to TripleSeat:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to send lead data to TripleSeat.",
      details: error.response?.data || error.message,
    });
  }
}