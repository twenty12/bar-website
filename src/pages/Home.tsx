import { Col, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../icons/icon";




const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="full-page-video-wrapper">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/outside_1_poster.jpg"
          preload="auto"
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/outside_1.mov"
          style={{
            height: "100vh",
          }}
        ></video>
        <div
          style={{
            position: "relative",
            color: "white",
            display: "flex",
            justifyContent: "flex-end", // Aligns the text to the right
            marginRight: "75px", // Optional margin for spacing
            marginTop: "200px", // Optional margin for spacing

          }}
        >
          <div
            // className='dark-hover'
            onClick={() => navigate('/calendar')}
            style={{
              // border: "2px solid white",
              borderRadius: "2px",
              paddingRight: "15px",
              cursor: "pointer",
              paddingLeft: "15px",
              textAlign: "center",
            }}>
            {/* <Typography.Title level={1} style={{ fontSize: '50px', color: "white", margin: "15px", borderBottom: "1px solid white" }}></Typography.Title> */}
            {/* <Typography.Title level={1} style={{ fontWeight: 300, color: "white", margin: "15px" }}>93 Scott Ave<br />Brooklyn 11237</Typography.Title> */}
            <Icon />
          </div>
        </div>
      </div>
      <div className="full-page-video-body" style={{
        marginBottom: '60px',
        justifyContent: 'center',
        display: 'flex'
      }}>
        <Row
          style={{ maxWidth: '990px' }}
          gutter={[16, 16]}
        >
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              About
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              Honey’s is a cocktail bar and multi-dimensional event space in Brooklyn, New York. Founded in 2016 by artist Arley Marks, Honey’s is a cherished home to New York’s creators. A network of a musicians, artists, designers, filmmakers, and chefs comes to Honey’s for dynamic programming, thoughtful drinks, and great parties.
              <br />
              <br />
              Located on the border between Bushwick and East Williamsburg, Honey’s features three distinct yet complementary spaces.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              The Bar
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              Designed by noted art director Jonathan Mosca, The Bar provides a warm and inviting atmosphere achieved through industrial minimalism and commissioned works from local artists and designers.It features a rotating menu of natural wines and innovative cocktails. Arley Marks and our bar team guide the cocktail selection, while Harris Gilbertshper, our in-house cider and wine maker, curates the natural wine list.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              The Winery
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              This dual-use space is not only where we ferment our own wines and ciders but also where we host all types of events, from birthday celebrations and late-night dance parties to chef pop-ups, screenings, floral markets, and wedding receptions.
              <br></br>
              <br></br>
              The beating heart of the space is our custom sound system, which combines the latest in audio science with the artistry of a hand-made object.  The system, a collaboration between local artist Peter Brock and Paris-based audio engineer Nicholas Badey, utilizes some of the highest performing speaker components in the world.
              <br></br>
              <br></br>
              Our fermentation program produces small batch wines and ciders using locally grown fruits as well as herbs from our own rooftop garden.
              <br></br>
              <br></br>
              Opening in summer 2025, the open kitchen will be a place where visiting chefs showcase their unique culinary perspectives.
            </Typography.Title>
          </Col>
          <Col xs={24} md={4} style={{ textAlign: 'left' }}>
            <Typography.Title level={3}>
              The Rooftop Garden
            </Typography.Title>
          </Col>
          <Col xs={24} md={20}>
            <Typography.Title level={3} style={{ fontWeight: 300 }}>
              A medicinal herb garden cultivated by Naneh Israelyan, this lush outdoor space with urban views provides a laidback atmosphere for hang outs, dance parties, and wedding ceremonies.
            </Typography.Title>
          </Col>
        </Row>
        <br />
        <br />
        <br />
      </div>
    </>

  );
};

export default Home;