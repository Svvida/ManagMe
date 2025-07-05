import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Book as BookIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

export const menuItems = [
  {
    id: "projects",
    text: "Projects",
    icon: <DashboardIcon />,
    linkTo: "projects",
  },
  {
    id: "stories",
    text: "Stories",
    icon: <PersonIcon />,
    linkTo: "stories",
  },
  {
    id: "tasks",
    text: "Tasks",
    icon: <BookIcon />,
    linkTo: "tasks",
  },
  {
    id: "logout",
    text: "Logout",
    icon: <LogoutIcon />,
    linkTo: "logout",
  },
];
