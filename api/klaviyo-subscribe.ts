import axios from "axios";

const KLAVIYO_ENDPOINT = "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs";
const API_KEY = "pk_1d75b3a026aaf0e2be6ca07f217d62c955"; // Replace with your Klaviyo private API key
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!API_KEY) {
    console.error("Klaviyo API Key is missing.");
    return res.status(500).json({ error: "Internal server error. Missing API Key." });
  }

  try {
    const {
      email_address,
      first_name,
      last_name,
      sms_number,
      email_consent = "SUBSCRIBED",
      sms_consent = "SUBSCRIBED",
      list_id,
    } = req.body;

    if (!email_address || !list_id) {
      return res.status(400).json({
        error: "Missing required fields: email_address and list_id are mandatory.",
      });
    }

    const payload = {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: {
                  email: email_address,
                  first_name,
                  last_name,
                  subscriptions: {
                    email: {
                      marketing: {
                        consent: email_consent,
                      },
                    },
                    ...(sms_number && {
                      sms: {
                        marketing: {
                          consent: sms_consent,
                        },
                      },
                    }),
                  },
                },
              },
            ],
          },
          historical_import: false,
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: list_id,
            },
          },
        },
      },
    };

    const response = await axios.post(KLAVIYO_ENDPOINT, payload, {
      headers: {
        Authorization: `Klaviyo-API-Key ${API_KEY}`,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Revision: "2024-10-15", // Add the required revision header
      },
    });

    const klaviyoResponse = response.data;

    if (klaviyoResponse?.errors) {
      return res.status(400).json({
        error: "Failed to subscribe user to Klaviyo.",
        details: klaviyoResponse.errors,
      });
    }

    return res.status(200).json({
      message: "Subscriber successfully added to Klaviyo.",
      success_message: klaviyoResponse.success_message,
    });
  } catch (error) {
    console.error("Error adding subscriber to Klaviyo:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Failed to add subscriber to Klaviyo.",
      details: error.response?.data || error.message,
    });
  }
}