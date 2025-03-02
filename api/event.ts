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

// Fetch a single event
async function fetchEvent(eventId: string) {
  const response = await notionApi.get(`/pages/${eventId}`);
  return response.data;
}

// Create a new event
async function createEvent(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, date, description, ticketUrl, performers, postImageUrl } = req.body;

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
                  name: postImageUrl.split("/").pop() || "poster-image.jpg",
                },
              ],
            }
          : undefined,
      },
    };

    const response = await notionApi.post("/pages", notionPayload);
    res.status(201).json({ message: "Event added successfully", data: response.data });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ error: "Failed to add event" });
  }
}

// Update an existing event
async function updateEvent(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { eventId } = req.query;
    const { title, date, description, ticketUrl, performers, postImageUrl } = req.body;

    if (!eventId) return res.status(400).json({ error: "Event ID is required" });

    const notionPayload = {
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
                  name: postImageUrl.split("/").pop() || "poster-image.jpg",
                },
              ],
            }
          : undefined,
      },
    };

    await notionApi.patch(`/pages/${eventId}`, notionPayload);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await createEvent(req, res);
  } else if (req.method === "PUT") {
    await updateEvent(req, res);
  } else if (req.method === "GET") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Event ID is required" });

    try {
      const event = await fetchEvent(id as string);
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}