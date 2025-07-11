import { Row, Col, Typography, Grid } from "antd";
import React from "react";
import { GalleryTypes } from "../enums";
import HeaderGallery from "../components/HeaderGallery";
import Icon from "../icons/icon";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const bodyTextStyle = {
  fontWeight: 300,
  marginBottom: '15px',
  marginTop: '0'
};

const headerStyle = {
  marginBottom: '0',
  marginTop: '15px'
};

const iconContainerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  marginBottom: '15px'
};

const iconStyle = {
  paddingRight: "15px",
  cursor: "pointer",
};

const Home: React.FC = () => {
  const screens = useBreakpoint();
  const height = screens.md ? 'calc(100vh - 64px)' : 'auto';
  const navigate = useNavigate();
  return (
    <>
      <Row style={{ width: '100%', margin: 0, height: height }}>
        <Col xs={24} md={12} style={{
          width: screens.md ? '50vw' : '100vw',
          padding: 0,
          margin: 0
        }}>
          <HeaderGallery galleryType={GalleryTypes.Home} />
        </Col>
        <Col xs={24} md={12} style={{
          height: height,
          overflowY: 'auto',
          backgroundColor: 'white',
          overscrollBehavior: 'auto',
          padding: '40px'
        }}>
          <Row gutter={[16, 16]}>
            <div style={iconContainerStyle}>
              <div
                onClick={() => navigate('/calendar')}
                style={iconStyle}
              >
                <Icon />
              </div>
            </div>
            <Title level={4} style={bodyTextStyle}>
              Honey's is a cocktail bar and multi-dimensional event space in Brooklyn, New York. Co-founded in 2016 by artist Arley Marks, Honey's is a cherished home to New York's creators. A network of a musicians, artists, designers, filmmakers, and chefs comes to Honey's for diverse programming, thoughtful drinks, and dynamic dance floors.
              <br />
              <br />
              Located on the border between Bushwick and East Williamsburg, Honey's features three distinct yet complementary spaces.
            </Title>
            <Title level={3} style={headerStyle}>
              The Bar
            </Title>
            <Title level={4} style={bodyTextStyle}>
              Designed by noted art director Jonathan Mosca, The Bar provides a warm and inviting atmosphere achieved through industrial minimalism and commissioned works from local artists and designers. It features a rotating menu of natural wines and innovative cocktails. Arley Marks and our bar team guide the cocktail selection, while Harris Gilbertshper, our in-house cider and wine maker, curates the natural wine list.
            </Title>

            <Title level={3} style={headerStyle}>
              The Winery
            </Title>
            <Title level={4} style={bodyTextStyle}>
              This dual-use space is not only where we ferment our own wines and ciders but also where we host all types of events, from birthday celebrations and late-night dance parties to chef pop-ups, screenings, floral markets, and wedding receptions.
              <br />
              <br />
              The beating heart of the space is our custom sound system, which combines the latest in audio science with the artistry of a hand-made object. The system, a collaboration between local artist Peter Brock and Paris-based audio engineer Nicholas Badey, utilizes some of the highest performing speaker components in the world.
              <br />
              <br />
              Our fermentation program produces small batch wines and ciders using locally grown fruits as well as herbs from our own rooftop garden.
              <br />
              <br />
              Opening in summer 2025, the open kitchen will be a place where visiting chefs showcase their unique culinary perspectives.
            </Title>

            <Title level={3} style={headerStyle}>
              The Rooftop Garden
            </Title>
            <Title level={4} style={bodyTextStyle}>
              A medicinal herb garden cultivated by Naneh Israelyan, this lush outdoor space with urban views provides a laidback atmosphere for hang outs, dance parties, and wedding ceremonies.
            </Title>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;