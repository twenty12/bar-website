import { Row, Col, Typography, Divider } from "antd";
import React from "react";

const { Title } = Typography;

const Events: React.FC = () => {
  return (
    <>
      <div
        className="full-page-video-wrapper"
      >
        {/* Video Section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/events_2.mp4"
          style={{

          }}
        ></video>
      </div>
      <div className="full-page-video-body" style={{top: '-160px'}}>
        <Title
          level={1}
        >Rentals</Title>
        <Row>
          <Col span={24}>
            <Title level={1} style={{ fontWeight: 300, margin: 0 }}>
            Honey’s offers flexible event space that infuses the neighborhood’s industrial roots with a spirit of creativity. It’s a place where flavor, sound, and movement converge, creating a unique and unforgettable setting for gatherings of all kinds. From private dinners and lively parties to workshops, weddings, and creative projects like photo or film shoots, Honey’s provides a versatile backdrop for your vision. Reach out to learn more about our special event options and availability.
              <br />
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
              If you are interested in renting space for your event, please get in touch through <a style={{ fontWeight: 600, textDecoration: 'underline' }} href="https://middenhospitality.tripleseat.com/party_request/39986">this form</a>.
            </Title>
            <br />
            <br />
            <Title level={1} style={{ fontWeight: 300 }}>
              For general inquries contact <a style={{}} href="mailto:manager@honeysbrooklyn.com">manager@honeysbrooklyn.com</a>.
            </Title>
            <br />
            <br />
          </Col>
        </Row>
      </div >
    </>
  );
};

export default Events;