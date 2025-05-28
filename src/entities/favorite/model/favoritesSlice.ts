import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FavoriteState = string[];

const initialState: FavoriteState = JSON.parse(
	localStorage.getItem('favorites') || '[]'
);

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		toggleFavorite: (state, action: PayloadAction<string>) => {
			const index = state.indexOf(action.payload);
			if (index >= 0) {
				state.splice(index, 1);
			} else {
				state.push(action.payload);
			}
			localStorage.setItem('favorites', JSON.stringify(state));
		},
	},
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
