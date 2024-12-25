import React from "react";
import { Row, Col, Typography, Grid } from "antd";
import { PushpinFilled } from "@ant-design/icons";

import { useParams } from "react-router-dom";
import { useNotionDB } from "../providers/NotionDBProvider";

const { useBreakpoint } = Grid;

const EventDetail: React.FC = () => {
    const screens = useBreakpoint();
    const isBelowMd = !screens.md;

    // Get event ID from URL parameters
    const { id } = useParams<{ id: string }>();

    // Fetch data from context
    const { eventById, loading, error } = useNotionDB();
    if (!id) {
        return null;
    }
    const event = eventById[id];
    console.log(event);
    if (loading) {
        return (
            <Typography.Title level={3} style={{ textAlign: "center" }}>
                Loading event details...
            </Typography.Title>
        );
    }

    if (error || !event) {
        return (
            <Typography.Title level={3} style={{ textAlign: "center", color: "red" }}>
                {error || "Event not found"}
            </Typography.Title>
        );
    }
    const thumbailElement = (
        <div
            style={{
                margin: isBelowMd ? "15px" : "60px",
            }}>
            <img
                src={event.thumbnail || ""}
                alt={event.title}
                style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                }}
            />
        </div>
    )
    return (
        <Row style={{ maxWidth: 1080, margin: "60px 15px" }}>
            {isBelowMd ? (
                <Col xs={24} md={12}
                    style={{
                        justifyContent: "center",
                        display: "flex"
                    }}
                >
                    {thumbailElement}
                </Col>
            ) : null}
            <Col xs={24} md={12}
            >
                <Typography.Title
                    level={1}
                    style={{
                        marginTop: isBelowMd ? "30px" : "0",
                        textAlign: isBelowMd ? "center" : "left",
                        fontWeight: 700,
                        fontSize: "50px",
                    }}
                >
                    {event.title}
                </Typography.Title>
                <Typography.Title level={4} style={{ fontWeight: 700 }}>
                    {new Date(event.date).toLocaleDateString()} <br />
                    <span style={{ fontWeight: 300, color: "rgba(0, 0, 0, 0.5)" }}>
                        {new Date(event.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </Typography.Title>
                <Typography.Paragraph>
                    <a
                        href="https://maps.app.goo.gl/mVQPWXFaPKv3j3wPA"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <PushpinFilled /> 93 Scott Ave.
                        <br />
                        Brooklyn, NY 11237
                    </a>
                </Typography.Paragraph>
                <Typography.Paragraph>{event.description}</Typography.Paragraph>

                {/* Performers */}
                {event.performers && event.performers.length > 0 && (
                    <>
                        <Typography.Title level={4}>Performers</Typography.Title>
                        <ul>
                            {event.performers.map((performer) => (
                                <li key={performer.id}>
                                    {performer.name}{" "}
                                    {performer.instagram && (
                                        <a
                                            href={`https://instagram.com/${performer.instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ marginLeft: 8, color: "#1890ff" }}
                                        >
                                            @{performer.instagram}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </Col>
            {isBelowMd ? null : (
                <Col
                    xs={24}
                    md={12}
                    style={{
                        display: isBelowMd ? "none" : "flex",
                        justifyContent: "flex-start",
                    }}
                >
                    {thumbailElement}
                </Col>
            )}
        </Row>
    );
};

export default EventDetail;