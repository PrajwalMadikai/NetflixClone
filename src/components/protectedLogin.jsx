import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedLogin = ({children}) => {
  const { user } = UserAuth();

  useEffect(() => {
   
    if (user) {
      // Ensure the user can't go back to login page
      window.history.pushState(null, "", "/");
    }
  }, [user]);

  if (user) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default ProtectedLogin;
