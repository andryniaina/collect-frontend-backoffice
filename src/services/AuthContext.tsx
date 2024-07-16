// AuthContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { loginSA } from './application/user.sa';
// Define the context value type
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<Boolean>;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  token: null,
  login: async () => true,
  logout: () => { },
};

// Create the context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Provider component
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  let [isAuthenticated, setIsAuth] = useState(!!localStorage.getItem('token'));


  const login = async (username: string, password: string) => {
    try {
      const response = await loginSA(username, password);

      if (response?.isError) {
        return response?.isError
      }

      setToken(response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
      setIsAuth(true);

      return true;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuth(false);
  };

  let value = { isAuthenticated, token, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
