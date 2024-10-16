import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamMember } from '../types/TeamMember';
import { team } from '../services/public/team';

type InitialState = {
  loading: boolean;
  error: string;
  team: TeamMember[];
};

const initialState: InitialState = {
  loading: false,
  error: '',
  team: [],
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam(state, action: PayloadAction<TeamMember[]>) {
      state.team = action.payload;
    },

    updateTeam(state, action: PayloadAction<Omit<TeamMember, 'id'>>) {
      const id = Math.random().toFixed(14).slice(2);
      state.team.push({ ...action.payload, id: +id });
    },
  },

  extraReducers(builder) {
    builder.addCase(loadTeam.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      loadTeam.fulfilled,
      (state, action: PayloadAction<TeamMember[]>) => {
        state.team = action.payload;

        if (action.payload.length === 0) {
          state.error = 'Currently no team members have been added!';
        }

        state.loading = false;
      },
    );

    builder.addCase(loadTeam.rejected, state => {
      state.error = 'Something went wrong!';
      state.loading = false;
    });
  },
});

export const loadTeam = createAsyncThunk('fetch/team', async () => {
  return team.get();
});
