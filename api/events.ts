import axios from "axios";
import { Event, EventImage } from "../src/types";
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
    // loop to check if the evnt title has the work "hmmm" in it
    response.data.results.forEach((event: any) => {
      if (event.properties.Name?.title[0]?.text?.content.includes("Saturday")) {
        console.log("hmmm event found", event.properties['Photos for Archive']);
        console.log("hmmm event found", event.properties['Photos for Archive'].files[0].file.url);
        console.log(event)
      }
    }
    );
    // Filter visible events and map after filtering
    const events: Event[] = response.data.results
      .filter((event: any) => event.properties["Display on Website"]?.checkbox)
      .map((event: any) => ({
        id: event.id,
        thumbnail: event.properties.Poster?.files[0]?.file?.url || null,
        title: event.properties.Name?.title[0]?.text?.content || "Untitled",
        date: event.properties.Date?.date?.start || null,
        description: event.properties.Description?.rich_text[0]?.plain_text || null,
        visible: event.properties["Display on Website"]?.checkbox || false,
        ticketUrl: event.properties["Ticket Link"]?.url || null,
        isInArchive: event.properties["Display in Archive"]?.checkbox || false,
        slug: slugify(event.properties.Name?.title[0]?.text?.content) || event.id,
        performers: event.properties.Performers?.relation?.map((performer: any) => performer.id) || [],
        smsListId: event.properties["SMS List ID"]?.rich_text[0]?.plain_text || null,
        eventImages: event.properties["Photos for Archive"]?.files?.map((file: any) => ({
          id: file.id,
          imageUrl: file.file.url,
        })) || [],
      }));

    const allEvents: Event[] = events
      .filter((event) => event.date) // Ensure event has a date
      .sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return moment(a.date).valueOf() - moment(b.date).valueOf();
      })
      const currentEvents = allEvents.filter((event) => {
        const now = moment.utc(); // Current time in UTC
        const eventDate = moment(event.date);
        const cutoffTime = eventDate.clone().utc().hour(9).minute(0).second(0).millisecond(0);
        
      // const timeRemaining = moment.duration(cutoffTime.diff(now)).humanize();
        // console.log(`Event: ${event.title}, Time remaining to cutoff: ${timeRemaining}`);
      
        return now.isBefore(cutoffTime);
      });
    const archivedEvents = allEvents.filter((event) => event.isInArchive);
    res.status(200).json([...currentEvents, ...archivedEvents]);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};