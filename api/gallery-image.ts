import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { GalleryImage } from "../src/types";

const apiKey = process.env.NOTION_API_KEY;
const imagesDatabaseId = "1688ffc87fdb8003b046f41efae38386"

const notionApi = axios.create({
    baseURL: "https://api.notion.com/v1",
    headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
    },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    try {
        // Parse the request body
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        console.log('Parsed body:', body);

        const { title, description, galleryType, imageUrl } = body;

        if (!title || !galleryType || !imageUrl) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const properties = {
            Title: {
                title: [{ text: { content: title } }],
            },
            Description: {
                rich_text: [{ text: { content: description || "" } }],
            },
            Image: {
                files: [
                    {
                        name: title,
                        type: "external",
                        external: { url: imageUrl },
                    },
                ],
            },
            Gallery: {
                select: { name: galleryType },
            },
        }

        console.log('Sending to Notion:', properties);

        const response = await notionApi.post("/pages", {
            parent: { database_id: imagesDatabaseId },
            properties: properties
        });

        const page = response.data;
        const newImage: GalleryImage = {
            id: page.id,
            title: page.properties.Title.title[0].text.content,
            description: page.properties.Description.rich_text[0]?.text.content || "",
            imageUrl: page.properties.Image.files[0]?.external.url,
            galleryType: page.properties.Gallery.select.name,
        };

        return res.status(201).json(newImage);
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            stack: error.stack
        });
        return res.status(500).json({ error: "Failed to create gallery image" });
    }
};