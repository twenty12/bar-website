import { Row, Col, Typography, Modal, Grid } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeadForm from "../forms/leadForm";
import theme from "../theme.json";
import { GalleryTypes } from "../enums";
import HeaderGallery from "../components/HeaderGallery";

const { Title } = Typography;
const { useBreakpoint } = Grid;


const Events: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const screens = useBreakpoint();

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
  const instagramTextStyle = {
    cursor: 'pointer'
  }
  const height = screens.md ? 'calc(100vh - 64px)' : 'auto';

  return (
    <>
      <Row style={{ width: '100%', margin: 0, height: height }}>
        <Col xs={24} md={12} style={{
          width: screens.md ? '50vw' : '100vw',
          padding: 0,
          margin: 0
        }}>
          <HeaderGallery galleryType={GalleryTypes.Space} />
        </Col>
        <Col xs={24} md={12} style={{
          height: height,
          overflowY: 'auto',
          backgroundColor: 'white',
          overscrollBehavior: 'auto'
        }}>
          <Row gutter={[16, 16]} style={{ margin: '15px' }}>
            <Col span={24}>
              <Typography.Title level={3}>
                Host with Us
              </Typography.Title>
              <Title level={4} style={{ fontWeight: 300, marginBottom: '20px' }}>
                Honey's bar, winery, and rooftop garden are all available for private events. With a full kitchen onsite, we can host everything from intimate sit-down dinners to abundant banquet-style feasts.
                <br />
                <br />
                More than the spaces, it's our people who tie everything together. Beyond our experienced in-house team, we bring the deep  Honey's network of thoughtful hospitality partners - florists, DJs, caterers, and more.
                <br />
                <br />
                Every event we help create reflects the spirit and personality of it's host. We welcome brand activations, fundraisers, galas, wedding after-parties, and of course, birthday celebrations.
                <br />
                <br />
                To learn more and discuss availability, please use our <span style={formTextStyle} onClick={showModal}>event inquiry form</span>.
                <br />
                <br />
                <span style={{ fontStyle: 'italic' }}>"My favorite birthday party ever"</span><br /><a href="https://www.instagram.com/alexwcrowder/" style={instagramTextStyle}>Alex Crowder</a>
              </Title>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null} width={600}>
        <LeadForm onSuccess={() => setIsModalVisible(false)} />
      </Modal>
    </>
  );
};

export default Events;