import { Form } from "antd";
import ReactGA from "react-ga4";
import axios from "axios";
import { message } from "antd";
import React from "react";

export const useLeadForm = (onSuccess: () => void) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      // Prepare the payload
      const payload = {
        ...values,
        event_date: values.event_date?.format("YYYY-MM-DD"),
        start_time: values.event_date?.format("HH:mm"),
        end_time: values.end_time?.format("HH:mm"),
      };

      // Send the data to the API
      const response = await axios.post("/api/tripleseat-lead", payload);
      if (response.status !== 200) {
        message.error("Failed to submit the lead. Please try again.");
      }
      message.success("Lead submitted successfully!");
      ReactGA.event({
        category: "Form Submission",
        action: "Lead Submission",
        label: values.additional_information,
        value: values.guest_count,
      });
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      console.error("Error submitting lead:", error);
      message.error("Failed to submit the lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, handleSubmit };
}; 