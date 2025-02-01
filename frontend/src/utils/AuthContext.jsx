import React, { createContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient'; 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user data if needed

  // Check authentication state on mount
  useEffect(() => {
    // Fetch the current session
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (session) {
        setIsLoggedIn(true);
        setUser(session.user); // Store user data
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    fetchSession();

    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsLoggedIn(true);
        setUser(session.user); // Store user data
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    });

    // Cleanup listener on unmount
    return () => subscription.unsubscribe();
  }, []);

  /**
   * Login function using Supabase's signIn method.
   */
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error logging in:', error.message);
      } else {
        setIsLoggedIn(true);
        setUser(data.user); // Store user data
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  /**
   * Logout function using Supabase's signOut method.
   */
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};