import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import { GalleryTypes } from '../enums';
import { useGallery } from '../providers/GalleryProvider';
import { GalleryImage } from '../types';

interface HeaderGalleryProps {
  galleryType: GalleryTypes;
}

const HeaderGallery: React.FC<HeaderGalleryProps> = ({ galleryType }) => {
  const { images, fetchGalleryImages } = useGallery();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetchGalleryImages();
  }, [fetchGalleryImages]);

  useEffect(() => {
    const filteredImages = images.filter(image => image.galleryType === galleryType);
    setGalleryImages(filteredImages);
  }, [images, galleryType]);

  if (galleryImages.length === 0) {
    return null;
  }
console.log(galleryImages)
  return (
    <div className="full-page-gallery-wrapper">
      <Carousel autoplay effect="fade" style={{ height: '100vh' }}>
        {galleryImages.map((image) => (
          <div key={image.id}>
            <div
              style={{
                height: '100vh',
                backgroundImage: `url(${image.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'grayscale(50%) contrast(110%) brightness(90%)',
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeaderGallery; 