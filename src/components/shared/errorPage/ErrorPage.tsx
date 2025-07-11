import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useRouteError } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { selectCurrentToken } from "../../../redux/statesSlices/auth";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const isAuthenticated = useSelector(selectCurrentToken);

  useEffect(() => {
    navigate(isAuthenticated ? 'postAuth/projects' : '/login');
    enqueueSnackbar(`Something went wrong. Logs were sent to Admin`, { variant: 'error' });
  }, [isAuthenticated, error]);

  return null;
};

export default ErrorPage;
