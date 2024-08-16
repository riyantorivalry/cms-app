// components/MenuBar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const MenuBar = ({ onMenuSelect, activeSection }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ height: 80 }}> {/* Increased height */}
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          CMS
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            onClick={() => onMenuSelect('home')}
            sx={{ 
              fontSize: '1.1rem', 
              fontWeight: activeSection === 'home' ? 'bold' : 'normal',
              textDecoration: activeSection === 'home' ? 'underline' : 'none'
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            onClick={() => onMenuSelect('dashboard')}
            sx={{ 
              fontSize: '1.1rem', 
              fontWeight: activeSection === 'dashboard' ? 'bold' : 'normal',
              textDecoration: activeSection === 'dashboard' ? 'underline' : 'none'
            }}
          >
            Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
