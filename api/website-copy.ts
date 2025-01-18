import axios from "axios";
import { WebsiteCopy } from "../src/types";

const apiKey = "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";
const webiteCopyDB = "16b8ffc87fdb80f8bba9fc799198aeaf"

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
    const response = await notionApi.post(`/databases/${webiteCopyDB}/query`);
    const websiteCopy: WebsiteCopy[] = response.data.results.map((copy: any) => ({
      id: copy.id,
      page: copy.properties.Page.title[0]?.plain_text,
      section: copy.properties.Section?.rich_text[0]?.plain_text,
      content: copy.properties.Content?.rich_text[0]?.plain_text,
    }))
    res.status(200).json(websiteCopy);
};