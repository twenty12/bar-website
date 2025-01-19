import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Col, Row, Typography, Grid } from "antd";
import { Event, Performer } from "../types";
import { formatEventDate, formatEventTime } from "../utils/dateUtils";
import { grey } from '@ant-design/colors';
import { useNavigate } from "react-router-dom";
import theme from "../theme.json";
import { generateGradient } from "../utils/styleUtils";

const { Title } = Typography;
const { useBreakpoint } = Grid;
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const isBelowMd = !useBreakpoint().md;
    const detialStyle = { margin: '15px', color: grey[6], fontWeight: '400', marginTop: '0px', marginBottom: '0px' }
    const navigate = useNavigate();
    const handleClick = () => {
        if (event.thumbnail) {
            navigate(`/event/${event.slug}`);
        }
    }
    const thumbnail = event.thumbnail ? event.thumbnail : 'https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/images/favicon_large.png'
    return (
        <Row
            className="event-card"
            style={{ marginBottom: '30px', cursor: event.thumbnail ? 'pointer' : 'default' }}
            onClick={handleClick}
        >
            <Col xs={24} md={4}>
                <span style={isBelowMd ? { position: 'absolute', top: '15px', left: '15px', border: '3px solid black', background: 'white' } : {}}>
                    <Title level={2} style={{ marginLeft: '15px', marginTop: '15px', marginRight: '15px', marginBottom: 0, fontWeight: 500 }}>
                        {formatEventDate(event.date)}
                    </Title>
                    <Title level={4} style={{ marginLeft: '15px', marginTop: '0', fontWeight: 500, color: 'gray' }}>
                        {formatEventTime(event.date)}
                    </Title>

                </span>
                {isBelowMd ? (
                    <div style={{ padding: '15px' }}>
                        <img
                            className="event-thumbnail-mobile"
                            src={thumbnail}
                            alt={event.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                backgroundColor: '#f0f0f0',
                            }}
                        />
                    </div>
                ) : null}
            </Col>
            <Col key={event.id} xs={18} md={20}>
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    {isBelowMd ? null : (
                        <img
                            className="event-thumbnail-desktop"
                            src={thumbnail}
                            alt={event.title}
                            style={{
                            }}
                        />
                    )}
                    <div>
                        <Title level={2} style={{ margin: '15px', fontWeight: 600 }}>
                            {event.title}
                        </Title>
                        {event.ticketUrl ? (
                            <a className='gradient-button' href={event.ticketUrl} style={{ margin: '15px', marginTop: '5px' }} target="_blank">
                                Get Tickets
                            </a>
                        ) : null}
                        {event.description ? (
                            <>
                                <Title level={5} style={detialStyle} >{event.description}</Title>
                                <br />
                            </>
                        ) : null}
                        {event.performers ? (
                            event.performers.map((performer: Performer) => (
                                <Title level={5} style={detialStyle}>
                                    {performer.imageUrl ? (
                                        <img
                                            src={performer.imageUrl}
                                            alt={performer.name}
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                borderRadius: "50%",
                                                marginRight: "8px",
                                                objectFit: "cover",
                                                verticalAlign: "middle",
                                                border: "1px solid white",
                                            }}
                                        />
                                    ) : (
                                        <span
                                            style={{
                                                width: "22px",
                                                height: "22px",
                                                position: "relative",
                                                borderRadius: "50%",
                                                border: `1px solid ${theme.token.colorHighlight}`,
                                                marginLeft: "1px",
                                                marginRight: "9px",
                                                background: generateGradient(performer.instagram || performer.name),
                                                verticalAlign: "middle",
                                                display: "inline-block", // Ensures it behaves like the img
                                            }}
                                        >
                                            <UserOutlined
                                                style={{
                                                    fontSize: "14px", // Adjust icon size
                                                    color: "rgb(250, 250, 250)", // Icon color
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                }}
                                            />
                                        </span>
                                    )}
                                    {performer.name}{'  '}
                                    {performer.instagram ? (
                                        <>
                                            <a
                                                target="_blank"
                                                href={'https://www.instagram.com/' + performer.instagram}
                                                style={{ color: grey[6] }}
                                            >
                                                @{performer.instagram}
                                            </a>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </Title>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default EventCard;