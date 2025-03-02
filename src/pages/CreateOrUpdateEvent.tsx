import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo_black from "../assets/images/logo_black.png";
import EventForm from "../forms/eventForm";
import PasswordModal from "../modals/passwordModal";

const CreateOrUpdateEvent: React.FC = () => {
  const { eventId } = useParams<{ eventId?: string }>(); // ✅ Get event ID from URL
  const navigate = useNavigate();
  const [isUnlocked, setIsUnlocked] = useState(false); // ✅ State to manage locked state

  return (
    <>
      {/* Password Modal - Only shows if locked */}
      <PasswordModal isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />

      {/* Only render content if unlocked */}
      {isUnlocked && (
        <div
          className="shifting-gradient"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "100vh",
            width: "100vw",
            paddingTop: "20px",
          }}
        >
          {/* Logo */}
          <img
            src={logo_black}
            alt="Logo"
            style={{
              width: "200px",
              marginBottom: "20px",
            }}
          />

          {/* Navigation Links */}
          <div
            onClick={() => navigate("/events")}
            style={{
              cursor: "pointer",
              marginBottom: "20px",
              fontSize: "18px",
              textDecoration: "underline",
            }}
          >
            Back to Events
          </div>

          {/* Event Form */}
          <div style={{ maxWidth: "600px", width: "100%", padding: "20px" }}>
            <EventForm eventId={eventId} />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateOrUpdateEvent;