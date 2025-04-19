// movieSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Movie interface
export interface Movie {
  id: string;
  title: string;
  year: number;
  producer: string;
  actors: string[];
}

// Movie state interface
interface MovieState {
  movies: Movie[];
}

// Initial state with an empty movies array
const initialState: MovieState = {
  movies: [],
};

// Movie slice
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    addMovie: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    updateMovie: (state, action: PayloadAction<Movie>) => {
      const index = state.movies.findIndex((movie) => movie.id === action.payload.id);
      if (index !== -1) {
        state.movies[index] = action.payload;
      }
    },
  },
});

// Exporting actions
export const { setMovies, addMovie, updateMovie } = movieSlice.actions;

// Default export reducer
export default movieSlice.reducer;
