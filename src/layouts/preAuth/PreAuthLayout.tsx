import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTypedSelector } from '../../hooks/useStore';
import { selectCurrentToken } from '../../redux/statesSlices/auth.slice';

function PreAuthLayout() {
  const isAuthenticated = useTypedSelector(selectCurrentToken);

  if (isAuthenticated) {
    return <Navigate replace to="/postAuth" />;
  }

  return (
    <Box sx={{ display: 'grid' }}>
      <Outlet />
    </Box>
  );
}

export default PreAuthLayout;
