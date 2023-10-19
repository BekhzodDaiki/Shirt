import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import Draggable from 'react-draggable';
import ReactCrop from 'react-image-crop';
import tshirt from './assets/pngegg.png';
import 'react-image-crop/dist/ReactCrop.css';
import Dropzone from 'react-dropzone';

function CustomShirtDesigningPage() {
  // Set the initial shirt color to white
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  // Set the initial image crop state
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    unit: '%',
    width: 50,
    height: 50,
  });
  // Set the initial image state
  const [image, setImage] = useState(null);

  // Handle color change
  const handleColorChange = (color) => {
    setShirtColor(color.hex);
  };

  // Handle image upload
  const handleImageUpload = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  // Handle image crop
  const handleImageCrop = (crop) => {
    setCrop(crop);
  };

  // Handle image crop complete
  const handleImageCropComplete = (crop, pixelCrop) => {
    const canvas = document.createElement('canvas');
    const imageElement = document.createElement('img');
    imageElement.src = image;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      imageElement,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      crop.width,
      crop.height
    );
    const croppedImageUrl = canvas.toDataURL();
    setImage(croppedImageUrl);
  };

  // Handle image replacement
  const handleImageReplacement = () => {
    setImage(null);
  };

  return (
    <>
      {/* Add the color picker */}
      <ChromePicker color={shirtColor} onChange={handleColorChange} />

      {/* Add the image upload dropzone */}
      <Dropzone onDrop={handleImageUpload}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop an image here, or click to select an image.</p>
            </div>
          </section>
        )}
      </Dropzone>

      {/* Add the image crop */}
      {image && (
        <>
          <ReactCrop
            src={image}
            crop={crop}
            onChange={handleImageCrop}
            onComplete={handleImageCropComplete}
          />

          {/* Add the image replacement button */}
          <button onClick={handleImageReplacement}>Replace Image</button>
        </>
      )}

      {/* Add the draggable t-shirt image */}
      <Draggable>
        <img src={tshirt} style={{ backgroundColor: shirtColor }} />
      </Draggable>
    </>
  );
}

export default CustomShirtDesigningPage;
