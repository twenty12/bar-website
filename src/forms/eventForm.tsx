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
import { useNotionDB } from "../providers/CalendarProvider";
import FullPageSpin from "../components/fullPageSpin";
const { Title } = Typography;
interface EventFormProps {
  eventId?: string;
}

const EventForm: React.FC<EventFormProps> = ({ eventId }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { performersById } = useNotionDB();
  const [flyerUrl, setFlyerUrl] = useState<string>('');
  const [isFlyerModalOpen, setIsFlyerModalOpen] = useState<boolean>(false);
  const [isAdditionalImagesModalOpen, setIsAdditionalImagesModalOpen] = useState<boolean>(false);
  const [isPerformersModalOpen, setIsPerformersModalOpen] = useState<boolean>(false);
  const [selectedPerformers, setSelectedPerformers] = useState<Performer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editFormLoading, setEditFormLoading] = useState<boolean>(false);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);

  useEffect(() => {
    if (eventId) {
      setEditFormLoading(true);
      axios.get(`/api/event?id=${eventId}`)
        .then((response) => {
          const event = response.data;


          form.setFieldsValue({
            title: event.properties.Name?.title[0]?.text?.content || "",
            date: event.properties.Date?.date?.start ? dayjs(event.properties.Date.date.start) : null,
            description: event.properties.Description?.rich_text[0]?.plain_text || "",
            additionalInformation: event.properties["Additional Information"]?.rich_text[0]?.plain_text || "",
            ticketUrl: event.properties["Ticket Link"]?.url || "",
          });
          console.log("event.properties.additionalImages", event.properties["Additional Images"])
          setFlyerUrl(event.properties.Poster?.files[0]?.external?.url || '');
          setAdditionalImages(event.properties["Additional Images"]?.files.map((file: any) => file.external?.url) || []);
          if (Object.keys(performersById).length > 0) {
            setSelectedPerformers(
              event.properties.Performers?.relation.map((performer: any) => performersById[performer.id]) || []
            );
            setEditFormLoading(false)
          }
        })
        .catch((error) => {
          
          console.error("Error fetching event:", error);
          message.error("Failed to fetch event details.");
          setEditFormLoading(false);
        });
    }
  }, [eventId, form, performersById]);

  console.log("additionalImages", additionalImages)
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const payload = {
        eventId: eventId,
        title: values.title,
        date: values.date ? values.date.format("YYYY-MM-DD") : null,
        description: values.description,
        additionalInformation: values.additionalInformation,
        ticketUrl: values.ticketUrl,
        postImageUrl: flyerUrl || null,
        performers: selectedPerformers.map((performer) => performer.id),
        additionalImages: additionalImages,
      };

      let response;
      if (eventId) {
        console.log("Updating event with ID:", eventId);
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
      navigate("/my-party"); // ✅ Redirect to events list after success
    } catch (error) {
      console.error("Error submitting event:", error);
      message.error("Failed to save the event. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (editFormLoading) {
    
    return <FullPageSpin />;
  }
  return (
    <>
      <Title level={1}>{eventId ? "Edit Event" : "Create an Event"}</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          values.images = flyerUrl;
          values.performers = selectedPerformers.map((performer) => performer.id);
          handleSubmit(values);
        }}
        size="large"
        disabled={loading}
      >
        {/* Event Name */}
        <Form.Item
          name="title"
          label="What is the name of your party?"
          rules={[{ required: true, message: "Please enter the party name" }]}
        >
          <Input placeholder="Event Name" disabled={loading} />
        </Form.Item>

        <Form.Item
          name="date"
        >
          <DatePicker showTime={{ format: "hh:mm A" }} format="YYYY-MM-DD hh:mm A" style={{ width: "100%" }} disabled={true} />
        </Form.Item>
        <Form.Item name="ticketUrl" label="Ticket Link (if using RA, Partiful, etc.)">
          <Input placeholder="Ticket link" disabled={loading} />
        </Form.Item>
        {/* Event Description */}
        <Form.Item
          name="description"
          label="Event Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={4} placeholder="Describe the event*" disabled={loading} />
        </Form.Item>

        {/* Additional Information */}
        <Form.Item
          name="additionalInformation"
          label="Instructions for our social media team "
        >
          <Input.TextArea rows={4} placeholder="Enter additional information" disabled={loading} />
        </Form.Item>

        {/* Image Upload Button */}
        <Form.Item label="Upload you event post and any other images to be posted in a instagram carousel">
          <Button icon={<PlusOutlined />} onClick={() => setIsFlyerModalOpen(true)} disabled={loading}>
            {flyerUrl.length > 0 ? "Update Flyer" : "Add Flyer"}
          </Button>
          {flyerUrl.length > 0 && (
            <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
                <img src={flyerUrl} alt="Uploaded" style={{ width: "100px", borderRadius: "4px" }} />
            </div>
          )}
        </Form.Item>

        {/* Additional Images Upload Button */}
        <Form.Item label="Upload press photos">
          <Button icon={<PlusOutlined />} onClick={() => setIsAdditionalImagesModalOpen(true)} disabled={loading}>
            {additionalImages.length > 0 ? "Update Additional Images" : "Add Additional Images"}
          </Button>
          {additionalImages.length > 0 && (
            <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
              {additionalImages.map((url, index) => (
                <img key={index} src={url} alt="Additional" style={{ width: "100px", borderRadius: "4px" }} />
              ))}
            </div>
          )}
        </Form.Item>



        {/* Performers & Hosts */}
        <Form.Item label="Performers & Hosts">
          <Button icon={<PlusOutlined />} onClick={() => setIsPerformersModalOpen(true)} disabled={loading}>
            {selectedPerformers.length > 0 ? "Edit Performers" : "Add Hosts & Performers"}
          </Button>

          {selectedPerformers.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <p>Selected Performers:</p>
              {selectedPerformers.map((performer: Performer) => (
                <div key={performer.id} style={{ marginRight: 8, border: "1px solid #ccc", padding: 8, backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius: 2, width: "100%", marginBottom: "15px" }}>
                  {performer.name} <br/> <a  href={`https://www.instagram.com/${performer.instagram}`} target="_blank" rel="noreferrer">@{performer.instagram}</a>
                </div>
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
        isOpen={isFlyerModalOpen}
        onClose={() => setIsFlyerModalOpen(false)}
        setImageURLs={setFlyerUrl}
        allowMultiple={false}
      />

      {/* Image Upload Modal for Additional Images */}
      <ImageUploadModal
        isOpen={isAdditionalImagesModalOpen}
        onClose={() => setIsAdditionalImagesModalOpen(false)}
        setImageURLs={setAdditionalImages}
        allowMultiple={true}
      />
    </>
  );
};

export default EventForm;