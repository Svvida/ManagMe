import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, Tooltip } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useRefreshMutation } from "../../../../redux/apiSlices/auth";
import FullScreenLoader from '../../fullScreenLoader/FullScreenLoader';

interface IAppBarExtSessionIconProps {
  timerColor: string;
}

function AppBarExtSessionIcon({ timerColor }: IAppBarExtSessionIconProps) {
  const [refresh, { isLoading }] = useRefreshMutation();

  const handleExtendSession = async () => {
    await refresh()
      .unwrap()
      .then(() => {
        enqueueSnackbar('Session extended', { variant: 'success' });
      });
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : null}
      <Tooltip title="Extend Session" placement="bottom">
        <span>
          <IconButton onClick={handleExtendSession} color="primary" disabled={isLoading} size="large">
            <RefreshIcon sx={{ color: timerColor }} />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}

export default AppBarExtSessionIcon;
