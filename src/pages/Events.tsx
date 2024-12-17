import { Row, Col, Typography, Divider } from "antd";
import React from "react";

const { Title } = Typography;

const Events: React.FC = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          top: '-63px',
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
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/outside_1.MOV"
          style={{
            position: "absolute",
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
          marginLeft: '30px',
          marginRight: '30px',
          top: "-160px"
          // margin: '30px',
          // top: "100vh",
          // width: "100%",
          // boxSizing: "border-box",
        }}
      >
        <Title
          level={1}
          style={{
          }}
        >Rentals</Title>
        <Row>
          <Col span={24}>
            <Title level={1} style={{ fontWeight: 300, margin: 0 }}>
              Honey’s is an iconic, flexible venue that integrates its industrial heritage with its creative future. It’s a space where flavor, sound, and movement converge, providing a unique and unforgettable setting for private events of all kinds.            <br />
              <br />
            </Title>
          </Col>
        </Row>
        {/* <img
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/images/outside_catering_night.jpg"
          style={{
            width: "100vw", // Full width of the screen
            margin: 0, // Removes extra margins
            left: '-30px',
            position: "relative",
            display: "block", // Ensures the image behaves as a block element
            boxSizing: "border-box", // Prevents width issues with padding or borders
          }}
          alt="Outside Catering Night"
        /> */}
        <Divider />
        <Row>
          <Col span={24}>
            <Title level={1} style={{ fontWeight: 300 }}>
              For large parties and public events, please use <a style={{ fontWeight: 600, textDecoration: 'underline' }} href="https://us13.list-manage.com/contact-form?u=9c795c31ffa7265aa2c83bec7&form_id=a40f2ef9819e25d70d2fdeec3afa5a30">this form</a>.
            </Title>
            <br />
            <br />
            <br />
          </Col>
        </Row>
      </div >
    </>
  );
};

export default Events;