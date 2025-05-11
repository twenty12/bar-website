import { Col, Typography } from "antd";
import React from "react";
import theme from "../../theme.json";

const { Title } = Typography;

interface AboutSectionProps {
  showModal: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ showModal }) => {
  const formTextStyle = {
    fontWeight: 600,
    color: theme.token.colorHighlight,
    textDecoration: 'underline',
    cursor: 'pointer'
  };

  const instagramTextStyle = {
    cursor: 'pointer'
  };

  return (
    <Col span={24}>
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
  );
};

export default AboutSection; 