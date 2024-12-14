import { Row, Col, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const Events: React.FC = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Video Section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/splash_vid_1.mp4"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "calc(100vh - 90px)", // Leaves space for text
            objectFit: "cover",
          }}
        ></video>
      </div>
      <div
        style={{
          position: "relative",
          maxWidth: '1600px',
          margin: '30px',
          // top: "100vh",
          // width: "100%",
          // boxSizing: "border-box",
        }}
      >
        <Row>
          <Col span={24}>
            <Title level={1} style={{ fontWeight: 300, margin: 0 }}>
              Honey’s is an iconic, flexible venue that integrates its industrial heritage with its creative future. It’s a space where flavor, sound, and movement converge, providing a unique and unforgettable setting for private events of all kinds.            <br />
              <br />
            </Title>
            <Title level={3} style={{ marginTop: 0, fontWeight: 300 }}>
              For private rentals, please use <a style={{ fontWeight: 600, textDecoration: 'underline' }} href="https://us13.list-manage.com/contact-form?u=9c795c31ffa7265aa2c83bec7&form_id=a40f2ef9819e25d70d2fdeec3afa5a30">this form</a>.
            </Title>
            <br />
            <Title level={3} style={{ marginTop: 0, fontWeight: 300 }}>
              For smaller reservation please contact <a href="mailto:manager@honeysbrooklyn.com">manager@honeysbrooklyn.com</a>
            </Title>
            <br />
            <br />
            <br />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Events;