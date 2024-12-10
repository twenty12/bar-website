import axios from "axios";
import { Event, Performer } from "../src/types";

const apiKey = "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";
const eventsDatabaseId = "14e8ffc87fdb80419951d3dbca333c62";
const performersDatabaseId = "1578ffc87fdb80c1850dc0747e46e6f3"
const notionApi = axios.create({
  baseURL: "https://api.notion.com/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
  },
});
async function fetchPerformers(): Promise<Record<string, Performer>> {
  const response = await notionApi.post(`/databases/${performersDatabaseId}/query`);
  const performers: Record<string, Performer> = {};
  
  response.data.results.forEach((performer: any) => {
    const id = performer.id;
    console.log(performer.properties)
    performers[id] = {
      id: id,
      name: performer.properties.Name?.title[0]?.text?.content,
      instagram: performer.properties.Instagram?.rich_text[0]?.plain_text,
    };
  });

  return performers;
}


export default async (req:any, res:any) => {
    if (req.method !== 'GET') {
      return res.status(405).end
    }
    const performersMap = await fetchPerformers();
    const response = await notionApi.post(`/databases/${eventsDatabaseId}/query`);
    console.log(response.data.results[0].properties.Description.rich_text[0]?.plain_text)
    const events: Event[] = response.data.results.map((event: any) => ({
      id: event.id,
      thumbnail: event.properties.Poster?.files[0]?.file?.url || null,
      title: event.properties.Name?.title[0]?.text?.content || "Untitled",
      date: event.properties.Date?.date?.start || null,
      description: event.properties.Description.rich_text[0]?.plain_text || null,
      performers: event.properties.Performers?.relation.map((performer: any) => performersMap[performer.id]) || [],
    }));
    events.sort((a, b) => {
      if (!a.date || !b.date) return 0; // Handle null dates
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  
    res.status(200).json(events);
};