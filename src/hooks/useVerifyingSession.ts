import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRefreshMutation } from "../redux/apiSlices/auth";
import { setCredentials, logOut } from "../redux/statesSlices/auth";
import { useTypedDispatch } from './useStore';

export const useVerifySession = (token: string | null) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const [isVerifying, setIsVerifying] = useState(true);
  const [refresh, { isLoading: isRefreshing }] = useRefreshMutation();

  useEffect(() => {
    let isMounted = true;

    const verifyToken = async () => {
      if (!token) {
        setIsVerifying(false);
        return;
      }

      try {
        const result = await refresh().unwrap();
        if (isMounted) {
          dispatch(setCredentials({ accessToken: result.accessToken, user: result.user }));
        }
      } catch {
        if (isMounted) {
          dispatch(logOut());
          navigate('/login', { replace: true });
        }
      } finally {
        if (isMounted) {
          setIsVerifying(false);
        }
      }
    };

    verifyToken();

    return () => {
      isMounted = false;
    };
  }, []); // runs only ONCE

  return { isLoading: isRefreshing || isVerifying };
};
