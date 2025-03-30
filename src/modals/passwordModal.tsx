import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";

interface PasswordModalProps {
  isUnlocked: boolean;
  setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isUnlocked,
  setIsUnlocked,
  setEmail,
}) => {
  const [password, setPassword] = useState("");
  const [email, setEmailState] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const expectedPassword = "93Scott";
  const adminPassword = "Z>@0391/S'eW"; // Replace with a secure random hash

  useEffect(() => {
    if (password === expectedPassword || (email.endsWith("@honeysbrooklyn.com") && password === adminPassword)) {
      handleUnlock();
    }
  }, [password, email]);

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  useEffect(() => {
    const passwordCookie = getCookie("passwordAccepted");
    if (passwordCookie === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(e.target.value);
    if (setEmail) setEmail(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUnlock();
    }
  };

  const handleUnlock = () => {
    if (password === expectedPassword || (email.endsWith("@honeysbrooklyn.com") && password === adminPassword)) {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsUnlocked(true);
        setCookie("passwordAccepted", "true", 30);
      }, 500);
    } else {
      message.error("Incorrect password");
    }
  };

  if (isUnlocked) {
    return null;
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
          transition: "opacity 0.5s ease",
          opacity: isFadingOut ? 0 : 1,
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
      {setEmail && (
        <Input
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
          style={{ marginBottom: 10 }}
        />
      )}
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
