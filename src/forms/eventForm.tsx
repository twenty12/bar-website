import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Form, Input, Button, DatePicker, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { Typography } from "antd";
import ImageUploadModal from "../modals/imageUploadModal";
import AddPerformersModal from "../modals/addPerformersModal";
import { Performer } from "../types";

const { Title } = Typography;
interface EventFormProps {
  eventId?: string;
}

const EventForm: React.FC<EventFormProps> = ({ eventId }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPerformersModalOpen, setIsPerformersModalOpen] = useState<boolean>(false);
  const [selectedPerformers, setSelectedPerformers] = useState<Performer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch event data from the API if editing
  useEffect(() => {
    if (eventId) {
      axios.get(`/api/event?id=${eventId}`)
        .then((response) => {
          const event = response.data;
          console.log("Fetched Event:", event);

          form.setFieldsValue({
            title: event.properties.Name?.title[0]?.text?.content || "",
            date: event.properties.Date?.date?.start ? dayjs(event.properties.Date.date.start) : null,
            description: event.properties.Description?.rich_text[0]?.plain_text || "",
            ticketUrl: event.properties["Ticket Link"]?.url || "",
          });

          setImageUrls(event.properties.Poster?.files[0]?.file?.url ? [event.properties.Poster.files[0].file.url] : []);
          setSelectedPerformers(event.properties.Performers?.relation?.map((p: any) => ({ id: p.id })) || []);
        })
        .catch((error) => {
          console.error("Error fetching event:", error);
          message.error("Failed to fetch event details.");
        });
    }
  }, [eventId, form]);

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const payload = {
        title: values.title,
        date: values.date ? values.date.format("YYYY-MM-DD") : null,
        description: values.description,
        ticketUrl: values.ticketUrl,
        postImageUrl: imageUrls[0] || null,
        performers: selectedPerformers.map((performer) => performer.id),
      };

      let response;
      if (eventId) {
        // ✅ Editing an event
        response = await axios.put(`/api/event?id=${eventId}`, payload);
      } else {
        // ✅ Creating a new event
        response = await axios.post("/api/event", payload);
      }

      if (response.status !== 200 && response.status !== 201) {
        message.error("Failed to save the event. Please try again.");
        return;
      }

      message.success(`Event ${eventId ? "updated" : "created"} successfully!`);
      navigate("/events"); // ✅ Redirect to events list after success
    } catch (error) {
      console.error("Error submitting event:", error);
      message.error("Failed to save the event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title level={1}>{eventId ? "Edit Event" : "Create an Event"}</Title>
      <Title level={4} style={{ fontWeight: 400 }}>
        {eventId ? "Modify the details of your event." : "Fill in the details to add a new event to the database."}
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          values.images = imageUrls;
          values.performers = selectedPerformers.map((performer) => performer.id);
          handleSubmit(values);
        }}
        size="large"
      >
        {/* Event Name */}
        <Form.Item
          name="title"
          label="What is the name of your party?"
          rules={[{ required: true, message: "Please enter the party name" }]}
        >
          <Input placeholder="Event Name" />
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
            {imageUrls.length > 0 ? "Change Poster" : "Add Poster"}
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

        {/* Performers & Hosts */}
        <Form.Item label="Performers & Hosts">
          <Button icon={<PlusOutlined />} onClick={() => setIsPerformersModalOpen(true)}>
            {selectedPerformers.length > 0 ? "Edit Performers" : "Add Hosts & Performers"}
          </Button>

          {selectedPerformers.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <p>Selected Performers:</p>
              {selectedPerformers.map((performer: Performer) => (
                <span key={performer.id} style={{ marginRight: 8 }}>
                  @{performer.name} ({performer.instagram})
                </span>
              ))}
            </div>
          )}
        </Form.Item>
        <AddPerformersModal
          isOpen={isPerformersModalOpen}
          onClose={() => setIsPerformersModalOpen(false)}
          setSelectedPerformers={setSelectedPerformers}
        />

        {/* Submit Button */}
        <Form.Item
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        >
          <Button htmlType="submit" loading={loading} className="gradient-button">
            {eventId ? "Update Event" : "Create Event"}
          </Button>
        </Form.Item>
      </Form>

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setImageURLs={setImageUrls}
        allowMultiple={false}
      />
    </>
  );
};

export default EventForm;