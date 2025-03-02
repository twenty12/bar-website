import { useState } from "react";
import { Modal, Upload, Button, message, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  setImageURLs: React.Dispatch<React.SetStateAction<string[]>>;
  allowMultiple?: boolean;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, setImageURLs, allowMultiple = false }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning("Please select an image to upload.");
      return;
    }

    setLoading(true);
    const uploadedUrls: string[] = [];

    for (const file of fileList) {
      const formData = new FormData();
      formData.append("file", file.originFileObj as File); // ✅ Ensure file is attached

      try {
        const response = await axios.post("/api/upload-images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response.data)
        uploadedUrls.push(response.data.imageUrls[0]);
      } catch (error) {
        message.error("Image upload failed");
        console.error(error);
      }
    }

    if (uploadedUrls.length > 0) {
      message.success("Images uploaded successfully!");
      console.log("Uploaded URLs:", uploadedUrls);
      setImageURLs((prev) => [...prev, ...uploadedUrls]); // ✅ Store uploaded image URLs
      setFileList([]); // ✅ Clear uploaded files
      onClose(); // ✅ Close modal after successful upload
      console.log("Uploaded URLs:", uploadedUrls);
    }

    setLoading(false);
  };

  return (
    <Modal 
      title="Upload Poster" 
      open={isOpen} 
      onCancel={onClose} 
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="upload" type="primary" onClick={handleUpload} loading={loading}>
          Upload
        </Button>,
      ]}
    >
      <Upload
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
        beforeUpload={() => false} // Prevents auto-upload
        listType="picture"
        maxCount={allowMultiple ? 10 : 1}
        multiple={allowMultiple}
      >
        <Button icon={<UploadOutlined />}>Select {allowMultiple ? "Images" : "Image"}</Button>
      </Upload>
    </Modal>
  );
};

export default ImageUploadModal;