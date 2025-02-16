import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.NOTION_API_KEY;
const eventsDatabaseId = "14e8ffc87fdb80419951d3dbca333c62";

const notionApi = axios.create({
  baseURL: "https://api.notion.com/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      title,
      date,
      description,
      ticketUrl,
      performers,
      postImageUrl,
    } = req.body;
    console.log(req.body);
    const notionPayload = {
        parent: { database_id: eventsDatabaseId },
        properties: {
          Name: { title: [{ text: { content: title } }] },
          Date: date ? { date: { start: date } } : undefined,
          Description: description ? { rich_text: [{ text: { content: description } }] } : undefined,
          "Ticket Link": ticketUrl ? { url: ticketUrl } : undefined,
          Performers: {
            relation: performers?.map((id: string) => ({ id })) || [],
          },
          Poster: postImageUrl
            ? {
                files: [
                  {
                    type: "external",
                    external: { url: postImageUrl },
                    name: postImageUrl.split("/").pop() || "poster-image.jpg", // ✅ Add name for Notion API validation
                  },
                ],
              }
            : undefined,
        },
      };
    console.log(notionPayload);

    const response = await notionApi.post("/pages", notionPayload);
    res.status(201).json({ message: "Event added successfully", data: response.data });
  } catch (error: any) {
    console.error("Error adding event to Notion:", error.response?.data || error);
    res.status(500).json({ error: "Failed to add event to Notion" });
  }
}