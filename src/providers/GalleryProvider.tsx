import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { GalleryObject } from "../types";
import { GalleryTypes } from "../enums";

const HARDCODED_IMAGES: GalleryObject[] = Object.values({
  [GalleryTypes.Home]: [
    {
      id: "cocktails-1",
      imageUrl: "https://public-images-47f0123de2752612014ec25dc867190a.s3.us-east-1.amazonaws.com/DSCF7980.jpg",
      title: "Bar Home",
      galleryType: GalleryTypes.Home,
      description: "Our home"
    },
    {
      id: "home-1",
      imageUrl: "https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/videos/dance_floor_3.jpg",
      videoUrl: "https://public-static-e253a58a8402e8730d26261c6f3457ce.s3.us-east-1.amazonaws.com/splash_vid_1.mp4",
      title: "Bar Home",
      galleryType: GalleryTypes.Home,
      description: "Our home"
    },
    {
      id: "home-2",
      imageUrl: "https://public-images-47f0123de2752612014ec25dc867190a.s3.us-east-1.amazonaws.com/DSCF8063.jpg",
      title: "Bar Home",
      galleryType: GalleryTypes.Home,
      description: "Our home"
    },
    {
      id: "home-3",
      imageUrl: "https://public-images-47f0123de2752612014ec25dc867190a.s3.us-east-1.amazonaws.com/DSCF8045.jpg",
      title: "Bar Home",
      galleryType: GalleryTypes.Home,
      description: "Our home"
    },

  ]
}).flat();

type GalleryContextType = {
  images: GalleryObject[];
  isLoading: boolean;
  filteredImages: GalleryObject[];
  error: string | null;
  isGalleryModalVisible: boolean;
  showGalleryModal: (galleryType: GalleryTypes) => void;
  hideGalleryModal: () => void;
  fetchGalleryImages: () => Promise<void>;
};

const defaultContextValue: GalleryContextType = {
  images: [],
  isLoading: false,
  filteredImages: [],
  error: null,
  isGalleryModalVisible: false,
  showGalleryModal: () => {},
  hideGalleryModal: () => {},
  fetchGalleryImages: async () => {},
};

const GalleryContext = createContext<GalleryContextType>(defaultContextValue);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filteredImages, setFilteredImages] = useState<GalleryObject[]>(HARDCODED_IMAGES);
  const [allImages, setAllImages] = useState<GalleryObject[]>(HARDCODED_IMAGES);
  const [isGalleryModalVisible, setGalleryModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showGalleryModal = (galleryType: GalleryTypes) => {
    const filteredImages = allImages.filter(image => image.galleryType === galleryType);
    setFilteredImages(filteredImages);
    setGalleryModalVisible(true);
  };

  const hideGalleryModal = () => {
    setGalleryModalVisible(false);
    setFilteredImages(HARDCODED_IMAGES);
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/gallery-images');
      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }
      const fetchedImages: GalleryObject[] = await response.json();
      setAllImages([...HARDCODED_IMAGES, ...fetchedImages]);
      setFilteredImages([...HARDCODED_IMAGES, ...fetchedImages]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    images: allImages,
    isLoading,
    filteredImages,
    error,
    isGalleryModalVisible,
    showGalleryModal,
    hideGalleryModal,
    fetchGalleryImages,
  };

  return (
    <GalleryContext.Provider value={value}>
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