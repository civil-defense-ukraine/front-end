/* eslint-disable @typescript-eslint/no-explicit-any */
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

type ServiceFunctions = {
  post: (data: FormData, token: string) => Promise<any>;
  delete: (id: string, token: string) => Promise<any>;
  update: (id: number, data: FormData, token: string) => Promise<any>;
};
type Category = null | 'news' | 'team' | 'donate';
type Items = {
  news: News[];
  team: TeamMember[];
};

type InitContext = {
  items: Items;
  setItems: Dispatch<SetStateAction<Items>>;
  serviceFunctions: ServiceFunctions;
  setServiceFunctions: Dispatch<SetStateAction<ServiceFunctions>>;
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
};

const initContext = {
  items: {
    news: [],
    team: [],
  },
  setItems: () => {},
  serviceFunctions: {
    post: () => Promise.resolve(),
    delete: () => Promise.resolve(),
    update: () => Promise.resolve(),
  },
  setServiceFunctions: () => {},
  category: null,
  setCategory: () => {},
};

export const AdminContext = createContext<InitContext>(initContext);

type Props = {
  children: React.ReactNode;
};

export const AdminProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useState<Items>({
    news: [],
    team: [],
  });
  const [category, setCategory] = useState<Category>(null);
  const [serviceFunctions, setServiceFunctions] = useState<ServiceFunctions>({
    post: () => Promise.resolve(),
    delete: () => Promise.resolve(),
    update: () => Promise.resolve(),
  });

  const initState: InitContext = useMemo(() => {
    return {
      items,
      setItems,
      serviceFunctions,
      setServiceFunctions,
      category,
      setCategory,
    };
  }, [
    items,
    setItems,
    serviceFunctions,
    setServiceFunctions,
    category,
    setCategory,
  ]);

  return (
    <AdminContext.Provider value={initState}>{children}</AdminContext.Provider>
  );
};
