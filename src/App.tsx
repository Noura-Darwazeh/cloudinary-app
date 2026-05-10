import { useState } from 'react';
import { uploadPreset } from './cloudinary/config';
import { UploadWidget } from './cloudinary/UploadWidget';
import type { CloudinaryUploadResult } from './cloudinary/UploadWidget';
import { ImageGallery } from './components/ImageGallery';
import './App.css';

const hasUploadPreset = Boolean(uploadPreset);

// A beautiful selection of sample Cloudinary images to showcase the gallery
const SAMPLE_IMAGES = [
  'samples/landscapes/nature-mountains',
  'samples/ecommerce/accessories-bag',
  'samples/animals/reindeer',
  'samples/food/pot-mussels',
  'samples/people/bicycle',
  'samples/ecommerce/shoes',
];

function App() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleUploadSuccess = (result: CloudinaryUploadResult) => {
    console.log('Upload successful:', result);
    // Prepend the new uploaded image to the gallery
    setUploadedImages((prev) => [result.public_id, ...prev]);
  };

  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error);
    alert(`Upload failed: ${error.message}`);
  };

  // Combine uploaded images with samples for the gallery
  const galleryImages = [...uploadedImages, ...SAMPLE_IMAGES];

  return (
    <div className="app">
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      
      <main className="main-content">
        <header className="app-header">
          <h1>Responsive Image Gallery</h1>
          <p>Powered by Cloudinary & React</p>
        </header>
        
        {hasUploadPreset && (
          <div className="upload-section glass-panel">
            <div className="upload-content">
              <h2>Add Your Own Image</h2>
              <p>Upload an image to see it magically appear in the gallery with lazy loading and automatic responsive formatting.</p>
              <UploadWidget
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                buttonText="Upload Image"
              />
            </div>
          </div>
        )}

        <div className="gallery-section glass-panel">
          <div className="section-header">
            <h2>Stunning Visuals</h2>
            <div className="badge">Optimized</div>
          </div>
          <ImageGallery images={galleryImages} />
        </div>
      </main>
    </div>
  );
}

export default App;
