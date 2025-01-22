import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    email: null,
    token: null,
  });
  const [loading, setLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(true);

  useEffect(() => {
    isLoggedIn();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log('Full login response:', response);

      const { token, user } = response.data;
      const userEmail = user.email;
      if (!token || !userEmail) {
        throw new Error('Invalid login response');
      }
      setAuthState({
        isAuthenticated: true,
        email: userEmail,
        token,
      });
      console.log('Setting token and email in AsyncStorage');
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('email', userEmail);
      console.log('Token and email set in AsyncStorage');
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      console.log('Full register response:', response);

      const { token, user } = response.data;
      const userEmail = user.email;
      if (!token || !userEmail) {
        throw new Error('Invalid register response');
      }
      setAuthState({
        isAuthenticated: true,
        email: userEmail,
        token,
      });
      console.log('Setting token and email in AsyncStorage');
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('email', userEmail);
      console.log('Token and email set in AsyncStorage');
    } catch (error) {
      console.error('Error registering:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('email');
      setAuthState({
        isAuthenticated: false,
        email: null,
        token: null,
      });
      console.log('User logged out and AsyncStorage cleared');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = async () => {
    setSplashLoading(true);
    try {
      let token = await AsyncStorage.getItem('token');
      let email = await AsyncStorage.getItem('email');
      if (token && email) {
        setAuthState({
          isAuthenticated: true,
          email,
          token,
        });
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setSplashLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, register, logout, loading, splashLoading }}>
      {children}
    </AuthContext.Provider>
  );
};