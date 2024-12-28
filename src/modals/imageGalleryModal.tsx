import React from "react";
import { Modal, Carousel, Typography } from "antd"; // Ant Design components
import { useGallery } from "../providers/GalleryProvider";

const GalleryModal: React.FC = () => {
    const {
        images: filterdImages,
        isGalleryModalVisible,
        hideGalleryModal,
    } = useGallery();

    // Find the index of the selected image for starting the carousel at the correct slide

    return (
        <div
        className="gallery-modal"
        >
            <Modal
                open={isGalleryModalVisible}
                onCancel={hideGalleryModal}
                // bodyProps={{ style: { backgroundColor: 'black' } }}
                footer={null}
                width={800} // Adjust the width for better visibility
                centered // Aligns the modal itself in the center of the screen
            >
                <Carousel
                    initialSlide={0}
                    dots={true}
                    dotPosition={'top'}
                    arrows
                    style={{ maxHeight: "calc(80vh - 60px)", overflow: "hidden" }} // Adjust to account for modal title height
                >
                    {filterdImages.map((image) => (
                        <div
                            key={image.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "calc(80vh - 120px)",
                                    maxWidth: "100%",
                                }}
                            >
                                <img
                                    src={image.imageUrl}
                                    alt={image.title}
                                    style={{
                                        maxHeight: "100%",
                                        maxWidth: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                    textAlign: "center",
                                }}
                            >
                                <Typography.Text style={{ textAlign: "center" }}>
                                    {image.description}
                                </Typography.Text>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </Modal>
        </div>
    );
};

export default GalleryModal;