import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error fetching user:', error.response?.data || error.message);
          logout();
        }
      }
    };

    fetchUser();
  }, [token]);

  const login = async (access_token) => {
    try {
      localStorage.setItem('access_token', access_token);
      setToken(access_token);
      setIsLoggedIn(true);

      //Fetcg user details
     const response = await axios.get('http://localhost:8000/users/me', {
      headers: { Authorization: `Bearer ${access_token}` },
      });
      setUser(response.data); // Set user details
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
