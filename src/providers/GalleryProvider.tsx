import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { GalleryImage } from "../types";


type GalleryContextType = {
  images: GalleryImage[];
  isGalleryModalVisible: boolean;
  selectedImage?: GalleryImage;
  setSelectedImage: (image?: GalleryImage) => void;
  showGalleryModal: () => void;
  hideGalleryModal: () => void;
  fetchGalleryImages: () => Promise<void>;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isGalleryModalVisible, setGalleryModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | undefined>();
  const showGalleryModal = () => setGalleryModalVisible(true);
  const hideGalleryModal = () => {
    setGalleryModalVisible(false);
    setSelectedImage(undefined);
  };
  useEffect(() => {
    fetchGalleryImages();
  }, []);
  const fetchGalleryImages = async () => {
    console.log('fetching gallery images')
    try {
      const response = await fetch(`/api/gallery-images`);
      if (!response.ok) {
        throw new Error(`Error fetching gallery images: ${response.statusText}`);
      }
      const data: GalleryImage[] = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        images,
        isGalleryModalVisible,
        selectedImage,
        setSelectedImage,
        showGalleryModal,
        hideGalleryModal,
        fetchGalleryImages,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
    const context = useContext(GalleryContext);
    if (!context) {
      throw new Error("useGallery must be used within a GalleryProvider");
    }
    return context;
  };