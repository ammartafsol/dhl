"use client";
import React, { useState, useRef, useEffect } from "react";
import { MdOutlinePhotoCamera, MdOutlineDelete } from "react-icons/md";
import useAxios from "@/interceptor/axiosInterceptor";
import { config } from "@/config";
import classes from "./MultiFileUpload.module.css";

const MultiFileUpload = ({ onFilesUploaded, maxFiles = 3, accept = "image/*", title = "Upload Files", description = "Upload files (optional)" }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState(null);
  const fileInputRef = useRef(null);
  const { Post, Patch } = useAxios();

  // Reset file input when component unmounts or files change
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Reset file input when files array is empty (component reset)
  useEffect(() => {
    if (files.length === 0) {
      resetFileInput();
    }
  }, [files.length]);

  const handleFileUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    const remainingSlots = maxFiles - files.length;
    
    if (selectedFiles.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more file(s)`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('photos', file);

        const { response } = await Post({
          route: 'media/upload',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response && response.data && response.data.photos && response.data.photos.length > 0) {
          const photoData = response.data.photos[0]; // Get the first photo from the array
          const fullUrl = `${config.s3BucketURL}/${photoData.key}`;
          
          return {
            id: Date.now() + Math.random(),
            url: fullUrl,
            key: photoData.key,
            originalName: file.name,
            fileType: file.type,
          };
        }
        return null;
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      const validFiles = uploadedFiles.filter(file => file !== null);

      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      
      // Reset the file input to allow re-uploading the same file
      resetFileInput();
      
      // Notify parent component about uploaded files
      if (onFilesUploaded) {
        onFilesUploaded(updatedFiles);
      }

    } catch (error) {
      console.error('File upload error:', error);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = async (fileId) => {
    const fileToDelete = files.find(file => file.id === fileId);
    if (!fileToDelete) return;

    setDeletingFileId(fileId);

    try {
      const { response } = await Patch({
        route: 'media/delete',
        data: { key: fileToDelete.key },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        const updatedFiles = files.filter(file => file.id !== fileId);
        setFiles(updatedFiles);
        
        // Reset the file input to allow re-uploading the same file
        resetFileInput();
        
        // Notify parent component about updated files
        if (onFilesUploaded) {
          onFilesUploaded(updatedFiles);
        }
      }
    } catch (error) {
      console.error('File delete error:', error);
      alert('Failed to delete file. Please try again.');
    } finally {
      setDeletingFileId(null);
    }
  };

  const isImage = (fileType) => {
    return fileType && fileType.startsWith('image/');
  };

  return (
    <div className={classes.container}>
      <h4 className={classes.title}>{title}</h4>
      <p className={classes.description}>
        {description} (max {maxFiles} files)
      </p>
      
      <div className={classes.uploadSection}>
        {files.length < maxFiles && (
          <div className={classes.uploadButton}>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple
              onChange={handleFileUpload}
              id="file-upload"
              className={classes.fileInput}
              disabled={uploading}
            />
            <label 
              htmlFor="file-upload" 
              className={classes.uploadLabel}
              data-uploading={uploading}
            >
              <MdOutlinePhotoCamera size={24} />
              <span>{uploading ? "Uploading..." : "Add Files"}</span>
            </label>
          </div>
        )}
        
        <div className={classes.fileGrid}>
          {files.map((file) => (
            <div key={file.id} className={classes.fileItem}>
              {isImage(file.fileType) ? (
                <img 
                  src={file.url} 
                  alt={file.originalName} 
                  className={classes.filePreview}
                  onClick={() => window.open(file.url, '_blank')}
                />
              ) : (
                <div className={classes.filePreview}>
                  <span className={classes.fileName}>{file.originalName}</span>
                </div>
              )}
              <button
                onClick={() => removeFile(file.id)}
                className={classes.removeFile}
                disabled={uploading || deletingFileId === file.id}
              >
                {deletingFileId === file.id ? (
                  <div className={classes.deleteLoader}></div>
                ) : (
                  <MdOutlineDelete size={16} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiFileUpload; 