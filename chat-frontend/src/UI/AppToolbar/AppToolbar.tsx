import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import UserMenu from '../../UI/AppToolbar/UserMenu';
import { StyledLink } from '../../constants';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar
        position="sticky"
        sx={{
          background: '#2D343D66',
          borderBottomLeftRadius: '15px',
          borderBottomRightRadius: '15px',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ margin: '0 24px' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink to="/">Chat</StyledLink>
          </Typography>
          {user && <UserMenu user={user} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
