import { VisibilityOff, Visibility } from '@mui/icons-material';
import { InputAdornment, IconButton, type TextFieldProps } from '@mui/material';
import { useState } from 'react';
import RHFTextField from './RHFTextField';

interface RHFTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
}

const PasswordField = ({ name, ...props }: RHFTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <RHFTextField
      {...props}
      name={name}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
