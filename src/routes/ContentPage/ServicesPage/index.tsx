import { Add } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';

import InputSearch from 'components/InputSearch';
import MenuFilterBtn from 'components/MenuFilterBtn';

const ServicesPage = () => {
  return (
    <Box className="root">
      <Box className="contentBtns">
        <InputSearch />
        <Tooltip title="Добавить услугу" placement="bottom">
          <IconButton sx={{ padding: 0 }}>
            <Add className="iconAdd" />
          </IconButton>
        </Tooltip>
        <MenuFilterBtn />
      </Box>
    </Box>
  );
};

export default ServicesPage;
