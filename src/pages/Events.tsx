import { Row, Col, Typography, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeadForm from "../forms/leadForm";
import theme from "../theme.json";

const { Title } = Typography;

const Events: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchParams] = useSearchParams();

  // Check for the URL parameter `openModal` when the component mounts
  useEffect(() => {
    const openModal = searchParams.get("openModal")?.toLowerCase() === "true";
    if (openModal) {
      setIsModalVisible(true);
    }
  }, [searchParams]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // const eventButton = (
  //   <div style={{ alignContent: "left", display: "flex", justifyContent: "left", marginTop: '15px', marginBottom: '15px' }}>
  //     <Button size="large" className="gradient-button" onClick={showModal}>
  //       Event Inquiry
  //     </Button>
  //   </div>
  // )
  const formTextStyle = {
    fontWeight: 600,
    color: theme.token.colorHighlight,
    // background: `linear-gradient(90deg, #ff7e5f, ${theme.token.colorHighlight})`, /* Adjust gradient colors */
    // webkitTextFillColor: 'transparent',
    // textDecoration: 'underline',
    cursor: 'pointer'
  }
  const rowStyle = { maxWidth: '990px', margin: 'auto', marginTop: '30px' }
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
            filter: "grayscale(50%) contrast(140%) brightness(130%)",
          }}
        ></video>
      </div>
      <div className="full-page-video-body" style={{ top: "-160px" }}>
        <Row
          style={rowStyle}
          gutter={[16, 16]}
          align={'top'}
        >
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Host with Us
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Title level={4} style={{ fontWeight: 300 }}>
              Honey’s offers flexible event space that infuses the neighborhood’s industrial roots with a spirit of
              creativity. It’s a place where flavor, sound, and movement converge, creating a unique and unforgettable
              setting for gatherings of all kinds. From private dinners and lively parties to workshops, weddings, and
              creative projects like photo or film shoots, Honey’s provides a versatile backdrop for your vision.

            </Title>
          </Col>
        </Row>
        <Row
          style={rowStyle}
          gutter={[16, 16]}
          align={'top'}
        >
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Contact
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Title level={4} style={{ fontWeight: 300 }}>
              To learn more about our special event options and availability, please fillout this <span style={formTextStyle} onClick={showModal}>Event Inquiry Form</span>.
              <br />
              For general inquiries contact{" "}
              <a href="mailto:manager@honeysbrooklyn.com">manager@honeysbrooklyn.com</a>.
            </Title>


          </Col>
        </Row>


        <Row
          style={rowStyle}
          gutter={[16, 16]}
          align={'top'}
        >
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Weddings
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>

            <Title level={4} style={{ fontWeight: 300 }}>
              Honey’s is the perfect setting for couples seeking a wedding experience that’s creative, authentic, and unforgettable. Rooted in community and creativity, Honey’s blends warm sophistication with raw creativity, offering a space that feels both intimate and alive.
              <br />
              <br />
              Whether you’re planning a cozy ceremony, a lively reception, or both, Honey’s provides a flexible, thoughtfully designed backdrop that captures the spirit of your love story.
              {/* <span style={formTextStyle} onClick={showGalleryModal}>Gallery</span> */}
            </Title>
          </Col>
        </Row>
      </div>
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null} width={600}>
        <LeadForm onSuccess={() => setIsModalVisible(false)} />
      </Modal>
    </>
  );
};

export default Events;