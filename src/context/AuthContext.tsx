/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useState } from 'react';
import { requestToAuth } from '../utils/httpAuthClient';
import { useSessionStorage } from '../hooks/useSessionStorage';

type InitContext = {
  authorized: boolean;
  login: (username: string, password: string) => Promise<any>;
  token: string;
  setAuthorized: (v: boolean) => void;
};

export const AuthContext = React.createContext<InitContext>({
  authorized: false,
  login: () => Promise.resolve(),
  token: '',
  setAuthorized: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useSessionStorage('authorized', false);
  const [token, setToken] = useSessionStorage('token', '');
  const login = useCallback(async (email: string, password: string) => {
    return requestToAuth({ email, password }).then(response => {
      setToken(response.token);
      setAuthorized(true);
    });
  }, []);

  const value = useMemo(() => {
    return { authorized, login, token, setAuthorized };
  }, [authorized, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
