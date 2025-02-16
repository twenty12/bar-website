import React from "react";
import { Form, Input, Button, DatePicker, message, Select } from "antd";
import axios from "axios";
import { Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

const EventForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // Prepare the payload
      const payload = {
        title: values.title,
        date: values.date ? moment(values.date).format("YYYY-MM-DD") : null,
        description: values.description,
        ticketUrl: values.ticketUrl,
        performers: values.performers || [],
        displayOnWebsite: values.displayOnWebsite || false,
        displayInArchive: values.displayInArchive || false,
        smsListId: values.smsListId || null,
        eventImages: values.eventImages
          ? values.eventImages.split(",").map((url: string) => ({ url: url.trim() }))
          : [],
      };

      // Send the data to the API
      const response = await axios.post("/api/notion-events", payload);

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
        onFinish={handleSubmit}
        size="large"
        initialValues={{ displayOnWebsite: true, displayInArchive: false }}
      >
        <Form.Item
          name="title"
          label="Event Title"
          rules={[{ required: true, message: "Please enter the event title" }]}
        >
          <Input placeholder="Event title*" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Event Date"
          rules={[{ required: true, message: "Please select the event date" }]}
        >
          <DatePicker style={{ width: "100%" }} placeholder="Select date*" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Event Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={4} placeholder="Describe the event*" />
        </Form.Item>

        <Form.Item name="ticketUrl" label="Ticket URL">
          <Input placeholder="Ticket link (optional)" />
        </Form.Item>

        <Form.Item name="performers" label="Performers (comma-separated IDs)">
          <Input placeholder="e.g., 1234abcd, 5678efgh" />
        </Form.Item>

        <Form.Item
          name="eventImages"
          label="Event Images (comma-separated URLs)"
        >
          <Input placeholder="e.g., https://image1.jpg, https://image2.jpg" />
        </Form.Item>

        <Form.Item name="smsListId" label="SMS List ID">
          <Input placeholder="SMS List ID (optional)" />
        </Form.Item>

        <Form.Item name="displayOnWebsite" label="Display on Website" valuePropName="checked">
          <Select>
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="displayInArchive" label="Display in Archive" valuePropName="checked">
          <Select>
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Submit Event
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EventForm;