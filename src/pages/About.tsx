import { Col, Row, Typography } from "antd";
import React from "react";
import { useWebsiteCopy } from "../providers/websiteCopyProvider";

const About: React.FC = () => {
  const { websiteCopies } = useWebsiteCopy();

  const content = websiteCopies.filter((copy) => copy.page === 'About');
  const order = ['Arley', 'Adam', 'Daniel','Sarah', 'Story'];
  const orderedCopy = content.sort((a, b) => order.indexOf(a.section) - order.indexOf(b.section))
  return (
    <>
      <div style={{ height: '80vh', width: '100%', overflow: 'hidden' }}>
        <img
          src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/images/arley_and_his_mom_cropped.png"
          style={{
            position: 'absolute',
            left: '0',
            top: '0',
            height: '80vh',
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
    filter: 'contrast(1) brightness(1) grayscale(1) sepia(0.5) saturate(1.5)',
    mixBlendMode: 'multiply',
            borderBottom: '2px solid black'
          }}
        />
      </div>
      <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;


      <Row gutter={[16, 16]}
        style={{
            marginLeft: '15px',
            marginRight: '15px',
            maxWidth: '990px'}}>
        {orderedCopy.map((copy) => (
          <React.Fragment key={copy.section}>
            <Col xs={24} md={4} style={{ textAlign: 'left' }}>
              <Typography.Title level={3}>
                {copy.section}
              </Typography.Title>
            </Col>
            <Col xs={24} md={20}>
              <Typography.Title level={3} style={{ fontWeight: 300 }}>
                <img src={copy.image} style={{ float: 'left', width: '150px', margin: '15px', marginTop: '0' , marginLeft: 0, border: '2px solid white', borderRadius: '2px'}} />
                {copy.content}
              </Typography.Title>
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </>
  );
};

export default About;