import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { Role } from '../../../contract/enums';

export const menuItems = [
  {
    id: 'projects',
    text: 'Projects',
    icon: <DashboardIcon />,
    linkTo: 'projects',
    availableForRoles: [Role.Admin, Role.Developer, Role.DevOps],
  },
  {
    id: 'stories',
    text: 'Stories',
    icon: <PersonIcon />,
    linkTo: 'stories',
    availableForRoles: [Role.Admin, Role.Developer, Role.DevOps],
  },
  {
    id: 'tasks',
    text: 'Tasks',
    icon: <BookIcon />,
    linkTo: 'tasks',
    availableForRoles: [Role.Admin, Role.Developer, Role.DevOps],
  },
  {
    id: 'logout',
    text: 'Logout',
    icon: <LogoutIcon />,
    linkTo: 'logout',
  },
];
