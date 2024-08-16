// App.js
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MenuBar from './components/MenuBar';
import Content from './components/Content';
import Footer from './components/Footer';

const theme = createTheme();

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleMenuSelect = (section) => {
    setActiveSection(section);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <MenuBar onMenuSelect={handleMenuSelect} activeSection={activeSection} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Content activeSection={activeSection} setActiveSection={setActiveSection} />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
