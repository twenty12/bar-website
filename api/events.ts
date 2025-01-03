import axios from "axios";
import { Event } from "../src/types";
import moment from 'moment';

const apiKey = "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";
const eventsDatabaseId = "14e8ffc87fdb80419951d3dbca333c62";
const notionApi = axios.create({
  baseURL: "https://api.notion.com/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
  },
});

function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}


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
      slug: slugify(event.properties.Name?.title[0]?.text?.content) || event.id,
      visisble: false,
      performers: event.properties.Performers?.relation.map((performer: any) => performer.id) || [],
    }));

    const visibleEvents: Event[] = events
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    })
    .filter((event) => {
      if (!event.visible || !event.date) return false;
  
      const now = moment.utc(); // Current time in UTC
      const eventDate = moment(event.date);
      const cutoffTime = eventDate.clone().utc().hour(9).minute(0).second(0).millisecond(0); // 9:00 AM UTC 4AM EST
      return now.isBefore(cutoffTime);
    });
    res.status(200).json(visibleEvents);
};