import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const KLAVIYO_ENDPOINT = "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs";
const API_KEY = process.env.KLAVIYO_API_KEY;

type ProfileAttributes = {
  email?: string;
  phone_number?: string;
  subscriptions?: {
    email?: {
      marketing: {
        consent: string;
      };
    };
    sms?: {
      marketing: {
        consent: string;
      };
    };
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!API_KEY) {
    console.error("Klaviyo API Key is missing.");
    return res.status(500).json({ error: "Internal server error. Missing API Key." });
  }

  try {
    const { email_address, sms_number, list_id } = req.body;

    if (!email_address && !sms_number) {
      return res.status(400).json({
        error: "Missing required fields: either email_address or sms_number is required.",
      });
    }

    const profileAttributes: ProfileAttributes = {};
    if (email_address) {
      profileAttributes.email = email_address;
      profileAttributes.subscriptions = {
        email: {
          marketing: {
            consent: "SUBSCRIBED",
          },
        },
      };
    }
    if (sms_number) {
      profileAttributes.phone_number = sms_number;
      profileAttributes.subscriptions = {
        ...(profileAttributes.subscriptions || {}),
        sms: {
          marketing: {
            consent: "SUBSCRIBED",
          },
        },
      };
    }

    const payload = {
      data: {
        type: "profile-subscription-bulk-create-job",
        attributes: {
          profiles: {
            data: [
              {
                type: "profile",
                attributes: profileAttributes,
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
        Revision: "2024-10-15",
      },
    });

    const klaviyoResponse = response.data;
    console.log("Klaviyo Response Body:", response.data);

    if (klaviyoResponse?.errors) {
      console.error("Error subscribing user to Klaviyo:", klaviyoResponse.errors);
      return res.status(400).json({
        error: "Failed to subscribe user to Klaviyo.",
        details: klaviyoResponse.errors,
      });
    }
    if (response.status === 200) {
      console.log("Subscriber successfully added to Klaviyo.");
      console.log(klaviyoResponse.success_message);
    }
    return res.status(200).json({
      message: "Subscriber successfully added to Klaviyo.",
      success_message: klaviyoResponse.success_message,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      return res.status(500).json({
        error: "Failed to add subscriber to Klaviyo.",
        details: error.response?.data || error.message,
      });
    } else if (error instanceof Error) {
      console.error("General error:", error.message);
      return res.status(500).json({
        error: "Failed to add subscriber to Klaviyo.",
        details: error.message,
      });
    } else {
      console.error("Unknown error:", error);
      return res.status(500).json({
        error: "An unknown error occurred.",
      });
    }
  }
}