export const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 550 },
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column'
};

export const themedFieldSx = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#673ab7'
    }
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#673ab7'
  },
};
