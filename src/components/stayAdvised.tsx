import React, { useState } from "react";
import { Form, Button, Typography, message, Input, Grid } from "antd";
import { LoadingOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import theme from "../theme.json";
const { useBreakpoint } = Grid;

const StayAdvisedForm: React.FC = () => {
  const [phoneValue, setPhoneValue] = useState<string | undefined>();
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPhone, setLoadingPhone] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState(false);
  const [subscribedPhone, setSubscribedPhone] = useState(false);
  const screens = useBreakpoint();
  const isBelowMd = !screens.md;

  const handleEmailSubmit = async (values: { email: string }) => {
    setLoadingEmail(true);
    try {
      const response = await axios.post("/api/klaviyo-subscribe", {
        email_address: values.email,
        list_id: "Rrzm5a",
      });
      message.success(response.data.message || "Subscription successful!");
      setSubscribedEmail(true);
    } catch (error: any) {
      message.error(error.response?.data?.error || "Subscription failed!");
    } finally {
      setLoadingEmail(false);
    }
  };

  const handlePhoneSubmit = async () => {
    if (!phoneValue) {
      message.error("Please enter a valid phone number!");
      return;
    }

    setLoadingPhone(true);
    try {
      const response = await axios.post("/api/klaviyo-subscribe", {
        sms_number: phoneValue,
        list_id: "WTufVZ",
      });
      message.success(response.data.message || "Subscription successful!");
      setSubscribedPhone(true);
    } catch (error: any) {
      message.error(error.response?.data?.error || "Subscription failed!");
    } finally {
      setLoadingPhone(false);
    }
  };

  return (
    <div
      style={{
        width: isBelowMd ? "calc(100% - 30px)" : "400px",
        background: `rgba(250, 250, 250, 1)`,
        marginLeft: isBelowMd ? "15px" : "0",
        marginTop: "15px",
        marginBottom: "30px",
        padding: "20px",
        textAlign: "left",
        border: `2px solid rgba(${theme.token.colorHighlightRGB}, 0.8)`,
        borderRadius: "2px",
        boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography.Title
        level={1}
        style={{
          margin: 0,
          marginBottom: "15px",
        }}
      >
        Stay tuned in
      </Typography.Title>

      {/* Email Form */}
      <span>Get an email every month(ish) about events</span>
      {subscribedEmail ? (
        <div style={{ opacity: 1, transition: "opacity 0.5s ease" }}>
          You've been subscribed!
        </div>
      ) : (
        <Form
          className="subscribe-form"
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
            <Input
              placeholder="Enter your email"
              disabled={loadingEmail}
            />
          </Form.Item>
          <Form.Item style={{ marginInlineEnd: 0 }}>
            <Button
              htmlType="submit"
              icon={loadingEmail ? <LoadingOutlined /> : <MailOutlined />}
              disabled={loadingEmail}
            />
          </Form.Item>
        </Form>
      )}

      <br />

      {/* Phone Form */}
      <span>Get early notice about premier events</span>
      {subscribedPhone ? (
        <div style={{ opacity: 1, transition: "opacity 0.5s ease" }}>
          You've been subscribed!
        </div>
      ) : (
        <Form
          className="subscribe-form"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <PhoneInput
            defaultCountry="US"
            placeholder="Enter your phone number"
            value={phoneValue}
            onChange={setPhoneValue}
            style={{
              flex: 1,
              lineHeight: "32px",
            }}
            disabled={loadingPhone}
          />
          <Button
            onClick={handlePhoneSubmit}
            icon={loadingPhone ?<LoadingOutlined /> : <PhoneOutlined />}
            disabled={loadingPhone}
            style={{ marginInlineStart: "10px" }}
          />
        </Form>
      )}
    </div>
  );
};

export default StayAdvisedForm;