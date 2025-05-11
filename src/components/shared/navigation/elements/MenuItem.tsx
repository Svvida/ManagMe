import { NavLink, useLocation } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, SxProps, Theme, Tooltip, alpha } from '@mui/material';
import type { IMenuItemProps } from '../types/types';
import { useTypedSelector } from '../../../../hooks/useStore';
import { selectIsDrawerOpen } from '../../../../redux/statesSlices/view.slice';

const itemSx: SxProps<Theme> = {
  px: 2.5,
  py: 1.25,
  mb: 0.5,
  borderRadius: 2,
  color: 'text.secondary',
  transition: 'background-color 0.2s, color 0.2s',
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.primary.light, 0.1),
  },
  '&.active': {
    color: 'white',
    backgroundColor: 'primary.main',
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
    '&:hover': {
      backgroundColor: 'primary.dark',
    }
  },
};

function MenuItemComponent({ item, onNavigate }: IMenuItemProps) {
  const isDrawerOpen = useTypedSelector(selectIsDrawerOpen);
  const location = useLocation();
  const isActive = item.linkTo ? location.pathname.includes(item.linkTo) : false;

  return (
    <Tooltip title={isDrawerOpen ? '' : item.text} placement="right" arrow>
      <ListItemButton
        component={NavLink}
        to={item.linkTo || '#'}
        className={isActive ? 'active' : ''}
        sx={itemSx}
        onClick={onNavigate}
      >
        <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
          {item.icon}
        </ListItemIcon>
        {isDrawerOpen && <ListItemText primary={item.text} sx={{ whiteSpace: 'nowrap' }} />}
      </ListItemButton>
    </Tooltip>
  );
}

export default MenuItemComponent;
