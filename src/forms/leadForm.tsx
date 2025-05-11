import React from "react";
import ReactGA from "react-ga4";
import { Form, Input, Button, DatePicker, InputNumber, message, Select, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

interface LeadFormProps {
  onSuccess: () => void;
  isWedding?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess, isWedding = false }) => {
  const [form] = Form.useForm();
  const eventTypes: string[] = [
    "Birthday Party",
    "Corporate Event",
    "Workshop",
    "Buy Out",
    "Other",
  ];

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        event_date: values.event_date?.format("YYYY-MM-DD"),
        start_time: values.event_date?.format("HH:mm"),
        end_time: values.end_time?.format("HH:mm"),
        event_description: isWedding ? "Wedding" : values.event_description,
      };

      const response = await axios.post("/api/tripleseat-lead", payload);
      if (response.status === 200) {
        message.success("Lead submitted successfully!");
        ReactGA.event({
          category: "Form Submission",
          action: "Lead Submission",
          label: values.additional_information,
          value: values.guest_count,
        });
        form.resetFields();
        onSuccess();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      message.error("Failed to submit the lead. Please try again.");
    }
  };

  return (
    <>
      {!isWedding && (
        <>
          <Title level={1}>Tell us about your event</Title>
          <Title level={4} style={{ fontWeight: 400 }}>
            Let us know a bit about the event you’re planning—we’re here to help make it happen.
          </Title>
        </>
      )}
      {isWedding && (
        <>
          <Title level={3}>Let's plan a wedding</Title>
        </>
      )}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="no-label-form"
        size="large"
        initialValues={{ email_opt_in: true }}
        style={{ margin: "0 auto" }}
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: "Please enter your first name" }]}
        >
          <Input placeholder="First name*" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: "Please enter your last name" }]}
        >
          <Input placeholder="Last name*" />
        </Form.Item>

        <Form.Item
          name="email_address"
          label="Email Address"
          rules={[
            { required: true, message: "Please enter your email address" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Email*" />
        </Form.Item>

        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[{ required: true, message: "Please enter your phone number" }]}
        >
          <Input placeholder="Phone*" />
        </Form.Item>

        <Form.Item
          name="event_date"
          label="Event Date"
          rules={[{ required: true, message: "Please enter a date" }]}
        >
          <DatePicker
            showTime={{ use12Hours: true, format: "h:mm A" }}
            format="YYYY-MM-DD h:mm A"
            style={{ width: "100%" }}
            placeholder={isWedding ? "Date of wedding" : "Date of event"}
          />
        </Form.Item>

        <Form.Item
          name="guest_count"
          label="Guest Count"
          rules={[{ required: true, message: "Please enter the guest count" }]}
        >
          <InputNumber min={1} placeholder="Approximate number of guests*" style={{ width: "100%" }} />
        </Form.Item>

        {!isWedding && (
          <Form.Item
            name="event_description"
            label="Event Type"
            rules={[{ required: true, message: "Please select at least one event type" }]}
          >
            <Select placeholder="Select event type*">
              {eventTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="additional_information"
          label="Event Description*"
          rules={[{ required: true, message: "Please enter an event description" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder={isWedding ? "Tell us about your wedding plans" : "Briefly describe your event"}
          />
        </Form.Item>

        {!isWedding && (
          <Form.Item name="company" label="Company">
            <Input placeholder="Company name (optional)" />
          </Form.Item>
        )}

        <Form.Item name="honeypot" style={{ display: "none" }}>
          <Input tabIndex={-1} autoComplete="off" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">Submit Inquiry</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LeadForm;