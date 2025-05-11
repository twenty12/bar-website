import { Col, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const WeddingsSection: React.FC = () => {
  return (
    <Col span={24}>
      <Typography.Title level={3}>
        Weddings
      </Typography.Title>
      <Title level={4} style={{ fontWeight: 300, marginBottom: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <span style={{ fontStyle: 'italic' }}>
            "Each wedding at Honey's feels completely unique—even in the same space. It's like the venue adapts to you, not the other way around."
          </span>
          <br />
          <span style={{ fontSize: '16px' }}>— Wedding Guest & Groom</span>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <span style={{ fontStyle: 'italic' }}>
            "It felt more like a block party in a European piazza than a traditional wedding. People spilled into the street under string lights—it was magic."
          </span>
          <br />
          <span style={{ fontSize: '16px' }}>— Groom</span>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <span style={{ fontStyle: 'italic' }}>
            "Honey's made everything feel personal. We worked with friends, local chefs, and artists. It wasn't the wedding industrial complex—it was ours."
          </span>
          <br />
          <span style={{ fontSize: '16px' }}>— Groom</span>
        </div>
      </Title>
    </Col>
  );
};

export default WeddingsSection; 