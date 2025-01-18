import React from "react";
import { Row, Typography } from "antd";

import EventCard from "../components/eventCard";
import FullPageSpin from "../components/fullPageSpin";
import { useNotionDB } from "../providers/CalendarProvider";
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
      {/* <StayAdvisedForm /> */}

      {/* <div
        style={{
          backgroundColor: "white", // Dark background
          margin: "5px 0", // Spacing between performers
          marginLeft: isBelowMd ? "5px" : "auto",
          marginRight: isBelowMd ? "15px" : "auto",
          color: "white", // Light text for contrast
          border: "2px solid rgba(255, 121, 0, 0.5)",
          borderRadius: "4px", // Slightly more rounded corners
          padding: "10px",
          width: isBelowMd ? "auto" : "70%", // Full width
          display: "flex",            // Flexbox layout
          flexDirection: "column",    // Stack children vertically
        }}
      >
        <Typography.Title
          level={4}
          style={{ marginTop: "0px", marginBottom: "0px", textAlign: "center", fontWeight: 300 }}
        >
          🏗️ 🥶 Event Space Renovations in Progress 🥶 🏗️ <br />
        </Typography.Title>
        <Typography.Title
          level={5}
          style={{ marginTop: "15px", marginBottom: "0px", fontWeight: 300 }}
        >
          We're taking advantage of the winter season to renovate our space with a major audio upgrade and new bar additions.
          Things will be a little quieter this winter. <br/><br/>Stay tuned, this spring we will be in full force with a stacked lineup of parites! <br />
        </Typography.Title>
      </div> */}
      <div>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;