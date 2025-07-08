import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../../entities/favorite/model/favoritesSlice';
import cartReducer from '../../entities/cart/model/cartSlice';
import sessionReducer from '../../entities/session/model/sessionSlice';

export const store = configureStore({
	reducer: {
		favorites: favoritesReducer,
		cart: cartReducer,
		session: sessionReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
