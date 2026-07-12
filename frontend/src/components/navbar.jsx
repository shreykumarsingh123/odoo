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
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import BuildIcon from '@mui/icons-material/Build';
import GavelIcon from '@mui/icons-material/Gavel';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function Navbar({content, isAdmin}) {
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
            <ListItemButton
              component={Link}
              to="/organisation-setup"
              disabled={!isAdmin}
            >
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Organisation Setup"}
                sx={{ color: !isAdmin ? 'text.disabled' : 'inherit' }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={4} disablePadding>
            <ListItemButton component={Link} to="/assets">
              <ListItemIcon>
                <Inventory2Icon />
              </ListItemIcon>
              <ListItemText primary={"Assets"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={5} disablePadding>
            <ListItemButton component={Link} to="/allocation-transfer">
              <ListItemIcon>
                <SwapHorizIcon />
              </ListItemIcon>
              <ListItemText primary={"Allocation & Transfer"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={6} disablePadding>
            <ListItemButton component={Link} to="/resource-booking">
              <ListItemIcon>
                <BookOnlineIcon />
              </ListItemIcon>
              <ListItemText primary={"Resource Booking"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={7} disablePadding>
            <ListItemButton component={Link} to="/maintenance">
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary={"Maintenance"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={8} disablePadding>
            <ListItemButton component={Link} to="/audit">
              <ListItemIcon>
                <GavelIcon />
              </ListItemIcon>
              <ListItemText primary={"Audit"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={9} disablePadding>
            <ListItemButton component={Link} to="/report">
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary={"Report"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={10} disablePadding>
            <ListItemButton component={Link} to="/notification">
              <ListItemIcon>
                <NotificationsIcon />
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
