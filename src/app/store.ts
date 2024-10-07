import { configureStore } from '@reduxjs/toolkit';
import { teamSlice } from '../features/teamSlice';
import { newsSlice } from '../features/newsSlice';

export const store = configureStore({
  reducer: {
    team: teamSlice.reducer,
    news: newsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
