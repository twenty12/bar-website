import React, { useEffect, useState, useRef } from 'react';
import { Carousel, Grid } from 'antd';
import { GalleryTypes } from '../enums';
import { useGallery } from '../providers/GalleryProvider';
import { GalleryObject } from '../types';

interface HeaderGalleryProps {
  galleryType: GalleryTypes;
}

const HeaderGallery: React.FC<HeaderGalleryProps> = ({ galleryType }) => {
  const { images } = useGallery();
  const [galleryImages, setGalleryImages] = useState<GalleryObject[]>([]);
  const carouselRef = useRef<any>(null);
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  useEffect(() => {
    const filtered = images.filter(image => image.galleryType === galleryType);
    setGalleryImages(filtered);
  }, [images, galleryType]);

  if (!galleryImages.length) return null;

  const desktopStyles = {
    position: 'relative' as const,
    top: '-65px',
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '2px',
    border: '2px solid rgba(255, 255, 255, 0.1)',
  };

  const mediaStyle = {
    width: '100%',
    height: '100vh',
    objectFit: 'cover' as const,
    display: 'block',
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
        style={{ width: '100%', height: '100%', borderRight: '2px solid rgba(0,0, 0, 0.1)', borderBottom: '1px solid black' }}
      >
        {galleryImages.map(image => (
          <div key={image.id} style={{ width: '100%', height: '100%' }}>
            {image.videoUrl ? (
              <video
                className="right-arrow-hover"
                src={image.videoUrl}
                poster={image.imageUrl}
                style={mediaStyle}
                onClick={() => carouselRef.current?.next()}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                className="right-arrow-hover"
                src={image.imageUrl}
                alt={image.title}
                style={mediaStyle}
                onClick={() => carouselRef.current?.next()}
              />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeaderGallery;