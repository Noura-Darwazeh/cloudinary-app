import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { cld } from '../cloudinary/config';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {images.map((publicId, index) => {
          const img = cld.image(publicId)
            .delivery(format(auto()))
            .delivery(quality(autoQuality()));

          // Ensure Cloudinary knows how to render it properly by giving it a responsive layout
          return (
            <div 
              key={`${publicId}-${index}`} 
              className="gallery-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="image-wrapper">
                <AdvancedImage
                  cldImg={img}
                  plugins={[
                    lazyload({ rootMargin: '50px', threshold: 0.1 }),
                    responsive({ steps: 200 }),
                    placeholder({ mode: 'blur' })
                  ]}
                  className="gallery-image"
                  alt={publicId}
                />
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    <span className="image-icon">✧</span>
                    <span className="image-title">{publicId.split('/').pop()?.replace(/-/g, ' ')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
