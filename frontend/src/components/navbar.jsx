import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function Navbar({content}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <ListItem key={1} disablePadding>
            <ListItemButton component={Link} to="/profile">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={2} disablePadding>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={3} disablePadding>
            <ListItemButton component={Link} to="/organisation-setup">
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={"Organisation Setup"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={4} disablePadding>
            <ListItemButton component={Link} to="/assets">
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={"Assets"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={5} disablePadding>
            <ListItemButton component={Link} to="/allocation-transfer">
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={"Allocation & Transfer"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={6} disablePadding>
            <ListItemButton component={Link} to="/resource-booking">
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={"Resource Booking"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={7} disablePadding>
            <ListItemButton component={Link} to="/maintenance">
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={"Maintenance"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={8} disablePadding>
            <ListItemButton component={Link} to="/audit">
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={"Audit"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={9} disablePadding>
            <ListItemButton component={Link} to="/report">
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={"Report"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={10} disablePadding>
            <ListItemButton component={Link} to="/notification">
              <ListItemIcon>
                <AutoGraphIcon />
              </ListItemIcon>
              <ListItemText primary={"Notification"} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, textAlign: 'left' }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
