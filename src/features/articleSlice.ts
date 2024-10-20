import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '../types/News';
import { news } from '../services/public/news';

type InitialState = {
  loading: boolean;
  error: string;
  article: News | null;
};

const initialState: InitialState = {
  loading: false,
  error: '',
  article: null,
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle: (state, action: PayloadAction<News>) => {
      state.article = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(loadArticle.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      loadArticle.fulfilled,
      (state, action: PayloadAction<News[]>) => {
        state.article = action.payload[0];
        state.loading = false;
      },
    );

    builder.addCase(loadArticle.rejected, (state, action) => {
      state.error = action.error.message || 'Something went wrong!';
      state.loading = false;
    });
  },
});

export const loadArticle = createAsyncThunk(
  'fetch/article',
  async (id: string) => {
    return news.getArticle(id);
  },
);
