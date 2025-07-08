import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, signIn, signUp } from '../../../shared/api/authApi';

interface SessionState {
	user: any | null;
	loading: boolean;
	error: string | null;
}

const initialState: SessionState = {
	user: null,
	loading: false,
	error: null,
};

export const fetchSession = createAsyncThunk('session/fetch', async () => {
	const user = await getUser();
	return user;
});

export const loginThunk = createAsyncThunk(
	'session/login',
	async (
		{ email, password }: { email: string; password: string },
		thunkAPI
	) => {
		try {
			const res = await signIn(email, password);
			return res.user;
		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

export const registerThunk = createAsyncThunk(
	'session/register',
	async (
		{ email, password }: { email: string; password: string },
		thunkAPI
	) => {
		try {
			const res = await signUp(email, password);
			return res.user;
		} catch (err: any) {
			return thunkAPI.rejectWithValue(err.message);
		}
	}
);

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		logout: state => {
			state.user = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchSession.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.user = action.payload;
				state.error = null;
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.error = action.payload as string;
			})
			.addCase(registerThunk.rejected, (state, action) => {
				state.error = action.payload as string;
			});
	},
});

export const { logout } = sessionSlice.actions;
export default sessionSlice.reducer;
