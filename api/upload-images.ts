import { NextApiRequest, NextApiResponse } from "next";
import AWS from "aws-sdk";
import formidable, { IncomingForm, File } from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY!,
  secretAccessKey: process.env.AWS_SECRET!,
  region: "us-east-1",
});

// Helper function to parse `multipart/form-data`
const parseForm = async (req: NextApiRequest): Promise<{ files: Record<string, File | File[]> }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err: Error | null, fields: Record<string, string>, files: Record<string, File | File[]>) => {
      if (err) reject(err);
      resolve({ files });
    });
  });
};

// API handler for file upload
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { files } = await parseForm(req);

    if (!files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Handle multiple files
    const fileArray = Array.isArray(files.file) ? files.file : [files.file];

    const uploadedUrls: string[] = [];

    for (const file of fileArray) {
      const fileData = fs.readFileSync(file.filepath); // ✅ Read file from temp storage

      const fileName = `public-image-uploads/${Date.now()}_${file.originalFilename}`;
      const params = {
        Bucket: "honeys-910f11hj",
        Key: fileName,
        Body: fileData, // ✅ Pass actual file data
        ContentType: file.mimetype || "image/jpeg",
        // ACL: "public-read",
      };

      const uploadResult = await s3.upload(params).promise();
      uploadedUrls.push(uploadResult.Location);
    }

    return res.status(200).json({ imageUrls: uploadedUrls });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
}