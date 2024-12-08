import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const notionAPIKey ='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'
const databaseId = '14e8ffc87fdb80419951d3dbca333c62'

const notionApi = axios.create({
  baseURL: `https://api.notion.com/v1/databases/${databaseId}/query`,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
  },
});

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const response = await notionApi.post({});
    const events = response.data.results.map((event: any) => ({
      id: event.id,
      title: event.properties.Name?.title[0]?.text?.content || "Untitled",
      date: event.properties.Date?.date?.start || null,
    }));

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching Notion calendar:", error);
    res.status(500).json({ error: "Error fetching Notion calendar" });
  }
};