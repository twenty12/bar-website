import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";

interface PasswordModalProps {
  isUnlocked: boolean;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
}
const PasswordModal: React.FC<PasswordModalProps> = ({
  isUnlocked,
  setIsUnlocked,
}) => {
  const [password, setPassword] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false); // State to handle fade-out animation
  const expectedPassowrd = "93Scott";

  useEffect(() => {
    if (password === expectedPassowrd) {
      handleUnlock();
    }
  }, [password]);

  // Function to set a cookie
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  // Function to get a cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  // Check if the password cookie is set on initial load
  useEffect(() => {
    const passwordCookie = getCookie("passwordAccepted");
    if (passwordCookie === "true") {
      setIsUnlocked(true); // If cookie exists, unlock the content
    }
  }, []);

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handle pressing Enter to unlock
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUnlock(); // Trigger unlock on Enter key press
    }
  };

  // Handle unlock button click
  const handleUnlock = () => {
    if (password === expectedPassowrd) {
      setIsFadingOut(true); // Start the fade-out animation
      setTimeout(() => {
        setIsUnlocked(true); // Unlock after animation completes
        setCookie("passwordAccepted", "true", 30); // Set cookie for 30 days
      }, 500); // Match this timeout with the fade-out animation duration
    } else {
      message.error("Incorrect password");
    }
  };

  // Render the modal only if not unlocked
  if (isUnlocked) {
    return null; // Don't show anything if already unlocked
  }

  return (
      <Modal
        open={!isUnlocked}
        width={300}
        styles={{
          body: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "opacity 0.5s ease", // Add transition for fade-out effect
            opacity: isFadingOut ? 0 : 1, // Change opacity when fading out
          },
          mask: {
            background: 'url("https://assets.getpartiful.com/backgrounds/sunrise/web.jpg") no-repeat center center / cover',
            
          },
        }}
        footer={null}
        closable={false}
      >
        <Typography.Title level={3} style={{ marginTop: 5, marginBottom: 15 }}>
          <LockOutlined />
        </Typography.Title>
        <Input.Password
          placeholder="Enter password"
          value={password}
          onKeyDown={handleKeyPress}
          onChange={handlePasswordChange}
        />
        <Button
          onClick={handleUnlock}
          style={{ marginTop: 15, paddingLeft: "30px", paddingRight: "30px" }}
        >
          Unlock
        </Button>
      </Modal>
  );
};

export default PasswordModal;
