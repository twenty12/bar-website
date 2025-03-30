import React, { useState } from "react";
import { Typography, Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../modals/passwordModal";
import { useNotionDB } from "../providers/CalendarProvider";
import FullPageSpin from "../components/fullPageSpin";
import logo_black from "../assets/images/logo_black.png";
import { Event } from "../types";

const UserEventsPage: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("test@test.com");
  const { events, loading } = useNotionDB();
  const navigate = useNavigate();

  if (loading) {
    return <FullPageSpin />;
  }
  const userEvents: Event[] = events.filter((event: Event) => event.contactEmail === userEmail);
  userEvents.forEach(event => console.log("Event thumbnail:", event));

  const columns = [
    {
      title: "Event Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Poster",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => <img src={thumbnail} alt="Event Poster" style={{ width: "50px" }} />,
    },
  ];

  return (
    <>
      {/* <PasswordModal
        isUnlocked={isUnlocked}
        setIsUnlocked={setIsUnlocked}
        setEmail={setUserEmail}
      /> */}
      <div style={{ textAlign: "center" }}>
        <img
          src={logo_black}
          className="hover-text"
          onClick={() => { navigate('/') }}
          alt="Logo"
          style={{
            maxWidth: "400px",
            marginTop: '30px',
          }}
        />
      </div>
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }} className="admin">
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Welcome, {userEmail}!
        </Typography.Title>
        <Button 
          style={{ marginBottom: "20px" }} 
          onClick={() => navigate("/eventEditor")}
        >
          Add Event
        </Button>
        {userEvents.length > 0 ? (
          <Table
            dataSource={userEvents.map(event => ({ ...event, key: event.id }))}
            columns={columns}
            onRow={(record) => ({
              onClick: () => navigate(`/eventEditor/${record.id}`),
              style: { cursor: "pointer" },
            })}
          />
        ) : (
          <Typography.Text>No events found for your email.</Typography.Text>
        )}
      </div>
    </>
  );
};

export default UserEventsPage;