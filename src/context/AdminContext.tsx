/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { News } from '../types/News';
import { TeamMember } from '../types/TeamMember';

type InitContext = {
  displayForm: boolean;
  setDisplayForm: Dispatch<SetStateAction<boolean>>;
  selectedItem: null | News | TeamMember;
  setSelectedItem: Dispatch<SetStateAction<null | News | TeamMember>>;
};

const initContext = {
  displayForm: false,
  setDisplayForm: () => {},
  selectedItem: null,
  setSelectedItem: () => {},
};

export const AdminContext = createContext<InitContext>(initContext);

type Props = {
  children: React.ReactNode;
};

export const AdminProvider: React.FC<Props> = ({ children }) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | News | TeamMember>(
    null,
  );
  const initState: InitContext = useMemo(() => {
    return {
      displayForm,
      setDisplayForm,
      selectedItem,
      setSelectedItem,
    };
  }, [displayForm, setDisplayForm, selectedItem, setSelectedItem]);

  return (
    <AdminContext.Provider value={initState}>{children}</AdminContext.Provider>
  );
};