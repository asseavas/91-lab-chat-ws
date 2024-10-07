import React from 'react';
import { User } from '../../types';
import { Box, Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunks';
import { StyledButton } from '../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      <Typography variant="h6">Hello, {user.displayName}!</Typography>
      <Box component={StyledButton} variant="outlined" color="white" onClick={handleLogout}>
        Logout
      </Box>
    </Box>
  );
};

export default UserMenu;
