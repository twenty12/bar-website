import { Row, Col, Typography, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeadForm from "../forms/leadForm";
import theme from "../theme.json";
import { useGallery } from "../providers/GalleryProvider";
import { GalleryTypes } from "../enums";

const { Title, Text } = Typography;

// const quotes = [
//   {
//     quote: "Honey's provided the perfect backdrop for our wedding - intimate yet vibrant, with just the right amount of character.",
//     author: "Sarah & Michael"
//   },
//   {
//     quote: "The team at Honey's made our wedding day feel effortless. Their attention to detail and creative vision brought our dream to life.",
//     author: "Jessica & Alex"
//   },
//   {
//     quote: "We wanted a wedding that felt authentic to us, and Honey's delivered exactly that - a space that's both elegant and full of life.",
//     author: "Emily & David"
//   },
//   {
//     quote: "The combination of industrial charm and warm hospitality at Honey's created the perfect atmosphere for our celebration.",
//     author: "Rachel & James"
//   }
// ];

const eventTypes = [
  "Weddings & Receptions",
  "Engagement Parties",
  "Bridal Showers",
  "Rehearsal Dinners",
  "Anniversary Celebrations",
  "Bachelor/Bachelorette Parties",
  "Wedding Welcome Parties",
  "Day-After Brunches"
];

const Weddings: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const { showGalleryModal } = useGallery();

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

  const formTextStyle = {
    fontWeight: 600,
    color: theme.token.colorHighlight,
    textDecoration: 'underline',
    cursor: 'pointer'
  }

  const rowStyle = { maxWidth: '990px', margin: 'auto', marginTop: '30px' }

  return (
    <>
      <div className="full-page-video-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/wedding_1_poster.jpg"
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/wedding_outside_1.mp4"
          style={{
            width: "100%",
            objectFit: "cover",
            filter: "grayscale(50%) contrast(110%) brightness(90%)",
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
            zIndex: 1,
          }}
        >
          Video Credit: Amanda Hamm (IG: @amanda.hamm.events)
        </div>
      </div>
      <div className="full-page-video-body">
        <Row style={rowStyle} gutter={[16, 16]} align={'top'}>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Contact
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Title level={4} style={{ fontWeight: 300 }}>
              To learn more about our wedding options and availability, please fill out this <span style={formTextStyle} onClick={showModal}>wedding inquiry form</span>.
            </Title>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={[16, 16]} align={'top'}>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Host with Us
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Title level={4} style={{ fontWeight: 300, marginBottom: '20px' }}>
              Honey's is the perfect setting for couples seeking a wedding experience that's creative, authentic, and unforgettable. See our{' '}
              <span style={formTextStyle} onClick={() => showGalleryModal(GalleryTypes.Wedding)}>wedding gallery</span> for inspiration.
            </Title>
            <div>
              {eventTypes.map((event, index) => (
                <Text key={index} style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>
                  {event}
                </Text>
              ))}
            </div>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={[16, 16]} align={'top'}>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              Lead Inquiry
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <LeadForm onSuccess={() => setIsModalVisible(false)} />
          </Col>
        </Row>
      </div>
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null} width={600}>
        <LeadForm onSuccess={() => setIsModalVisible(false)} />
      </Modal>
    </>
  );
};

export default Weddings; 