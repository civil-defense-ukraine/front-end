/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
type InitContext = {
  showMenu: boolean; 
  setShowMenu: Dispatch<SetStateAction<boolean>>
};

const initContext:InitContext = {
  showMenu: false,
  setShowMenu: () => {},
}

export const MenuContext = createContext<InitContext>(initContext);

type Props = {
  children: React.ReactNode
}

export const MenuProvider: React.FC<Props> = ({children}) => {
  const [showMenu, setShowMenu] = useState(false);
  const value = useMemo(() => ({ showMenu, setShowMenu }), [showMenu, setShowMenu]);
  
  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}
