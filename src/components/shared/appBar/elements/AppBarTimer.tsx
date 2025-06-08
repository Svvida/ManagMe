import { useEffect } from 'react';
import { Chip, Tooltip, CircularProgress } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { isAfter, parseISO } from 'date-fns';
import { enqueueSnackbar } from 'notistack';
import { useAppBarTimer } from '../../../../hooks/useAppBarTimer';
import { useTypedSelector } from '../../../../hooks/useStore';
import { useRefreshMutation, useSendLogoutMutation } from '../../../../redux/apiSlices/auth.slice';
import { selectTokenExpirationTime } from '../../../../redux/statesSlices/auth.slice';
import { timerStylesByState } from '../constants/constants';

function AppBarTimer() {
  const tokenExpirationTime = useTypedSelector(selectTokenExpirationTime);
  const { timeLeft, timerState } = useAppBarTimer();
  const [sendLogout] = useSendLogoutMutation();
  const [refresh, { isLoading }] = useRefreshMutation();

  const { color, icon } = timerStylesByState[timerState];

  useEffect(() => {
    if (!tokenExpirationTime || isAfter(new Date(), parseISO(tokenExpirationTime))) {
      sendLogout();
    }
  }, [timeLeft, tokenExpirationTime, sendLogout]);

  const handleExtendSession = async () => {
    try {
      await refresh().unwrap();
      enqueueSnackbar('Session extended successfully!', { variant: 'success' });
    } catch {
      enqueueSnackbar('Failed to extend session.', { variant: 'error' });
    }
  };

  return (
      <Chip
        icon={icon}
        label={timeLeft}
        color={color}
        variant="filled"
        onDelete={handleExtendSession}
        deleteIcon={
          <Tooltip title="Extend Session">
            {isLoading ? <CircularProgress size={20} color="inherit" /> : <Refresh />}
          </Tooltip>
        }
        sx={{
          fontWeight: 600,
          color: 'white',
          // Use alpha to create a background color from the main color
          bgcolor: `${color}.main`,
          '& .MuiChip-icon': {
            color: 'white',
          },
          '& .MuiChip-deleteIcon': {
            color: 'white',
            opacity: 0.7,
            '&:hover': {
              opacity: 1,
            },
          },
        }}
      />
  );
}

export default AppBarTimer;
