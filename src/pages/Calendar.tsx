import React, { useEffect, useState } from "react";
import { Row, Typography } from "antd";
import { Event } from "../types";
import EventCard from "../components/eventCard";
// import StayAdvisedForm from "../components/stayAdvised";
import FullPageSpin from "../components/fullPageSpin";


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
    <div style={{maxWidth: '1200px'}} >
      <Row style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
        <Typography.Title level={1} style={{ margin: "30px", marginLeft: '0', fontSize: '50px' }}>
          Calender
        </Typography.Title>
        {/* <StayAdvisedForm /> */}
      </Row>
      <div>
        {events.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;