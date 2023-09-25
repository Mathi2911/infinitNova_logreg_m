import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard'; 
import PersonIcon from '@mui/icons-material/Person'; 
// import SettingsIcon from '@mui/icons-material/Settings';
import menuConfig from './menuConfig';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Drawer variant="permanent">
      <List>
        {menuConfig.map((menuItem) => (
          <ListItem
            key={menuItem.id}
            button
            component={Link}
            to={menuItem.path}
            className={currentPath === menuItem.path ? 'active' : ''}
          >
            <ListItemIcon>
              {menuItem.id === 'dashboard' && <DashboardIcon />}
              {menuItem.id === 'user-details' && <PersonIcon />}
              {/* {menuItem.id === 'settings' && <SettingsIcon />} */}
            </ListItemIcon>
            <ListItemText primary={menuItem.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
