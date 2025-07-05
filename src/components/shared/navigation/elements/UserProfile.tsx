import { Avatar, Box, Typography, Collapse, Stack } from '@mui/material';
import { selectCurrentUser } from "../../../../redux/statesSlices/auth";
import { useTypedSelector } from '../../../../hooks/useStore';
import { selectIsDrawerOpen } from "../../../../redux/statesSlices/view";

function UserProfile() {
  const user = useTypedSelector(selectCurrentUser);
  const isDrawerOpen = useTypedSelector(selectIsDrawerOpen);

  if (!user) return null;

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2, overflow: 'hidden' }}>
      <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
        {`${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`}
      </Avatar>
      <Collapse in={isDrawerOpen} orientation="horizontal">
        <Box sx={{ whiteSpace: 'nowrap' }}>
          <Typography fontWeight="bold" variant="body1" lineHeight={1.2}>
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography variant="body2" color="text.secondary" textTransform="capitalize">
            {user.role}
          </Typography>
        </Box>
      </Collapse>
    </Stack>
  );
}

export default UserProfile;
