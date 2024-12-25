import React from "react";
import { Button, ConfigProvider, Dropdown, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface ShareButtonProps {
    title: string;
    url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url }) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title,
                    text: `Check out this event: ${title}`,
                    url,
                })
                .catch((err) => console.error("Error sharing:", err));
        } else {
            message.warning("Sharing is not supported on this device.");
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard
            .writeText(url)
            .then(() => message.success("Link copied to clipboard!"))
            .catch((err) => console.error("Failed to copy link:", err));
    };

    const menuItems = [
        {
            key: "share",
            label: "Share",
            onClick: handleShare,
        },
        {
            key: "copy",
            label: "Copy Link",
            onClick: handleCopyLink,
        },
    ];
    const theme = {
        token: {
            colorText: "black",
        },
    };
    return (
        <ConfigProvider theme={theme}>

            <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}
            >
                <Button
                    icon={<UploadOutlined />}
                >
                    Share
                </Button>
            </Dropdown>
        </ConfigProvider>
    );
};

export default ShareButton;