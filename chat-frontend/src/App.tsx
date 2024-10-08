import AppToolbar from './UI/AppToolbar/AppToolbar';
import { Container } from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Error404 from './UI/errors/Error404';
import Messages from './features/messages/Messages';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';

const App = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const hideToolbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideToolbar && (
        <header>
          <AppToolbar />
        </header>
      )}
      <Container maxWidth="xl" component="main" sx={{ color: '#e4e4e4' }}>
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Navigate to="/register" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <Route
              path="/"
              element={
                <ProtectedRoute isAllowed={true}>
                  <Messages />
                </ProtectedRoute>
              }
            />
          )}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
