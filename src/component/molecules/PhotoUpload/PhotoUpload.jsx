"use client";
import React, { useState } from "react";
import { MdOutlinePhotoCamera, MdOutlineDelete } from "react-icons/md";
import useAxios from "@/interceptor/axiosInterceptor";
import classes from "./PhotoUpload.module.css";

const PhotoUpload = ({ onPhotosUploaded, maxPhotos = 3 }) => {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { Post } = useAxios();

  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = maxPhotos - photos.length;
    
    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more photo(s)`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const { response } = await Post({
          route: 'media/upload',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response) {
          return {
            id: Date.now() + Math.random(),
            url: response.data.url || response.data.path,
            originalName: file.name,
          };
        }
        return null;
      });

      const uploadedPhotos = await Promise.all(uploadPromises);
      const validPhotos = uploadedPhotos.filter(photo => photo !== null);

      setPhotos(prev => [...prev, ...validPhotos]);
      
      // Notify parent component about uploaded photos
      if (onPhotosUploaded) {
        onPhotosUploaded([...photos, ...validPhotos]);
      }

    } catch (error) {
      console.error('Photo upload error:', error);
      alert('Failed to upload photos. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = photos.filter(photo => photo.id !== photoId);
    setPhotos(updatedPhotos);
    
    // Notify parent component about updated photos
    if (onPhotosUploaded) {
      onPhotosUploaded(updatedPhotos);
    }
  };

  return (
    <div className={classes.container}>
      <h4 className={classes.title}>Delivery Proof Photos</h4>
      <p className={classes.description}>
        Upload photos to prove the order was delivered (optional, max {maxPhotos} photos)
      </p>
      
      <div className={classes.uploadSection}>
        {photos.length < maxPhotos && (
          <div className={classes.uploadButton}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              id="photo-upload"
              className={classes.fileInput}
              disabled={uploading}
            />
            <label htmlFor="photo-upload" className={classes.uploadLabel}>
              <MdOutlinePhotoCamera size={24} />
              <span>{uploading ? "Uploading..." : "Add Photos"}</span>
            </label>
          </div>
        )}
        
        <div className={classes.photoGrid}>
          {photos.map((photo) => (
            <div key={photo.id} className={classes.photoItem}>
              <img 
                src={photo.url} 
                alt="Delivery proof" 
                className={classes.photoPreview}
                onClick={() => window.open(photo.url, '_blank')}
              />
              <button
                onClick={() => removePhoto(photo.id)}
                className={classes.removePhoto}
                disabled={uploading}
              >
                <MdOutlineDelete size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload; 