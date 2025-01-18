import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { GalleryImage } from "../types";
import { GalleryTypes } from "../enums";

type GalleryContextType = {
  images: GalleryImage[];
  isGalleryModalVisible: boolean;
  showGalleryModal: (galleryType: GalleryTypes) => void;
  hideGalleryModal: () => void;
  fetchGalleryImages: () => Promise<void>;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [allImages, setAllImages] = useState<GalleryImage[]>([]); // To keep original data
  const [isGalleryModalVisible, setGalleryModalVisible] = useState(false);

  const showGalleryModal = (galleryType: GalleryTypes) => {
    const filteredImages = allImages.filter(image => image.galleryType === galleryType);
    setFilteredImages(filteredImages);
    setGalleryModalVisible(true);
  };

  const hideGalleryModal = () => {
    setGalleryModalVisible(false);
    setFilteredImages([]);

  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(`/api/gallery-images`);
      if (!response.ok) {
        throw new Error(`Error fetching gallery images: ${response.statusText}`);
      }
      const data: GalleryImage[] = await response.json();
      setAllImages(data); // Save all images
      setFilteredImages(data); // Initialize current images
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        images: filteredImages,
        isGalleryModalVisible,
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