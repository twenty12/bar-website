import React from "react";
import { Col, Row, Typography } from "antd";
import { Event, Performer } from "../types";
import { formatEventDate, formatEventTime } from "../utils/dateUtils";
import { grey } from '@ant-design/colors';

const { Title } = Typography;

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const detialStyle = { margin: '15px', color: grey[6], fontWeight: '400', marginTop: '0px', marginBottom: '0px' }
    return (
        <Row
            className="event-card hover-text"
            style={{marginBottom: '30px'}}
        >
            <Col xs={4}>
                <Title level={2} style={{ marginLeft: '15px', marginTop: '15px', marginBottom: 0, fontWeight: 500 }}>
                    {formatEventDate(event.date)}
                </Title>
                <Title level={4} style={{ marginLeft: '15px', marginTop: '0', fontWeight: 500, color: 'gray' }}>
                    {formatEventTime(event.date)}
                </Title>
            </Col>
            <Col key={event.id} xs={20} className="event-row">
                <div
                    style={{
                        display: "flex",
                    }}
                >
                    <img
                        src={event.thumbnail}
                        alt={event.title}
                        style={{
                        }}
                    />
                    <div>
                        <Title level={2} style={{ margin: '15px', fontWeight: 600 }}>
                            {event.title}
                        </Title>
                        {event.description ? (
                            <>
                                <Title level={5} style={detialStyle} >{event.description}</Title>
                                <br />
                            </>
                        ) : null}
                        {event.performers ? (
                            event.performers.map((performer: Performer) => (
                                <Title level={5} style={detialStyle}>
                                    {performer.name}{'  '}
                                    {performer.instagram ? <>(<a target="_blank" href={'https://www.instagram.com/' + performer.instagram} style={{ color: grey[6] }}>@{performer.instagram}</a>)</> : <></>}
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