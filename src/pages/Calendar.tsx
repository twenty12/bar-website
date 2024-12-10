import React, { useEffect, useState } from "react";
import { Col, List, Row, Spin, Typography } from "antd";
import { Event } from "../types";
import EventCard from "../components/eventCard";
import { Header } from "antd/es/layout/layout";
import StayAdvisedForm from "../components/stayAdvised";
import FullPageSpin from "../components/fullPageSpin";

const { Title } = Typography;

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/notion");
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <FullPageSpin />;
  }

  return (
    <>
    <Row style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
        <Typography.Title level={1} style={{ margin: "20px", fontSize: '50px'}}>
          Calender
        </Typography.Title>
    <StayAdvisedForm />
    </Row>
    <div>
        {events.map((event) => (
            <EventCard event={event} />
        ))}
    </div>
    </>
  );
};

export default Calendar;