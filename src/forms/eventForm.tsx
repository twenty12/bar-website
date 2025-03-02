import React, { useState } from "react";
import dayjs from "dayjs";
import { Form, Input, Button, DatePicker, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Typography } from "antd";
import moment from "moment";
import ImageUploadModal from "../modals/imageUploadModal";

const { Title } = Typography;

const EventForm: React.FC = () => {
    const [form] = Form.useForm();
    const [imageUrls, setImageUrls] = useState<string[]>([]); // Stores uploaded images
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const handleSubmit = async (values: any) => {
        try {
            // Prepare the payload
            const payload = {
                title: values.title,
                date: values.date ? moment(values.date).format("YYYY-MM-DD") : null,
                description: values.description,
                ticketUrl: values.ticketUrl,
                postImageUrl: 'https://honeys-910f11hj.s3.amazonaws.com/public-image-uploads/1739734330533_464747506_1083951036671660_921351755114542465_n.jpg',
                // performers: values.performers || [],
                // displayOnWebsite: values.displayOnWebsite || false,
                // displayInArchive: values.displayInArchive || false,
                // smsListId: values.smsListId || null,
                // eventImages: values.eventImages
                //   ? values.eventImages.split(",").map((url: string) => ({ url: url.trim() }))
                //   : [],
            };

            // Send the data to the API
            const response = await axios.post("/api/add-event", payload);

            if (response.status !== 201) {
                message.error("Failed to submit the event. Please try again.");
                return;
            }

            message.success("Event submitted successfully!");
            form.resetFields();
        } catch (error: any) {
            console.error("Error submitting event:", error);
            message.error("Failed to submit the event. Please try again.");
        }
    };

    return (
        <>
            <Title level={1}>Create an Event</Title>
            <Title level={4} style={{ fontWeight: 400 }}>
                Fill in the details to add a new event to the database.
            </Title>

            <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          values.images = imageUrls; // Attach image URLs
          handleSubmit(values);
        }}
        size="large"
        initialValues={{
          title: "My Awesome Party",
          email: "test@example.com",
          date: dayjs().hour(19).minute(0),
          description: "This is a test event description.",
          ticketUrl: "https://example.com/tickets",
          displayOnWebsite: true,
          displayInArchive: false,
        }}
      >
        {/* Event Name */}
        <Form.Item
          name="title"
          label="What is the name of your party?"
          rules={[{ required: true, message: "Please enter the party name" }]}
        >
          <Input placeholder="Event Name" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          label="Your Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Your Email" />
        </Form.Item>

        {/* Date Picker */}
        <Form.Item
          name="date"
          label="What is the proposed date and start time of your party?"
          rules={[{ required: true, message: "Please select the event date and time" }]}
        >
          <DatePicker showTime={{ format: "hh:mm A" }} format="YYYY-MM-DD hh:mm A" style={{ width: "100%" }} />
        </Form.Item>

        {/* Event Description */}
        <Form.Item
          name="description"
          label="Event Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={4} placeholder="Describe the event*" />
        </Form.Item>

        {/* Image Upload Button */}
        <Form.Item label="Event Poster">
          <Button icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Add Poster
          </Button>

          {imageUrls.length > 0 && (
            <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt="Uploaded" style={{ width: "100px", borderRadius: "4px" }} />
              ))}
            </div>
          )}
        </Form.Item>

        {/* Ticket URL */}
        <Form.Item name="ticketUrl" label="Ticket Link (if using RA, Partiful, etc.)">
          <Input placeholder="Ticket link" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit Event
          </Button>
        </Form.Item>
      </Form>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setImageURLs={setImageUrls}
        allowMultiple={false} // Change to false if only one image should be allowed
      />
    </>
    );
};

export default EventForm;