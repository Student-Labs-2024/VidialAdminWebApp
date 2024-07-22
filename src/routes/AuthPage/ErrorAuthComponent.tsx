import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import { colors } from 'theme/DefaultTheme';

const ErrorAuthComponent = () => {
  return (
    <React.Fragment>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: colors.grey[600],
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.secondary.main,
            width: '400px',
            height: '200px',
            borderRadius: '20px',
          }}
        >
          <Typography
            sx={{
              color: colors.text.secondary,
              fontWeight: 'bold',
              fontSize: '50px',
            }}
          >
            Ошибка 404
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ErrorAuthComponent;
