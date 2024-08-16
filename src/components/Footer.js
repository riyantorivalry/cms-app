// components/Footer.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 2, mt: 'auto' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © 2023 CMS App. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
