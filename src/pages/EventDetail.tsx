import React from "react";
import { Helmet } from "react-helmet-async";
import { Row, Col, Typography, Grid, ConfigProvider, Carousel } from "antd";
import { PushpinFilled } from "@ant-design/icons";
import logo_pink from "../assets/images/logo_pink.png";

import { useNavigate, useParams } from "react-router-dom";
import { useNotionDB } from "../providers/CalendarProvider";
import { formatEventDate, formatEventTime } from "../utils/dateUtils";
import FullPageSpin from "../components/fullPageSpin";
import PerformerCard from "../components/performerCard";
import RsvpForm from "../forms/rsvpForm";

const { useBreakpoint } = Grid;

const EventDetail: React.FC = () => {
    const screens = useBreakpoint();
    const isBelowMd = !screens.md;
    const navigate = useNavigate();

    // Get event ID from URL parameters
    const { slug } = useParams<{ slug: string }>();

    // Fetch data from context
    const { eventBySlug, loading, error } = useNotionDB();
    if (!slug) {
        return null;
    }
    const event = eventBySlug[slug];
    if (loading) {
        return <FullPageSpin />;
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
            }}
        >
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
    );

    const theme = {
        token: {
            colorText: "#ffffff",
            colorTextSecondary: "#ffffff",
            colorTextTertiary: "#ffffff",
        },
    };
    const carouselElement = event.eventImages?.length ? (
        <Carousel
            autoplay
            style={{ width: "100%", height: "auto", borderRadius: "4px", objectFit: "cover", border: "1px solid rgba(250, 250, 250, .8)" }}
            dotPosition="top"
            effect="fade"
            autoplaySpeed={5000}
            speed={500}
            pauseOnHover={true}
            draggable={true}
            dots={true}
            arrows={true}
        >
            {event.eventImages.map((image) => (
                <div key={image.imageUrl}>
                    <img
                        src={image.imageUrl}
                        alt={image.id}
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "4px",
                            objectFit: "cover",
                        }}
                    />
                </div>
            ))}
        </Carousel>
    ) : null;

    return (
        <ConfigProvider theme={theme}>
            <Helmet>
                {/* Open Graph Tags */}
                <meta property="og:title" content={'Honey\'s Presents; ' + event.title} />
                <meta property="og:description" content={event.description || "Join us!"} />
                <meta property="og:image" content={event.thumbnail} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />

                {/* Twitter Card Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={'Honey\'s Presents; ' + event.title} />
                <meta name="twitter:description" content={event.description || "Join us!"} />
                <meta name="twitter:image" content={event.thumbnail} />
            </Helmet>
            <div
                style={{
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                <Row style={{ maxWidth: 1080, margin: "60px 15px" }}>
                    <Col xs={24} style={{ display: "flex", justifyContent: "center" }}>
                        <img
                            onClick={() => navigate("/calendar")}
                            src={logo_pink}
                            alt="Logo"
                            style={{
                                cursor: "pointer",
                                width: "600px",
                                maxWidth: "90%",
                            }}
                        />
                    </Col>
                    {isBelowMd ? (
                        <Col
                            xs={24}
                            md={12}
                            style={{
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            {thumbailElement}
                        </Col>
                    ) : null}

                    <Col xs={24} md={12}>
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
                            {formatEventDate(event.date)}
                            <br />
                            {formatEventTime(event.date)}
                        </Typography.Title>
                        <Typography.Paragraph>
                            <a
                                href="https://maps.app.goo.gl/mVQPWXFaPKv3j3wPA"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "white" }}
                            >
                                <PushpinFilled /> 93 Scott Ave.
                                <br />
                                Brooklyn, NY 11237
                            </a>
                        </Typography.Paragraph>
                        {event.ticketUrl ? (
                            <a className='gradient-button' href={event.ticketUrl} style={{ marginTop: '5px', marginBottom: '5px' }} target="_blank">
                                Get Tickets
                            </a>
                        ) : null}
                        {/* <ShareButton url={window.location.href} title={event.title} /> */}
                        <Typography.Paragraph>{event.description}</Typography.Paragraph>
                        {event.smsListId ? (
                            <RsvpForm listId={event.smsListId} />
                        ) : null}
                        {event.performers && event.performers.length > 0 && (
                            <>
                                {event.performers.filter((performer) => performer.isHost).length > 0 ?
                                    <Typography.Title level={3} style={{ fontWeight: 600 }}>
                                        Line Up
                                    </Typography.Title>
                                    : null}
                                <Typography.Title level={4} style={{ fontWeight: 600 }}>
                                    Performers
                                </Typography.Title>
                                {event.performers.filter((performer) => !performer.isHost).map((performer) => (
                                    <PerformerCard performer={performer} />
                                ))}
                                {event.performers.filter((performer) => performer.isHost).length > 0 ?
                                    <>
                                        <Typography.Title level={4} style={{ fontWeight: 600 }}>
                                            Hosts
                                        </Typography.Title>
                                        {event.performers.filter((performer) => performer.isHost).map((performer) => (
                                            <PerformerCard performer={performer} />
                                        ))}
                                    </>
                                    : null}

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
                    {carouselElement && (
                        <Col xs={24} style={{ marginTop: "30px" }}>
                            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                                {carouselElement}
                            </div>
                        </Col>
                    )}
                </Row>

            </div>
        </ConfigProvider>
    );
};

export default EventDetail;