import React, { useState } from "react";
import { Form, Input, Button, Upload, Select, message, Typography, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GalleryTypes } from "../enums";

const { Title } = Typography;
const { TextArea } = Input;

const PASSWORD = "4302";

const AddImage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handlePasswordSubmit = (values: { password: string }) => {
    if (values.password === PASSWORD) {
      setIsAuthenticated(true);
    } else {
      message.error('Incorrect password');
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setImageUrl(data.imageUrls[0]);
      message.success('Image uploaded successfully!');
      return false; // Prevent default upload behavior
    } catch (error) {
      message.error('Failed to upload image');
      return false;
    }
  };

  const onFinish = async (values: any) => {
    if (!imageUrl) {
      message.error('Please upload an image first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/gallery-image', {
        method: 'POST',
        body: JSON.stringify({
          title: values.title,
          description: values.description || '',
          galleryType: values.galleryType,
          imageUrl: imageUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create gallery image');
      }

      message.success('Gallery image added successfully!');
      form.resetFields();
      setImageUrl('');
    } catch (error: any) {
      console.log(error);
      message.error(error.message || 'Failed to add gallery image');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  if (!isAuthenticated) {
    return (
      <div style={{ 
        maxWidth: '400px', 
        margin: '0 auto', 
        padding: '20px',
        marginTop: '30px'
      }}>
        <Card>
          <Title level={2} style={{ marginBottom: '24px' }}>Enter Password</Title>
          <Form
            onFinish={handlePasswordSubmit}
          >
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter the password' }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      marginTop: '30px'
    }}>
      <Card>
        <Title level={2} style={{ marginBottom: '24px' }}>Add Gallery Image</Title>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          disabled={loading}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder="Enter image title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={4} placeholder="Enter image description" />
          </Form.Item>

          <Form.Item
            name="galleryType"
            label="Gallery Type"
            rules={[{ required: true, message: 'Please select a gallery type' }]}
          >
            <Select placeholder="Select gallery type">
                {Object.values(GalleryTypes).map((type) => (
                    <Select.Option key={type} value={type}>
                        {type}
                    </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <Upload
              name="image"
              listType="picture"
              beforeUpload={handleImageUpload}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          {imageUrl && (
            <div style={{ marginBottom: '20px' }}>
              <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </div>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Upload and next
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddImage; 