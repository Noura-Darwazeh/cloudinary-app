import { cld } from '../cloudinary/config';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { generativeRecolor } from '@cloudinary/url-gen/actions/effect';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {images.map((publicId, index) => {
          // Generate the exact URL with f_auto,q_auto
          let imageBuilder = cld.image(publicId);

          // Apply the AI recolor ONLY to images likely to have shirts to avoid breaking the others
          if (publicId.includes('people') || publicId.includes('shirt')) {
            imageBuilder = imageBuilder.effect(generativeRecolor('shirt', 'ffdfed'));
          }

          const imgUrl = imageBuilder
            .delivery(format(auto()))
            .delivery(quality(autoQuality()))
            .toURL();

          return (
            <div 
              key={`${publicId}-${index}`} 
              className="gallery-item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="image-wrapper">
                <img
                  src={imgUrl}
                  loading="lazy"
                  className="gallery-image"
                  alt={publicId.split('/').pop()?.replace(/-/g, ' ') || 'Gallery image'}
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
