import React from 'react';

interface ImagePreviewProps {
  src: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => {
  return (
    <div className="flex justify-center">
      <img src={src} alt="Uploaded" className="max-w-xs max-h-64 object-contain rounded-lg shadow-md" />
    </div>
  );
};

export default ImagePreview;