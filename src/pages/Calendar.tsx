import React from "react";
import { Row, Typography } from "antd";

import EventCard from "../components/eventCard";
import FullPageSpin from "../components/fullPageSpin";
import { useNotionDB } from "../providers/NotionDBProvider";
// import StayAdvisedForm from "../components/stayAdvised";

const Calendar: React.FC = () => {
  const { events, loading } = useNotionDB();

  if (loading) {
    return <FullPageSpin />;
  }

  return (
    <div style={{ maxWidth: "1200px" }}>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <Typography.Title
          level={1}
          style={{ margin: "30px", marginLeft: "0", fontSize: "50px" }}
        >
          Calendar
        </Typography.Title>
        {/* <StayAdvisedForm /> */}
      </Row>
      <div>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;