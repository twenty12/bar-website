import { Row, Col, Typography, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeadForm from "../forms/leadForm";
import theme from "../theme.json";
import { useGallery } from "../providers/GalleryProvider";
import { GalleryTypes } from "../enums";

const { Title } = Typography;

const Events: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const { showGalleryModal } = useGallery();
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
    textDecoration: 'underline',
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
          poster="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/wedding_1_poster.jpg"
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/wedding_1.mp4"
          style={{
            width: "100%",
            objectFit: "cover",
            filter: "grayscale(50%) contrast(140%) brightness(130%)",
          }}
        ></video>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            fontSize: "14px",
            color: "#fff",
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "5px 10px",
            borderRadius: "4px",
            zIndex: 1, // Ensures it's above the video
          }}
        >
          Video Credit: Amanda Hamm (IG: @amanda.hamm.events)
        </div>
      </div>
      <div className="full-page-video-body">
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
              We host weddings, private dinners, and parties of all kinds, offering a flexible space, full bar, and catering options to match the occasion. See our{' '}
              <span style={formTextStyle} onClick={() => showGalleryModal(GalleryTypes.Space)}>gallery for inspiration</span>.
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
              To learn more about our special event options and availability, please fillout this <span style={formTextStyle} onClick={showModal}>event inquiry form</span>.
            </Title>
          </Col>
        </Row>
        <Row
          style={{ ...rowStyle }}
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
              <br />
              <br />
              Check out our <span style={formTextStyle} onClick={() => showGalleryModal(GalleryTypes.Wedding)}>wedding gallery</span> and get ispired.
            </Title>
          </Col>
        </Row>
        <Row
          style={{ ...rowStyle, marginBottom: '60px' }}
          gutter={[16, 16]}
          align={'top'}
        >
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Activations
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>

            <Title level={4} style={{ fontWeight: 300 }}>
              Host impactful product launches, brand activations, or PR events in a space that inspires creativity and connection.Honey’s is an authentic platform and amplifying backdrop that will set the stage for introducing your product or concept with clarity and impact.
              Check out our <span style={formTextStyle} onClick={() => showGalleryModal(GalleryTypes.Activation)}>activation gallery</span>.

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