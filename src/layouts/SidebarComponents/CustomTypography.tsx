import { Typography } from '@mui/material';
import { styled } from '@mui/system';

interface CustomTypographyProps {
  fontWeight?: number;
  fontSize?: string;
  color?: string;
  textDecoration?: string;
}

const CustomTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'fontWeight' && prop !== 'fontSize' && prop !== 'color' && prop !== 'textDecoration',
})<CustomTypographyProps>(({ fontWeight, fontSize, color, textDecoration }) => ({
  fontWeight: fontWeight ?? 700,
  fontSize: fontSize ?? '18px',
  color: color ?? 'inherit',
  textDecoration: textDecoration ?? 'none',
}));

export default CustomTypography;
