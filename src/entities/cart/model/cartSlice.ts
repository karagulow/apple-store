import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
	id: string;
	quantity: number;
};

const initialState: CartItem[] = JSON.parse(
	localStorage.getItem('cart') || '[]'
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<string>) => {
			const index = state.findIndex(item => item.id === action.payload);
			if (index >= 0) {
				state[index].quantity += 1;
			} else {
				state.push({ id: action.payload, quantity: 1 });
			}
			localStorage.setItem('cart', JSON.stringify(state));
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			const index = state.findIndex(item => item.id === action.payload);
			if (index >= 0) {
				state.splice(index, 1);
			}
			localStorage.setItem('cart', JSON.stringify(state));
		},
		changeQuantity: (
			state,
			action: PayloadAction<{ id: string; quantity: number }>
		) => {
			const item = state.find(i => i.id === action.payload.id);
			if (item) {
				item.quantity = Math.max(1, action.payload.quantity);
			}
			localStorage.setItem('cart', JSON.stringify(state));
		},
	},
});

export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
