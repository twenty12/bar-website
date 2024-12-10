import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { AlertOutlined, ArrowRightOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const StayAdvisedForm: React.FC = () => {
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
      <Typography.Title level={3} style={{
        margin: 0, marginBottom: '15px', textTransform: 'uppercase',
        display: "flex", // Enables flexbox
        justifyContent: "space-between", // Pushes content and icon to opposite sides
        alignItems: "center", // Ensures vertical alignment
      }}>
        Tune In <AlertOutlined style={{ color: 'black', marginRight: '3px'}} />
      </Typography.Title>

      {/* Email Form */}
      <Form
        layout="inline"
        style={{
          marginBottom: "7.5px",
          display: "flex",
          justifyContent: "space-between",
        }}
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
        <Form.Item style={{marginInlineEnd: 0}}>
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
      >
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number!" },
          ]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item style={{marginInlineEnd: 0}}>

          <Button type="primary" htmlType="submit" icon={<PhoneOutlined />} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default StayAdvisedForm;