import React from "react";
import { Form, Input, Button, DatePicker, InputNumber, Checkbox, message, Select } from "antd";
import axios from "axios";
import { Typography } from "antd";

const Title = Typography.Title;
const Text = Typography.Text;

interface LeadFormProps {
  onSuccess: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const eventTypes: string[] = [
    "Wedding",
    "Birthday Party",
    "Corporate Event",
    "Workshop",
    "Other",
  ];

  const handleSubmit = async (values: any) => {
    try {
      // Prepare the payload
      const payload = {
        ...values,
        event_date: values.event_date?.format("YYYY-MM-DD"),
        start_time: values.start_time?.format("HH:mm"),
        end_time: values.end_time?.format("HH:mm"),
      };

      // Send the data to the API
      const response = await axios.post("/api/tripleseat-lead", payload);
      if (response.status !== 200) {
        message.error("Failed to submit the lead. Please try again.");
      }
      message.success("Lead submitted successfully!");
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      console.error("Error submitting lead:", error);
      message.error("Failed to submit the lead. Please try again.");
    }
  };

  return (
    <>
      <Title level={1}>
        Event Inquery
      </Title>
      <Title level={4} style={{ fontWeight: 400 }}>
        Let us know a bit about the event you’re planning—we’re here to help make it happen.
      </Title>
      <Form
        form={form}
        style={{
          margin: "0 auto",
        }}
        layout="vertical"
        labelCol={{ span: 0 }}
        onFinish={handleSubmit}
        className='no-label-form'
        size="large"
        initialValues={{
          email_opt_in: true,
        }}
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
          <DatePicker style={{ width: "100%" }} placeholder="Date of event*" />
        </Form.Item>
        <Form.Item
          name="guest_count"
          label="Guest Count"
          rules={[{ required: true, message: "Please enter the guest count" }]}
        >
          <InputNumber min={1} placeholder="Approximate number of guests*" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="additional_information"
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
        <Form.Item name="event_description" label="Event Description*"
          rules={[{ required: true, message: "Please enter an event description" }]}
        >
          <Input.TextArea rows={4} placeholder="Briefly describe your event" />
        </Form.Item>
        <Form.Item name="company" label="Company">
          <Input placeholder="Company name (optional)" />
        </Form.Item>
        <Form.Item name="honeypot" style={{ display: "none" }}>
          <Input tabIndex={-1} autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            Submit Inquery
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LeadForm;