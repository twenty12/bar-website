import axios from "axios";
import { Performer } from "../src/types";
import { FormData, sendSlackNotification } from "../src/utils/slack";


const TRIPLESEAT_ENDPOINT = "https://api.tripleseat.com/v1/leads/create.js";
const LEAD_FORM_ID = "39986"; // Replace with your lead form ID
const PUBLIC_KEY = "01683b91c20e1a591c21d494b005770328f7b207"; // Replace with your public key

export default async function handler(req: any, res: any): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { honeypot } = req.body;
  const performer: Performer = req.body;
  console.log(performer);
  if (honeypot) {
    res.status(400).json({ error: "Bot detected" });
    return;
  }

  try {
    // Extract form data from request body
    const formData: FormData = req.body;

    // Validate required fields
    const requiredFields = ["first_name", "last_name", "email_address", "phone_number", "event_date", "guest_count"];
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        res.status(400).json({ error: `Missing required field: ${field}` });
        return;
      }
    }

    // Send data to TripleSeat
    const queryParams = new URLSearchParams({
      lead_form_id: LEAD_FORM_ID,
      public_key: PUBLIC_KEY,
    }).toString();

    const response = await axios.post(
      `${TRIPLESEAT_ENDPOINT}?${queryParams}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const tripleseatResponse = response.data;

    // Check for errors in TripleSeat response
    if (tripleseatResponse?.errors) {
      res.status(400).json({
        error: "Failed to submit lead to TripleSeat.",
        details: tripleseatResponse.errors,
      });
      return;
    }

    // Send a Slack notification if submission is successful
    await sendSlackNotification(formData);

    res.status(200).json({
      message: "Lead data successfully sent to TripleSeat and Slack notification sent.",
      success_message: tripleseatResponse.success_message,
      lead_id: tripleseatResponse.lead_id,
    });
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Internal server error.",
      details: error.response?.data || error.message,
    });
  }
}