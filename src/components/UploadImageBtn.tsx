import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface UploadImageBtnProps {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  setImageFile: (file: File | null) => void;
  imageError: string;
  setImageError: (error: string) => void;
  text: string;
}

const UploadImageBtn: React.FC<UploadImageBtnProps> = ({
  imageUrl,
  setImageUrl,
  setImageFile,
  imageError,
  setImageError,
  text,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    }

    const file = e.target.files[0];

    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setImageError('Только файлы JPG и PNG допустимы');

      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width !== 1024 || img.height !== 1024) {
        setImageError('Рекомендуемый размер изображения: 1024x1024');
      } else {
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
        setImageError('');
      }
    };
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setImageUrl(null);
  };

  return (
    <>
      {!imageUrl ? (
        <>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image" className="uploadButton">
            <Button className="uploadButtonStyle" component="span">
              <Box component="img" src="/img/upload.svg" alt="upload" />
              <Typography className="uploadBtnText" variant="body2">
                {text}
              </Typography>
            </Button>
          </label>
          {imageError && (
            <Typography className="uploadTextError">{imageError}</Typography>
          )}
        </>
      ) : (
        <Box className="uploadedImageContainer">
          <Box
            className="uploadedImage"
            component="img"
            src={imageUrl}
            alt="uploaded"
            width="100%"
          />
          <Button
            className="deleteButton"
            onClick={handleImageDelete}
            variant="contained"
          >
            Удалить
          </Button>
        </Box>
      )}
      <Typography className="uploadBtnWarning" variant="body2" color="red">
        *Форматы изображений: jpg, png. Рекомендуемый размер: 1024x1024.
      </Typography>
    </>
  );
};

export default UploadImageBtn;
