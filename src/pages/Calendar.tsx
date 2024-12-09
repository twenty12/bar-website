import React, { useEffect, useState } from "react";
import { Col, List, Row, Spin, Typography } from "antd";
import { Event } from "../types";
import EventCard from "../components/eventCard";

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
    return <Spin tip="Loading calendar..." />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Upcoming</Title>
        {events.map((event) => (
            <EventCard event={event} />
        ))}
    </div>
  );
};

export default Calendar;