import React, { useState } from "react";
import { Typography, Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import PasswordModal from "../modals/passwordModal";
import { useNotionDB } from "../providers/CalendarProvider";
import FullPageSpin from "../components/fullPageSpin";
import logo_black from "../assets/images/logo_black.png";
import { Event } from "../types";
import moment from "moment";
import { getCookie } from "../utils/cookieUtils";

const UserEventsPage: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>(getCookie("honeysEmail") || "");
  const { events, loading } = useNotionDB();
  const navigate = useNavigate();
  const isStaff = userEmail.endsWith("@honeysbrooklyn.com");
  if (loading) {
    return <FullPageSpin />;
  }
  const userEvents: Event[] = isStaff
    ? events
    : events.filter((event: Event) => event.contactEmail === userEmail)
  

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
      render: (date: string) => moment(date).format("MM/DD/YYYY"),
    },
    {
      title: "Poster",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => thumbnail ? <img src={thumbnail} alt="Event Poster" style={{ width: "50px" }} /> : null,
    },
  ];

  return (
    <>
      <PasswordModal
        isUnlocked={isUnlocked}
        setIsUnlocked={setIsUnlocked}
        setEmail={setUserEmail}
      />
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
        {isStaff && (
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => navigate("/eventEditor")}
        >
          Add Event
          </Button>
        )}
        {userEvents.length > 0 ? (
          <Table
            dataSource={userEvents.map(event => ({ ...event, key: event.id })).reverse()}
            columns={columns}
            onRow={(record) => ({
              onClick: () => navigate(`/eventEditor/${record.id}`),
              style: { cursor: "pointer" },
            })}
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            <Typography.Text>No events found for your email.</Typography.Text>
          </div>
        )}
      </div>
    </>
  );
};

export default UserEventsPage;