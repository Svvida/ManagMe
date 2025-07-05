import { useCallback } from 'react';
import { Box, Divider, List, Drawer as MuiDrawer, IconButton } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import Logo from "../../../assets/images/Logo.png";
import UserProfile from './elements/UserProfile';
import MenuItemComponent from './elements/MenuItem';
import type { INavigationProps } from './types/types';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/useStore';
import { selectUserRole } from '../../../redux/statesSlices/auth.slice';
import { selectIsDrawerOpen, setDrawerState } from '../../../redux/statesSlices/view.slice';
import { Role } from '../../../contract/enums';

const DRAWER_WIDTH = 280;

function Navigation({ menuItems }: INavigationProps) {
  const dispatch = useTypedDispatch();

  const isDrawerOpen = useTypedSelector(selectIsDrawerOpen);
  const userRole = useTypedSelector(selectUserRole);

  const hasRequiredRole = (itemRoles?: Role[]): boolean => {
    if (!itemRoles) return true;
    if (!userRole) return false;
    return itemRoles.includes(userRole);
  };

  const handleCloseDrawer = () => dispatch(setDrawerState(false));

    const onNavigate = useCallback(() => {
    handleCloseDrawer();
  }, []);

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', height: 80 }}>
        <Box component="img" src={Logo} sx={{ height: 40, width: 'auto' }} />

        <IconButton onClick={handleCloseDrawer}>
          <ChevronLeft />
        </IconButton>
      </Box>

      <Divider sx={{ mx: 2 }} />
      <UserProfile />
      <Divider sx={{ mx: 2, mb: 1 }} />

      <List sx={{ flexGrow: 1, overflowY: 'auto', px: 2 }}>
        {menuItems.filter(item => hasRequiredRole(item.availableForRoles)).map(item => (
          <MenuItemComponent item={item} key={item.id} onNavigate={onNavigate} />
        ))}
      </List>
    </Box>
  );

  return (
    <MuiDrawer
      anchor="left"
      open={isDrawerOpen}
      onClose={handleCloseDrawer}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </MuiDrawer>
  );
}

export default Navigation;
