import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '../types/News';
import { news } from '../services/news';
import { sortNewsByDate } from '../utils/getSortedNews';
import { getNormalized } from '../utils/getNormalized';

type InitialState = {
  loading: boolean;
  error: string;
  news: News[];
};

const initialState: InitialState = {
  loading: false,
  error: '',
  news: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<News[]>) => {
      state.news = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadNews.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      loadNews.fulfilled,
      (state, action: PayloadAction<News[]>) => {
        if (action.payload.length === 0) {
          state.error = 'Currently there are no news!';
        } else {
          const sortedNews = action.payload.sort(sortNewsByDate);

          state.news = [...sortedNews, ...sortedNews, ...sortedNews].map(
            (news, id) => {
              const link = getNormalized.link(news.title);
              return { ...news, id, link };
            },
          );
          state.loading = false;
        }
      },
    );

    builder.addCase(loadNews.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong!';
      state.loading = false;
    });
  },
});

export const loadNews = createAsyncThunk('fetch/news', async () => {
  return news.get();
});
