import axios from "axios";
import { GalleryImage } from "../src/types";
// https://www.notion.so/1688ffc87fdb8003b046f41efae38386?v=83d9f3e08dd64580852beba6231c166a&pvs=4
const apiKey = "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";
const imagesDatabaseId = "1688ffc87fdb8003b046f41efae38386"
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
    const response = await notionApi.post(`/databases/${imagesDatabaseId}/query`);
    console.log(response.data.results[0].properties.Image?.files[0])
    const galleryImages: GalleryImage[] = response.data.results.map((imageFromDb: any) => ({
      id: imageFromDb.id,
      title: imageFromDb.properties.Title?.title[0]?.text?.content,
      description: imageFromDb.properties.Description?.rich_text[0]?.plain_text,
      imageUrl: imageFromDb.properties.Image?.files[0]?.file?.url,
      galleryType: imageFromDb.properties.Gallery?.select?.name,
    }))
    res.status(200).json(galleryImages);
};