import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { AlertOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import axios from "axios";

const StayAdvisedForm: React.FC = () => {
  const handleEmailSubmit = async (values: { email: string }) => {
    try {
      const response = await axios.post("/api/klaviyo-subscribe", {
        email_address: values.email,
        list_id: "Rrzm5a", // Replace with your actual Klaviyo list ID
      });
      message.success(response.data.message || "Subscription successful!");
    } catch (error: any) {
      message.error(error.response?.data?.error || "Subscription failed!");
    }
  };

  const handlePhoneSubmit = async (values: { phone: string }) => {
    try {
      const response = await axios.post("/api/klaviyo-subscribe", {
        sms_number: values.phone,
        list_id: "WTufVZ", // Replace with your actual Klaviyo list ID
      });
      message.success(response.data.message || "Subscription successful!");
    } catch (error: any) {
      message.error(error.response?.data?.error || "Subscription failed!");
    }
  };

  return (
    <div
      style={{
        width: "400px",
        background: "rgba(255, 255, 255, 0.8)",
        marginLeft: "30px",
        marginTop: "15px",
        marginBottom: "-15px",
        padding: "20px",
        textAlign: "left",
        border: "1px solid #f0f0f0",
        borderRadius: "2px",
        boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography.Title
        level={3}
        style={{
          margin: 0,
          marginBottom: "15px",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Tune In <AlertOutlined style={{ color: "black", marginRight: "3px" }} />
      </Typography.Title>

      {/* Email Form */}
      <Form
        layout="inline"
        style={{
          marginBottom: "7.5px",
          display: "flex",
          justifyContent: "space-between",
        }}
        onFinish={handleEmailSubmit}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item style={{ marginInlineEnd: 0 }}>
          <Button type="primary" htmlType="submit" icon={<MailOutlined />} />
        </Form.Item>
      </Form>
      <small>or</small>

      {/* Phone Form */}
      <Form
        layout="inline"
        style={{
          display: "flex",
          marginTop: "7.5px",
          justifyContent: "space-between",
        }}
        onFinish={handlePhoneSubmit}
      >
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Please enter your phone number!" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item style={{ marginInlineEnd: 0 }}>
          <Button type="primary" htmlType="submit" icon={<PhoneOutlined />} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default StayAdvisedForm;