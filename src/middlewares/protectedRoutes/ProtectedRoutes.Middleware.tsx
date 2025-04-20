import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useStore';
import { useTypedMatches } from '../../hooks/useTypedMatches';
import { selectUserRoles, selectCurrentToken } from '../../redux/statesSlices/auth.slice';

const ProtectedRoutesMiddleware = () => {
  const matches = useTypedMatches();
  const currentMatch = matches.find(match => match.handle);

  const userRole = useTypedSelector(selectUserRoles);
  const isAuthenticated = useTypedSelector(selectCurrentToken);
  const notAllowedRoles = currentMatch?.handle?.permissions?.availableForRoles;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (notAllowedRoles && userRole && notAllowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutesMiddleware;
