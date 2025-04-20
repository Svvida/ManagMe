import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { menuItems } from './constants/MenuItems';
import Navigation from '../../components/shared/navigation/Navigation';
import AppBar from '../../components/shared/appBar/AppBar';

function PostAuthLayout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <AppBar />
      <Navigation menuItems={menuItems} />
        <Box component="main" sx={{ p: 3 }}>
          <Outlet />
      </Box>
    </Box>
  );
}

export default PostAuthLayout;
