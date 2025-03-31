import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Row, Col, Typography } from "antd";
import { Performer } from "../types";
import { generateGradient } from "../utils/styleUtils";

interface PerformerCardProps {
    performer: Performer;
}
export const performerPlaceholder = (performer: Performer) => {
   return <div
    style={{
        width: "100%",
        height: "100%",
        aspectRatio: "1 / 1", // Ensures the div remains square
        borderRadius: "2px",
        background: generateGradient(performer.name || performer.instagram),
        border: "1px solid white",
        display: "flex",
        justifyContent: "center", // Center icon horizontally
        alignItems: "center",    // Center icon vertically
    }}
>
    <UserOutlined
        style={{
            fontSize: "42px", // Adjust icon size for the larger square
            color: "white",   // Icon color for contrast
        }}
    />
</div>
}
const PerformerCard: React.FC<PerformerCardProps> = ({ performer }) => {
    return (
        <Row
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background
                cursor: performer.instagram ? "pointer" : "default", // Show pointer if Instagram is available
                margin: "5px 0", // Spacing between performers
                color: "white", // Light text for contrast
                border: "1px solid white",
                borderRadius: "4px", // Slightly more rounded corners
                padding: "10px",
                width: "100%", // Full width
            }}
            onClick={() => {
                if (performer.instagram) {
                    window.open(`https://www.instagram.com/${performer.instagram}`, "_blank");
                }
            }
            }
            align={"top"}
            gutter={[16, 0]} // Add spacing between columns
        >
            <Col xs={4}>
                {performer.imageUrl ? (
                    <img
                        src={performer.imageUrl}
                        alt={performer.name}
                        style={{
                            width: "100%",        // Fills the width of its container
                            height: "100%",       // Fills the height to make it a square
                            aspectRatio: "1 / 1", // Ensures it's always a square
                            objectFit: "cover",   // Ensures the image fills the square without distortion
                            borderRadius: "2px",
                            border: "1px solid white",
                        }}
                    />
                ) : performerPlaceholder(performer) }
            </Col>
            <Col xs={20}>
                <Typography.Title
                    level={4}
                    style={{
                        fontWeight: 300,
                        margin: 0,
                    }}
                >
                    {performer.name}{" "}
                </Typography.Title>
                <Typography.Title
                    level={5}
                    style={{
                        fontWeight: 600,
                        margin: 0,
                    }}
                >
                    {performer.instagram ? (
                        <>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://www.instagram.com/${performer.instagram}`}
                                style={{ color: "white" }}
                            >
                                @{performer.instagram}
                            </a>
                        </>
                    ) : null}
                </Typography.Title>
            </Col>
        </Row>
    );
};

export default PerformerCard;