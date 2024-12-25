import React from "react";
import { Row, Typography } from "antd";

import EventCard from "../components/eventCard";
import FullPageSpin from "../components/fullPageSpin";
import { useNotionDB } from "../providers/NotionDBProvider";
// import StayAdvisedForm from "../components/stayAdvised";

const Calendar: React.FC = () => {
  const { events, loading, error } = useNotionDB();

  if (loading) {
    return <FullPageSpin />;
  }

  // if (error) {
  //   return (
  //     <div>
  //       <Typography.Title level={3} style={{ color: "red" }}>
  //         Error: {error}
  //       </Typography.Title>
  //     </div>
  //   );
  // }

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