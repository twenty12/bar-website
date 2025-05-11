import { Row, Col, Modal, Grid } from "antd";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LeadForm from "../forms/leadForm";
import { GalleryTypes } from "../enums";
import HeaderGallery from "../components/HeaderGallery";
import EventsMenu from "../components/EventsMenu";
import AboutSection from "../components/events/AboutSection";
import WeddingsSection from "../components/events/WeddingsSection";
import SpecsSection from "../components/events/SpecsSection";

const { useBreakpoint } = Grid;

const Events: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const screens = useBreakpoint();
  const [selectedMenuKey, setSelectedMenuKey] = useState('about');

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

  const handleMenuSelect = (key: string) => {
    setSelectedMenuKey(key);
  };

  const height = screens.md ? 'calc(100vh - 64px)' : 'auto';

  return (
    <>
      <Row style={{ width: '100%', margin: 0, height: height }}>
        <Col xs={24} md={12} style={{
          width: screens.md ? '50vw' : '100vw',
          padding: 0,
          margin: 0
        }}>
          <HeaderGallery galleryType={selectedMenuKey === 'weddings' ? GalleryTypes.Wedding : GalleryTypes.Space} />
        </Col>
        <Col xs={24} md={12} style={{
          height: height,
          overflowY: 'auto',
          backgroundColor: 'white',
          overscrollBehavior: 'auto'
        }}>
          <EventsMenu 
            selectedKey={selectedMenuKey}
            onSelect={handleMenuSelect}
          />
          <Row gutter={[16, 16]} style={{ margin: '15px' }}>
            {selectedMenuKey === 'about' && <AboutSection showModal={showModal} />}
            {selectedMenuKey === 'weddings' && <WeddingsSection />}
            {selectedMenuKey === 'specs' && <SpecsSection />}
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