import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import {
  Box,
  Typography,
  Button,
  Paper,
  Link,
  MenuItem,
  Container,
  Stack,
  alpha,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  PersonAdd,
  Person,
  Badge,
  Work,
  Login as LoginIcon
} from '@mui/icons-material';
import { useRegisterMutation } from '../../../redux/apiSlices/auth.slice';
import RHFTextField from '../../shared/formComponents/RHFTextField';
import { registerValidationSchema } from './schema/Register.Yup';
import { Role } from '../../../contract/enums';
import PasswordField from '../../shared/formComponents/PasswordField';
import { IRegisterRequest } from '../../../contract/auth';

const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();

  const methods = useForm<IRegisterRequest>({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      identifier: '',
      password: '',
      firstName: '',
      lastName: '',
      role: Role.Developer
    },
  });

  const onSubmit: SubmitHandler<IRegisterRequest> = async data => {
    const { identifier, password, firstName, lastName, role } = data;

    await registerUser({
      identifier,
      password,
      firstName,
      lastName,
      role,
    });
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 2
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
              <PersonAdd sx={{ fontSize: 40, color: 'white' }} />
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
              Join Us Today
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
              Create your account to get started
            </Typography>
          </Box>

          {/* Form Section */}
          <Box sx={{ p: 4 }}>
            <Stack spacing={3}>
              {/* Account Information */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Person sx={{ fontSize: 20 }} />
                  Account Information
                </Typography>

                <Stack spacing={2.5}>
                  <RHFTextField
                    name="identifier"
                    label="Username/Email"
                    fullWidth
                    type="identifier"
                    InputProps={{
                      startAdornment: (
                        <Person sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
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
                </Stack>
              </Box>

              {/* Personal Information */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Badge sx={{ fontSize: 20 }} />
                  Personal Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <RHFTextField
                      name="firstName"
                      label="First Name"
                      fullWidth
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RHFTextField
                      name="lastName"
                      label="Last Name"
                      fullWidth
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
                  </Grid>
                </Grid>
              </Box>

              {/* Role Selection */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: 'primary.main',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Work sx={{ fontSize: 20 }} />
                  Role Selection
                </Typography>

                <RHFTextField
                  name="role"
                  label="Select Your Role"
                  fullWidth
                  select
                  InputProps={{
                    startAdornment: (
                      <Work sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
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
                >
                  {Object.values(Role).map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Box>

              {/* Submit Button */}
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
                  mt: 2,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5e35a1 0%, #7048b8 100%)',
                    boxShadow: `0 6px 20px ${alpha('#673ab7', 0.4)}`,
                  },
                  '&:active': {
                    transform: 'translateY(1px)'
                  }
                }}
                startIcon={<PersonAdd />}
              >
                Create Account
              </Button>
            </Stack>

            {/* Login Link */}
            <Box
              sx={{
                mt: 4,
                pt: 3,
                borderTop: `1px solid ${alpha('#673ab7', 0.12)}`,
                textAlign: 'center'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={handleLoginClick}
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'secondary.main'
                    }
                  }}
                >
                  <LoginIcon sx={{ fontSize: 16 }} />
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </FormProvider>
    </Container>
  );
};

export default Register;
