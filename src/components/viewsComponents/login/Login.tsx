import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import {
  Box,
  Typography,
  Button,
  Paper,
  Link,
  Container,
  Stack,
  alpha
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Person, LockOpen } from '@mui/icons-material';
import { loginValidationSchema } from './schema/Login.Yup';
import { useLoginMutation } from '../../../redux/apiSlices/auth.api.slice';
import RHFTextField from '../../shared/formComponents/RHFTextField';
import PasswordField from '../../shared/formComponents/PasswordField';

export interface ILoginFields {
  login: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();

  const methods = useForm<ILoginFields>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<ILoginFields> = async data => {
    const { login, password } = data;

    await loginUser({
      identifier: login,
      password,
    });
  };

  const handleCreateAccountClick = () => {
    navigate('/register');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <FormProvider {...methods}>
        <Paper
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          elevation={0}
          sx={{
            width: '100%',
            borderRadius: 4,
            background: `linear-gradient(135deg,
              ${alpha('#673ab7', 0.05)} 0%,
              ${alpha('#7e57c2', 0.05)} 100%)`,
            border: `1px solid ${alpha('#673ab7', 0.12)}`,
            backdropFilter: 'blur(10px)',
            overflow: 'hidden'
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)',
              p: 2,
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                position: 'relative',
                zIndex: 1
              }}
            >
              <Person sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 600,
                position: 'relative',
                zIndex: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mt: 1,
                position: 'relative',
                zIndex: 1
              }}
            >
              Sign in to your account
            </Typography>
          </Box>

          {/* Form Section */}
          <Box sx={{ p: 4 }}>
            <Stack spacing={3}>
              <RHFTextField
                name="login"
                label="Username"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <Person sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: alpha('#673ab7', 0.02),
                    '&:hover': {
                      backgroundColor: alpha('#673ab7', 0.04),
                    },
                    '&.Mui-focused': {
                      backgroundColor: alpha('#673ab7', 0.06),
                    }
                  }
                }}
              />

              <PasswordField
                name="password"
                label="Password"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: alpha('#673ab7', 0.02),
                    '&:hover': {
                      backgroundColor: alpha('#673ab7', 0.04),
                    },
                    '&.Mui-focused': {
                      backgroundColor: alpha('#673ab7', 0.06),
                    }
                  }
                }}
              />

              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #673ab7 0%, #7e57c2 100%)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: `0 4px 14px ${alpha('#673ab7', 0.3)}`,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5e35a1 0%, #7048b8 100%)',
                    boxShadow: `0 6px 20px ${alpha('#673ab7', 0.4)}`,
                  },
                  '&:active': {
                    transform: 'translateY(1px)'
                  }
                }}
                startIcon={<LockOpen />}
              >
                Sign In
              </Button>
            </Stack>

            {/* Sign Up Link */}
            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: `1px solid ${alpha('#673ab7', 0.12)}`,
                textAlign: 'center'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={handleCreateAccountClick}
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'secondary.main'
                    }
                  }}
                >
                  Create one here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </FormProvider>
    </Container>
  );
};

export default Login;
