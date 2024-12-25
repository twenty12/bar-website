import axios from "axios";
import { Event, Performer } from "../src/types";

const apiKey = "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";
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
    const response = await notionApi.post(`/databases/${performersDatabaseId}/query`);
    res.status(200).json(response.data.results);
};