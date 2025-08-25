import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { loginUser } from '@/services/api';
import { clearToken, clearUser, getToken, getUser, saveToken, saveUser } from '@/utils/storage';

interface AuthContextType {
  user: any;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

 const loadUser = async () => {
    try {
      const token = await getToken();

      if (token) {
        setUser({ token });
        setToken(token);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);


  const login = async (email: string, password: string) => {
    const res = await loginUser(email, password);
    const accessToken = res.access_token;
    setToken(accessToken);
    await saveToken(accessToken);
    setUser({ email }); // ? TODO: fetch user info ?
    saveUser({ email }); // ? TODO 2: Update as well ?
    router.replace('/(tabs)/movies'); // Go to movies page.
  };

  const logout = async () => {
    setToken(null);
    setUser(null);

    // Remove from storage as ewll
    clearToken();
    clearUser();
    router.replace('./login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};