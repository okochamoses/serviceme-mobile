import React from 'react';


const auth = {
    isAuthenticated: false,
    isLoading: false,
  }
  
  export const AuthContext = React.createContext(auth);
