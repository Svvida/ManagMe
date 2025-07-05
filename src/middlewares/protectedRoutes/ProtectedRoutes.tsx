import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useStore';
import { selectCurrentToken } from "../../redux/statesSlices/auth";

const ProtectedRoutesMiddleware = () => {
  const isAuthenticated = useTypedSelector(selectCurrentToken);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutesMiddleware;
