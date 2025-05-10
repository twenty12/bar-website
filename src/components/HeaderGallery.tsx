import React, { useEffect, useState, useRef } from 'react';
import { Carousel, Grid } from 'antd';
import { GalleryTypes } from '../enums';
import { useGallery } from '../providers/GalleryProvider';
import { GalleryImage } from '../types';

interface HeaderGalleryProps {
  galleryType: GalleryTypes;
}

const HeaderGallery: React.FC<HeaderGalleryProps> = ({ galleryType }) => {
  const { images } = useGallery();
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const carouselRef = useRef<any>(null);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  useEffect(() => {
    const filtered = images.filter(img => img.galleryType === galleryType);
    setGalleryImages(filtered);
  }, [images, galleryType]);

  if (!galleryImages.length) return null;

  const desktopStyles = {
    position: 'relative' as const,
    top: '-64px',
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '2px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...(screens.md ? desktopStyles : {}),
      }}
    >
      <Carousel
        ref={carouselRef}
        effect="fade"
        arrows
        style={{ width: '100%', height: '100%' }}
      >
        {galleryImages.map(image => (
          <div key={image.id} style={{ width: '100%', height: '100%' }}>
            <img
              className="right-arrow-hover"
              src={image.imageUrl}
              alt={image.title}
              style={{
                width: '100%',
                height: '100vh',
                objectFit: 'cover',
                display: 'block',
              }}
              onClick={() => carouselRef.current?.next()}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeaderGallery;