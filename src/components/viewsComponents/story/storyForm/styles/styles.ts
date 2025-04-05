export const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600 },
  maxWidth: 700,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24
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
