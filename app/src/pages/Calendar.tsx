import React, { useEffect, useState } from "react";
import { List, Spin, Typography } from "antd";

const { Title } = Typography;

interface Event {
  id: string;
  title: string;
  date: string | null;
}

const CalendarList: React.FC = () => {
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
      <Title level={2}>Upcoming Events</Title>
      <List
        bordered
        dataSource={events}
        renderItem={(item) => (
          <List.Item>
            <strong>{item.title}</strong> - {item.date ? new Date(item.date).toLocaleDateString() : "No date"}
          </List.Item>
        )}
      />
    </div>
  );
};

export default CalendarList;