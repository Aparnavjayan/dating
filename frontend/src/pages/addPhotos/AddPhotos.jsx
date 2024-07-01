import React, { useState } from 'react';
import axios from 'axios';
import styles from './addphotos.module.css';
import { useNavigate } from 'react-router-dom';

function AddPhotos() {
  const [photos, setPhotos] = useState(Array(6).fill(null));
  const [video, setVideo] = useState(null);
  const navigate = useNavigate();

  const handlePhotoChange = (index, event) => {
    const newPhotos = [...photos];
    newPhotos[index] = event.target.files[0];
    setPhotos(newPhotos);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const submitprevious = () => {
    navigate("/moreabout");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const uploadFile = async (url, file, fieldName) => {
      const formData = new FormData();
      formData.append(fieldName, file);

      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        return response.status === 200;
      } catch (error) {
        console.log(`Error uploading ${fieldName}:`, error);
        return false;
      }
    };

    let allUploadsSuccessful = true;

    for (let i = 0; i < photos.length; i++) {
      if (photos[i]) {
        const success = await uploadFile('http://localhost:3000/upload/photo', photos[i], `photo${i + 1}`);
        if (!success) {
          allUploadsSuccessful = false;
        }
      }
    }

    if (video) {
      const success = await uploadFile('http://localhost:3000/upload/video', video, 'video');
      if (!success) {
        allUploadsSuccessful = false;
      }
    }

    if (allUploadsSuccessful) {
      console.log('Files uploaded successfully');
      navigate("/employment");
    } else {
      console.log('Failed to upload files');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.imageCards}>
          {photos.map((photo, index) => (
            <div key={index} className={styles.card}>
              <label className={styles.label}>Photo {index + 1}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handlePhotoChange(index, event)}
              />
              {!photos[index] && <span className={styles.plusSymbol}>+</span>}
              {photos[index] && (
                <img
                  src={URL.createObjectURL(photos[index])}
                  alt={`Photo ${index + 1}`}
                  className={styles.imgPreview}
                />
              )}
            </div>
          ))}
        </div>
        <div className={styles.videoCardContainer}>
          <div className={styles.card}>
            <label className={styles.label}>Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
            />
            {!video && <span className={styles.plusSymbol}>+</span>}
            {video && (
              <video
                src={URL.createObjectURL(video)}
                className={styles.videoPreview}
                controls
              />
            )}
          </div>
          <div className={styles.videoDescription}>
            Add more about your experience as a short video.
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button type="button" className={styles.previousButton} onClick={submitprevious}>
            Previous
          </button>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPhotos;
