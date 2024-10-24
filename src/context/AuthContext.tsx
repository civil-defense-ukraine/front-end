import React, { useCallback, useMemo, useState } from 'react';
import { requestToAuth } from '../utils/httpAuthClient';
import { useSessionStorage } from '../hooks/useSessionStorage';

type InitContext = {
  authorized: boolean;
  login: (username: string, password: string) => Promise<any>;
  token: string;
};

export const AuthContext = React.createContext<InitContext>({
  authorized: false,
  login: (username: string, password: string) => Promise.resolve(),
  token: '',
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useSessionStorage('authorized', false);
  const [token, setToken] = useSessionStorage('token', '');
  const login = useCallback(async (email: string, password: string) => {
    const response = await requestToAuth({ email, password });

    setToken(response.token);

    setAuthorized(true);
  }, []);

  const value = useMemo(() => {
    return { authorized, login, token };
  }, [authorized, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
