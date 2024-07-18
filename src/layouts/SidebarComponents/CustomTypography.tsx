import styled from 'styled-components';
import { Typography } from '@mui/material';

interface CustomTypographyProps {
  fontWeight?: number;
  fontSize?: string;
  color?: string;
  textDecoration?: string;
}

const CustomTypography = styled(Typography)<CustomTypographyProps>`
  font-weight: ${({ fontWeight }) => fontWeight || 700};
  font-size: ${({ fontSize }) => fontSize || '18px'};
  color: ${({ color }) => color || 'inherit'};
  text-decoration: ${({ textDecoration }) => textDecoration || 'none'};
`;

export default CustomTypography;
