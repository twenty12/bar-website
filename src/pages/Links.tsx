import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_black from "../assets/images/logo_black.png";

const Links: React.FC = () => {
  const data: any = [
    {
      text: "Calendar",
      link: "/calendar",
    },
    {
      text: "Private Rental",
      link: "https://middenhospitality.tripleseat.com/party_request/39986",
    },
    {
      text: "Menu",
      link: "/menu",
    },
  ];

  const navigate = useNavigate(); // React Router's navigation hook

  // Define common button styles
  const buttonStyles = (isHovered: boolean): React.CSSProperties => ({
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    fontSize: "18px",
    margin: "15px",
    border: "1px solid black",
    borderRadius: "4px",
    padding: "18px",
    transition: "background 0.3s ease",
    cursor: "pointer",
    background: isHovered ? "white" : "rgba(255, 255, 255, 0.8)",
  });

  return (
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
      <img
        src={logo_black}
        alt="Logo"
        style={{
          width: "200px",
          marginBottom: "20px",
        }}
      />
      {data.map((item: any) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
          <div
            key={item.text}
            onClick={() => {
              if (item.link.startsWith("http")) {
                // Handle external links
                window.open(item.link, "_blank");
              } else {
                // Handle internal navigation
                navigate(item.link);
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={buttonStyles(isHovered)}
          >
            {item.text}
          </div>
        );
      })}
      <div
        onClick={() => {
          window.location.href = "mailto:info@yourdomain.com";
        }}
        style={buttonStyles(false)} // No hover effect on initial render
      >
        Email Us
      </div>
    </div>
  );
};

export default Links;