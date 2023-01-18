import { createSlice } from '@reduxjs/toolkit';
import { fetchPucara } from './asyncActions';
//=========================================================================================================================

const initialState = {
	items: [],
	status: ''
}

export const pucaraSlice = createSlice({
	name: 'pucara',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPucara.pending, (state) => {
			state.status = 'loading';
			state.items = initialState.items;
		});
		builder.addCase(fetchPucara.fulfilled, (state, action) => {
			const arr = action.payload.products;
			arr.forEach((item, index) => {
				state.items.push(item);
			});
			state.status = 'success';
		});
		builder.addCase(fetchPucara.rejected, (state) => {
			state.status = 'error';
			state.items = initialState.items;
		});
	},
})


export default pucaraSlice.reducer