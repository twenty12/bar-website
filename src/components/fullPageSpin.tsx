import React from "react";
import { Spin } from "antd";
import { ArrowsAltOutlined } from "@ant-design/icons";

const FullPageSpin: React.FC = ({}) => {
  return (
    <Spin
      size="large"
      indicator={<ArrowsAltOutlined spin />}
      style={{
        display: "flex",
        alignItems: "center",
        height: "80vh",
        justifyContent: "center",
      }}
    />
  );
};
export default FullPageSpin;
