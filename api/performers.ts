import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Performer } from "../src/types";

const apiKey = process.env.NOTION_API_KEY;
const performersDatabaseId = "1578ffc87fdb80c1850dc0747e46e6f3";

const notionApi = axios.create({
  baseURL: "https://api.notion.com/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  },
});

function cleanInstagramHandle(handle: string): string {
  if (!handle) return "";
  handle = handle.replace(/(https?:\/\/)?(www\.)?(instagram\.com\/|ig\.me\/|instagr\.am\/)/i, "");
  handle = handle.split(/[/?#]/)[0];
  return handle.replace("@", "").trim();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const response = await notionApi.post(`/databases/${performersDatabaseId}/query`);
      const performers: Performer[] = response.data.results.map((performer: any) => ({
        id: performer.id,
        name: performer.properties.Name?.title[0]?.text?.content,
        instagram: cleanInstagramHandle(performer.properties.Instagram?.rich_text[0]?.plain_text || ""),
        imageUrl: performer.properties.Image?.files[0]?.file?.url || null,
        isHost: performer.properties["Is a host"].checkbox,
      }));

      return res.status(200).json(performers);
    } catch (error: any) {
      console.error("Error fetching performers from Notion:", error.response?.data || error);
      return res.status(500).json({ error: "Failed to fetch performers" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, instagram } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      const cleanedInstagram = instagram ? cleanInstagramHandle(instagram) : "";

      const notionPayload = {
        parent: { database_id: performersDatabaseId },
        properties: {
          Name: { title: [{ text: { content: name } }] },
          Instagram: cleanedInstagram ? { rich_text: [{ text: { content: cleanedInstagram } }] } : undefined,
        },
      };

      const response = await notionApi.post("/pages", notionPayload);
      console.log("Added performer to Notion:", response.data);
      return res.status(201).json({ message: "Performer added successfully", data: response.data });
    } catch (error: any) {
      console.error("Error adding performer to Notion:", error.response?.data || error);
      return res.status(500).json({ error: "Failed to add performer" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}