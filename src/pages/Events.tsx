import { Row, Col, Typography, Divider, Button, Modal } from "antd";
import React, { useState } from "react";
import LeadForm from "../forms/leadForm";


const { Title } = Typography;

const Events: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="full-page-video-wrapper">
        {/* Video Section */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/events_2.mp4"
          style={{
            width: "100%",
            objectFit: "cover",
          }}
        ></video>
      </div>
      <div className="full-page-video-body" style={{ top: "-160px" }}>
        <Title level={1}>Rentals</Title>
        <Row>
          <Col span={24}>
            <Title level={1} style={{ fontWeight: 300, margin: 0 }}>
              Honey’s offers flexible event space that infuses the neighborhood’s industrial roots with a spirit of
              creativity. It’s a place where flavor, sound, and movement converge, creating a unique and unforgettable
              setting for gatherings of all kinds. From private dinners and lively parties to workshops, weddings, and
              creative projects like photo or film shoots, Honey’s provides a versatile backdrop for your vision. Reach
              out to learn more about our special event options and availability.
              <br />
              <br />
            </Title>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <Title level={1} style={{ fontWeight: 300 }}>
              If you are interested in renting space for your event, please fill out{" "}
              <Button type="link" style={{ padding: 0, fontWeight: 600 }} onClick={showModal}>
                this form
              </Button>
              .
            </Title>
            <br />
            <br />
            <Title level={1} style={{ fontWeight: 300 }}>
              For general inquiries contact{" "}
              <a href="mailto:manager@honeysbrooklyn.com">manager@honeysbrooklyn.com</a>.
            </Title>
            <br />
            <br />
          </Col>
        </Row>
      </div>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <LeadForm onSuccess={()=>setIsModalVisible(false)}/>
      </Modal>
    </>
  );
};

export default Events;