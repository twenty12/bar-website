import React, { useState } from "react";
import { Button, Form, Grid, message, Typography } from "antd";
import { LoadingOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const { useBreakpoint } = Grid;

interface RsvpFormProps {
    listId: string;
}

const RsvpForm: React.FC<RsvpFormProps> = ({ listId }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const screens = useBreakpoint();
    const isBelowMd = !screens.md;

    const handleRsvpSubmit = async (values: { phone: string }) => {
        if (!values.phone) {
            message.error("Please enter a valid phone number!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("/api/klaviyo-subscribe", {
                sms_number: values.phone,
                list_id: listId,
            });
            message.success(response.data.message || "RSVP successful!");
            setSuccess(true);
        } catch (error: any) {
            message.error(
                error.response?.data?.error || "RSVP failed! Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginTop: 20,
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: 2,
                border: "2px solid white",
                padding: 5,
                width: "fit-content",
            }}
        >
            <Typography.Title
                level={3}
                style={{
                    margin: 0,
                    textAlign: "left",
                    color: success ? "green" : "black",
                    fontWeight: 600,
                    marginRight: 15,
                }}
            >
                {success ? (
                    <>
                        Spot reserved <CheckOutlined />
                    </>
                ) : (
                    "RSVP to save your spot"
                )}
            </Typography.Title>

            {!success && (
                <Form
                    className="subscribe-form subscribe-form-lg"
                    layout="inline"
                    onFinish={handleRsvpSubmit}
                    style={{
                        margin: 5,
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: isBelowMd ? 10 : 15,
                        width: isBelowMd ? "calc(100vw - 70px)" : "auto",
                        flexDirection: "row",
                    }}
                >
                    <Form.Item name="phone" rules={[{ required: true, message: "Please enter your phone number!" }]}>
                        <PhoneInput
                            defaultCountry="US"
                            placeholder="Enter your phone number"
                            disabled={loading}
                            style={{
                                flex: 1,
                                lineHeight: "42px",
                                maxWidth: isBelowMd ? "100%" : 250,
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        className="gradient-button"
                        style={{
                            height: 42,
                            lineHeight: "42px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: isBelowMd ? 200 : "auto",
                        }}
                        icon={loading ? <LoadingOutlined /> : null}
                    >
                        {loading ? "Submitting..." : "RSVP"}
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default RsvpForm;