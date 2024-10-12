import React, { useState } from 'react';

export const AuthContext = React.createContext({
  authorized: false,
  login: (username: string, password: string) => Promise.resolve(),
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);

  async function login(username: string, password: string) {
    const correctLogin = 'login';
    const correctPass = 'q123456';

    if (username !== correctLogin && password !== correctPass) {
      throw new Error('Wrong password!');
    }

    setAuthorized(true);
  }
  return (
    <AuthContext.Provider value={{ authorized, login }}>
      {children}
    </AuthContext.Provider>
  );
};
