import MenuIcon from '@mui/icons-material/Menu';
import { AppBar as MuiAppBar, Toolbar, Typography, Box, IconButton, useTheme } from '@mui/material';
import AppBarTimer from './elements/AppBarTimer';
import { useTypedDispatch } from '../../../hooks/useStore';
import { useTypedMatches } from '../../../hooks/useTypedMatches';
import { toggleDrawer } from '../../../redux/statesSlices/view.slice';

function AppBar() {
  const dispatch = useTypedDispatch();
  const theme = useTheme();
  const matches = useTypedMatches();
  const currentMatch = matches.find(match => match.handle);
  const pageTitle = currentMatch?.handle?.navigation?.text || "Dashboard";

  return (
    <MuiAppBar
      position="sticky"
      elevation={0}
      sx={{
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ height: 80 }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleDrawer())}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 700 }}>
          {pageTitle}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <AppBarTimer />
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
