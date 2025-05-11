import { Col, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const SpecsSection: React.FC = () => {
  return (
    <Col span={24}>
      <Typography.Title level={3}>
        Specs
      </Typography.Title>
      <Title level={4} style={{ fontWeight: 300, marginBottom: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <Typography.Title level={4} style={{ fontWeight: 600, marginBottom: '10px' }}>
            Full Buyout (Space Fee Only)
          </Typography.Title>
          <div style={{ fontStyle: 'italic', marginBottom: '10px' }}>
            "You get the keys to the castle — bar, winery, and rooftop."
          </div>
          <div>
            Our full buyout option provides exclusive access to the entire venue, including the bar, winery, and rooftop deck. This package includes a dedicated day-of coordinator to ensure every detail is seamless.
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Typography.Title level={4} style={{ fontWeight: 600, marginBottom: '10px' }}>
            Winery Rental (3-Hour Minimum)
          </Typography.Title>
          <div style={{ fontStyle: 'italic', marginBottom: '10px' }}>
            "The winery is yours for the night, with the option to add the rooftop deck."
          </div>
          <div>
            Our winery space is ideal for gatherings that want a bit more intimacy without compromising on character. Add the rooftop deck for an open-air experience.
          </div>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>Daytime and evening rental options</li>
            <li>Flexible hour extensions</li>
            <li>AV access included</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Typography.Title level={4} style={{ fontWeight: 600, marginBottom: '10px' }}>
            Every Rental Includes:
          </Typography.Title>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Day-of Coordinator (for full buyout only)</li>
            <li>Onsite Furniture (tables, chairs, etc.)</li>
            <li>Folding chairs: 40</li>
            <li>German beer tables and benches (seats 8 per): 6 sets</li>
            <li>All bar seating and banquet: seats 40</li>
            <li>Onsite Glassware</li>
            <li>Access to AV (audio-visual equipment)</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Typography.Title level={4} style={{ fontWeight: 600, marginBottom: '10px' }}>
            Optional Add-Ons:
          </Typography.Title>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Rooftop Access (if not already included)</li>
            <li>Drink Packages (customizable from existing menu options)</li>
            <li>Catering Packages</li>
            <li>DJ Booking</li>
            <li>Florist Services</li>
            <li>Service staff (servers, greeters, etc.)</li>
            <li>Additional rental packages</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Typography.Title level={4} style={{ fontWeight: 600, marginBottom: '10px' }}>
            The Spaces
          </Typography.Title>
          
          <div style={{ marginBottom: '20px' }}>
            <Typography.Title level={5} style={{ fontWeight: 600, marginBottom: '5px' }}>
              Bar
            </Typography.Title>
            <div>Seated Capacity: 30</div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Typography.Title level={5} style={{ fontWeight: 600, marginBottom: '5px' }}>
              Winery
            </Typography.Title>
            <div>Seated Capacity: 70</div>
            <div style={{ marginTop: '5px' }}>Available Equipment:</div>
            <ul style={{ paddingLeft: '20px' }}>
              <li>In-house speaker system</li>
              <li>Microphones</li>
              <li>DJ equipment</li>
              <li>Video projector</li>
            </ul>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Typography.Title level={5} style={{ fontWeight: 600, marginBottom: '5px' }}>
              Roof
            </Typography.Title>
            <div>Seated Capacity: 50</div>
            <div style={{ marginTop: '5px' }}>Available Equipment:</div>
            <ul style={{ paddingLeft: '20px' }}>
              <li>In-house speaker</li>
              <li>Microphone</li>
              <li>DJ system</li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <Typography.Title level={4} style={{ fontWeight: 600, marginBottom: '10px' }}>
            Food Options
          </Typography.Title>
          <div>
            Honey's has a full kitchen and a wide network of skilled culinary creators ready to cater your next event. Offerings can vary depending on dietary restrictions and level of service, from passed snacks to buffet-style family meals and multi-course fine dining.
          </div>
          <div style={{ marginTop: '10px' }}>
            We work with local farms and purveyors whenever possible. Let us know what you have in mind, and we can connect you with a caterer to suit your needs.
          </div>
        </div>
      </Title>
    </Col>
  );
};

export default SpecsSection; 