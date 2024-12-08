import React from "react";
import { Row, Col, Image, Grid } from "antd";
// import { useCopyTextContext } from "../context/CopyTextContext";
// import { markdownToHtml } from "../utils/stringUtils";

const { useBreakpoint } = Grid;

const About: React.FC = () => {
  const screens = useBreakpoint();
  const isBelowMd = !screens.md;
//   const { loading, copyTextsObj } = useCopyTextContext();

  return (
    <Row gutter={[16, 16]} style={{ maxWidth: 860, margin: "60px auto" }}>
      <Col xs={4} md={2} />
      {isBelowMd ? null : (
        <Col xs={4} md={10}>
          <Image
            src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.amazonaws.com/daniel.jpg"
            alt="About Image"
            preview={false}
            style={{
              width: "100%",
              height: "auto",
              alignSelf: "flex-start",
              filter: "grayscale(100%) contrast(140%) brightness(80%)",
            }}
          />
        </Col>
      )}
      <Col xs={24} md={10}>
        {isBelowMd ? (
          <Image
            src="https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.amazonaws.com/daniel.jpg"
            alt="About Image"
            preview={false}
            style={{
              width: "25%", // Slightly larger for clarity
              height: "auto",
              display: "inline-block", // Align image and text
              marginRight: "15px", // Add space between image and text
              marginBottom: "15px", // Add some space below the image for wrapping
              filter: "grayscale(100%) contrast(140%) brightness(80%)",
            }}
          />
        ) : null}
        {/* {loading ? null : (
          <>
            <Typography.Title style={{marginTop:0}} level={4}>About</Typography.Title>
            {markdownToHtml(copyTextsObj["about"])}
            <Typography.Title level={4}>Story</Typography.Title>
            {markdownToHtml(copyTextsObj["story"])}
            </>
        )} */}
      </Col>
    </Row>
  );
};

export default About;
