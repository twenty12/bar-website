import axios from "axios";
import { Performer } from "../src/types";

const apiKey = process.env.NOTION_API_KEY;
const performersDatabaseId = "1578ffc87fdb80c1850dc0747e46e6f3"
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

    const response = await notionApi.post(`/databases/${performersDatabaseId}/query`);
    response.data.results.forEach((performer: any) => {
    }
  )
    const performers: Performer[] = response.data.results.map((performer: any) => ({
      id: performer.id,
      name: performer.properties.Name?.title[0]?.text?.content,
      instagram: performer.properties.Instagram?.rich_text[0]?.plain_text,
      imageUrl: performer.properties.Image?.files[0]?.file?.url || null,
      isHost: performer.properties['Is a host'].checkbox,
    }))
    res.status(200).json(performers);
};