import axios from "axios";
import { Event } from "../src/types";

const apiKey = "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";
const eventsDatabaseId = "14e8ffc87fdb80419951d3dbca333c62";
const notionApi = axios.create({
  baseURL: "https://api.notion.com/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
  },
});


export default async (req:any, res:any) => {
    if (req.method !== 'GET') {
      return res.status(405).end
    }
    const response = await notionApi.post(`/databases/${eventsDatabaseId}/query`);
    const events: Event[] = response.data.results.map((event: any) => ({
      id: event.id,
      thumbnail: event.properties.Poster?.files[0]?.file?.url || null,
      title: event.properties.Name?.title[0]?.text?.content || "Untitled",
      date: event.properties.Date?.date?.start || null,
      description: event.properties.Description.rich_text[0]?.plain_text || null,
      visible: event.properties['Display on Website']?.checkbox || false,
      ticketUrl: event.properties['Ticket Link']?.url || null,
      visisble: false,
      performers: event.properties.Performers?.relation.map((performer: any) => performer.id) || [],
    }));
    const visibleEvents: Event[] = events.sort((a, b) => {
      if (!a.date || !b.date) return 0; // Handle null dates
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }).filter(event => event.visible)
    res.status(200).json(visibleEvents);
};