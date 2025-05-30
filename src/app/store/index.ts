import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../../entities/favorite/model/favoritesSlice';
import cartReducer from '../../entities/cart/model/cartSlice';

export const store = configureStore({
	reducer: {
		favorites: favoritesReducer,
		cart: cartReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
