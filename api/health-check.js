

export default async (req, res) => {
  console.log("Health check endpoint hit!");
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  res.status(200).json({ message: "I'm healthy" });
};