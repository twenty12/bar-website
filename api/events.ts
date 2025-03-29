import axios from "axios";
import { Event, Performer } from "../src/types";
import moment from 'moment';

const apiKey = process.env.NOTION_API_KEY;
const eventsDatabaseId = "14e8ffc87fdb80419951d3dbca333c62";
const notionApi = axios.create({
  baseURL: "https://api.notion.com/v1",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
  },
});

function hasEventPassed(eventDate: string | null): boolean {
  if (!eventDate) return false; // If no date, assume it hasn't passed

  const now = moment.utc(); // Current time in UTC
  const eventMoment = moment(eventDate);
  const cutoffTime = eventMoment.clone().utc().hour(9).minute(0).second(0).millisecond(0);

  return now.isAfter(cutoffTime);
}

function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async (req: any, res: any) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const response = await notionApi.post(`/databases/${eventsDatabaseId}/query`);

    const events: Event[] = response.data.results.map((event: any): Event | null => {
      // if (!event.properties["Display on Website"]?.checkbox) return null; // Skip events not meant for display
      if (event.properties.Name?.title?.[0]?.text?.content == undefined) return null; // Skip events without a name
      const eventDate = event.properties.Date?.date?.start || null;
      return {
        id: event.id,
        thumbnail: event.properties.Poster?.files?.[0]?.file?.url || null,
        title: event.properties.Name?.title?.[0]?.text?.content || "Untitled",
        contactEmail: event.properties.Email?.email || null,
        date: eventDate,
        description: event.properties.Description?.rich_text?.[0]?.plain_text || null,
        hasEventPassed: hasEventPassed(eventDate),
        visible: event.properties["Display on Website"]?.checkbox || false,
        ticketUrl: event.properties["Ticket Link"]?.url || null,
        isInArchive: event.properties["Display in Archive"]?.checkbox || false,
        slug: slugify(event.properties.Name?.title?.[0]?.text?.content) || event.id,
        performers: event.properties.Performers?.relation?.map((performer: Performer) => performer.id) || [],
        smsListId: event.properties["SMS List ID"]?.rich_text?.[0]?.plain_text || null,
        eventImages:
          event.properties["Photos for Archive"]?.files?.map((file:any) => ({
            id: file.id,
            imageUrl: file.file.url,
          })) || [],
      };
    }).filter(Boolean) as Event[]; // Remove null values from the array


    const allEvents: Event[] = events
      .filter((event) => event.date) // Ensure event has a date
      .sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return moment(a.date).valueOf() - moment(b.date).valueOf();
      })
    
    res.status(200).json(allEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};