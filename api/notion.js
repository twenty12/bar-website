import axios from "axios";

const apiKey = "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";
const databaseId = "14e8ffc87fdb80419951d3dbca333c62";

const notionApi = axios.create({
  baseURL: `https://api.notion.com/v1/databases/${databaseId}/query`,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Notion-Version": "2022-06-28",
  },
});

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    console.log("Database ID:", databaseId);
    console.log("API Key:", apiKey);
    console.log("Base URL:", notionApi.defaults.baseURL);

    const response = await notionApi.post(null);
    console.log("Response received:", response.data);

    const events = response.data.results.map((event) => ({
      id: event.id,
      title: event.properties.Name?.title[0]?.text?.content || "Untitled",
      date: event.properties.Date?.date?.start || null,
    }));

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching Notion calendar:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.response?.data || "Error fetching Notion calendar" });
  }
};