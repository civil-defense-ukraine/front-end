import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TeamMember } from '../types/TeamMember';
import { team } from '../services/public/team';
import { sort } from '../utils/sortItems';

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

    update(state, action: PayloadAction<TeamMember>) {
      state.team = [
        ...state.team.filter(person => person.id !== action.payload.id),
        action.payload,
      ];
    },

    add(state, action: PayloadAction<Omit<TeamMember, 'id'>>) {
      const id = Math.random().toFixed(14).slice(2);
      state.team.push({ ...action.payload, id: +id });
    },
    delete(state, action: PayloadAction<number>) {
      state.team = state.team.filter(
        teamMember => teamMember.id !== action.payload,
      );
    },
  },

  extraReducers(builder) {
    builder.addCase(loadTeam.pending, state => {
      state.loading = true;
    });

    builder.addCase(
      loadTeam.fulfilled,
      (state, action: PayloadAction<TeamMember[]>) => {
        state.team = action.payload.sort(sort.teamMembers);

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
