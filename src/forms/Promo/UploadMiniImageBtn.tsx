import React from 'react';
import { toast, Slide } from 'react-toastify';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Delete, UploadSharp } from '@mui/icons-material';

interface UploadMiniImageBtnProps {
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;
    setImageFile: (file: File | null) => void;
    imageError: string;
    setImageError: (error: string) => void;
}

const UploadMiniImageBtn: React.FC<UploadMiniImageBtnProps> = ({
    imageUrl,
    setImageUrl,
    setImageFile,
    imageError,
}) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) {
            return;
        }

        const file = e.target.files[0];

        if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
            toast.error('Только файлы JPG и PNG допустимы', { transition: Slide });
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            setImageFile(file);
            setImageUrl(URL.createObjectURL(file));
        };
    };

    const handleImageDelete = () => {
        setImageFile(null);
        setImageUrl(null);
    };

    return (
        <Box>
            {!imageUrl ? (
                <>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="upload-mini-image"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="upload-mini-image">
                        <Tooltip title="Загрузить изображение">
                            <IconButton component="span">
                                <UploadSharp sx={{ color: 'black' }} />
                            </IconButton>
                        </Tooltip>
                    </label>
                    {imageError && (
                        <Typography color="error">{imageError}</Typography>
                    )}
                </>

            ) : (
                <Box sx={{ display: 'flex', gap: '5px' }}>
                    <Box
                        component="img"
                        src={imageUrl}
                        alt="uploaded"
                        width="64px"
                        height="64px"
                    />
                    <Tooltip title="Загрузить изображение">
                        <IconButton sx={{ color: 'black' }} onClick={handleImageDelete}>
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
            {/* <Typography variant="body2" color="textSecondary">
                *Форматы изображений: JPG, PNG. Максимальный размер: 64x64.
            </Typography> */}
        </Box>
    );
};

export default UploadMiniImageBtn;
