import React, { useState } from 'react';
import { Avatar, Box, Button, TextField, Typography, Link, Grid2 } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectRegisterError, selectRegisterLoading } from './usersSlice';
import { register } from './usersThunks';
import { RegisterMutation } from '../../types';
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const isLoading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  const [state, setState] = useState<RegisterMutation>({
    username: '',
    displayName: '',
    password: '',
    confirmPassword: '',
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed!');
    }
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgColor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
        <Grid2 container direction="column" spacing={2}>
          <Grid2>
            <TextField
              required
              label="Username"
              name="username"
              autoComplete="new-username"
              value={state.username}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('username'))}
              helperText={getFieldError('username')}
            />
          </Grid2>
          <Grid2>
            <TextField
              required
              label="Your nickname"
              name="displayName"
              value={state.displayName}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('displayName'))}
              helperText={getFieldError('displayName')}
            />
          </Grid2>
          <Grid2>
            <TextField
              required
              type="password"
              label="Password"
              name="password"
              autoComplete="new-password"
              value={state.password}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('password'))}
              helperText={getFieldError('password')}
            />
          </Grid2>
          <Grid2>
            <TextField
              required
              type="password"
              label="Confirm password"
              name="confirmPassword"
              autoComplete="new-password"
              value={state.confirmPassword}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('confirmPassword'))}
              helperText={getFieldError('confirmPassword')}
            />
          </Grid2>
        </Grid2>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: 'grey' }}
          disabled={isLoading}
        >
          Sign up
        </Button>
        <Link component={RouterLink} to="/login">
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
