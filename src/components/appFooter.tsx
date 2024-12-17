import React from "react";
import { Layout, Row, Col, Typography, Divider } from "antd";
import logo_black from "../assets/images/logo_black.png";
import { RotatedArrow } from "./rotatedArrow";

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter: React.FC = () => {
    return (
        <Footer
            style={{
                borderTop: '2px solid black',
                backgroundColor: "white",
                textAlign: "center",

            }}
        >
            {/* Top Row */}
            <Row style={{ marginBottom: "20px" }}>
                <Col xs={24} md={12} style={{ textAlign: "left" }}>
                    <Title level={3} style={{ marginBottom: '5px' }}>Find</Title>
                    <Title level={4} style={{ fontWeight: 300, marginTop: 0 }}> <a href="https://g.co/kgs/BXQxZfZ" target="_blank" rel="noopener noreferrer">93 Scott Ave.
                        <br />
                        Brooklyn, NY 11237 <RotatedArrow />
                    </a>
                        <Divider style={{ width: '160px', minWidth: '160px'}} />
                        Tuesday - Sundday <br />
                        5pm - late
                    </Title>
                </Col>
                <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                    <Title level={3} style={{ marginBottom: '5px' }}>Follow</Title>
                    <Title level={4} style={{ fontWeight: 300, marginTop: 0 }}>
                        <a
                            href="https://instagram.com/honeysbrooklyn"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none", color: "inherit" }} // Optional: style link
                        >
                            Instagram <RotatedArrow />
                        </a>
                        <br />
                        {/* <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                            Spotify <RotatedArrow />
                        </a> */}
                    </Title>
                </Col>
                <Col md={10}></Col>
                <Col xs={24} md={24} style={{ textAlign: "left" }}>
                    <Title level={3} style={{ marginBottom: '5px' }}>Talk</Title>
                    <Title level={4} style={{ fontWeight: 300, marginTop: 0 }}>
                        <a href="mailto:manager@honeysbrooklyn.com" target="_blank" rel="noopener noreferrer">
                            manager@honeysbrooklyn.com
                        </a>
                    </Title>
                </Col>
            </Row>

            {/* Bottom Row */}
            <Row style={{}}>
                <Col
                    span={24}
                    style={{
                        display: "flex",
                        alignItems: "bottom", // Vertically centers the text relative to the logo
                        textAlign: "left", // Aligns text to the left
                    }}
                >
                    <span
                        style={{
                            borderTop: "1px solid gray",
                            display: "flex",
                            alignItems: "center", // Vertically centers the logo and text
                            textAlign: "left", // Aligns text to the left
                            paddingTop: "15px",
                        }}
                    >
                        <img
                            src={logo_black}
                            alt="Logo"
                            style={{
                                width: "100px",
                            }}
                        />
                        <Text style={{ marginLeft: "15px" }}>
                            &copy; 2015 - {new Date().getFullYear()} Honeys
                        </Text>
                    </span>
                </Col>
            </Row>
        </Footer>
    );
};

export default AppFooter;