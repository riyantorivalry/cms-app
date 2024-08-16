// components/SideBar.js
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

const SideBar = ({ open, onClose, onMenuSelect }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem button onClick={() => onMenuSelect('dashboard')}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
