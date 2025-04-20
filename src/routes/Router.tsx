import { createBrowserRouter } from 'react-router-dom';
import PostAuthLayout from '../layouts/postAuth/PostAuthLayout';
import PreAuthLayout from '../layouts/preAuth/PreAuthLayout';
import PersistLoginMiddleware from '../middlewares/persistLogin/PersistLogin.Middleware';
import ProtectedRoutesMiddleware from '../middlewares/protectedRoutes/ProtectedRoutes.Middleware';
import ErrorPage from '../components/shared/errorPage/ErrorPage';
import Login from '../components/viewsComponents/login/Login';
import Register from '../components/viewsComponents/register/Register';
import ProjectList from '../components/viewsComponents/project/ProjectList';
import StoryList from '../components/viewsComponents/story/storyList/StoryList';
import TaskList from '../components/viewsComponents/task/taskList/TaskList';
import Logout from '../components/shared/navigation/elements/Logout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PersistLoginMiddleware />,
    errorElement: <ErrorPage />,
    children: [
      // Pre-auth routes
      {
        path: '',
        element: <PreAuthLayout />,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
      // Post-auth routes
      {
        path: 'postAuth',
        element: <ProtectedRoutesMiddleware />,
        children: [
          {
            element: <PostAuthLayout />,
            children: [
              {
                index: true,
                element: <ProjectList />,
              },
              {
                path: 'projects',
                element: <ProjectList />,
              },
              {
                path: 'stories',
                element: <StoryList />,
              },
              {
                path: 'tasks',
                element: <TaskList />,
              },
              {
                path: 'logout',
                element: <Logout />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
