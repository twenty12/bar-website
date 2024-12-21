import React from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

export const RotatedArrow: React.FC = () => (
  <ArrowUpOutlined
    style={{
      transform: "rotate(45deg)", // Rotates the arrow
      fontSize: "18px", // Adjust size to match text
      marginTop: '4px',
      marginLeft: "5px", // Adds spacing between text and arrow
      verticalAlign: "top", // Aligns arrow with text baseline
      fontWeight: '800'
    }}
  />
);