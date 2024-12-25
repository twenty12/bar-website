import React from "react";
import { Row, Col, Typography } from "antd";
import { Performer } from "../types";

interface PerformerCardProps {
    performer: Performer;
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
            {performer.imageUrl ? (
                <Col xs={4}>
                    <img
                        src={performer.imageUrl}
                        alt={performer.name}
                        style={{
                            width: "100%", // Ensure image fits within column
                            height: "auto", // Maintain aspect ratio
                            borderRadius: "2px",
                            border: "1px solid white",
                        }}
                    />
                </Col>
            ) : null}
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