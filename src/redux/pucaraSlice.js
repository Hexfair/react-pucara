import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//=========================================================================================================================

export const fetchPucara = createAsyncThunk(
	'pucara/fetchPucara',
	async (params) => {
		const { data } = await axios.get('https://tienda.pucara.net/es/busqueda?controller=search&s=' + params);
		return data;
	}
);

const initialState = {
	arrayCodes: [],
	items: [],
	itemsRef: [],
	status: ''
};

export const pucaraSlice = createSlice({
	name: 'pucara',
	initialState,
	reducers: {
		setArrayCodes: (state, action) => {
			state.arrayCodes = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPucara.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(fetchPucara.fulfilled, (state, action) => {
			const arr = action.payload.products;
			arr.forEach((item) => {
				const obj = {
					name: item.name || 'Ошибка загрузки',
					price: item.price || 'Ошибка загрузки',
					reference: item.reference || 'Ошибка загрузки',
					imageUrl: item.cover?.medium?.url || item.cover?.small?.url || 'Ошибка загрузки'
				}

				if (!state.itemsRef.includes(item.reference)) {
					state.items.push(obj);
					state.itemsRef.push(item.reference);
				}
			});
			state.status = 'success';
		});
		builder.addCase(fetchPucara.rejected, (state) => {
			state.status = 'error';
			state.items = initialState.items;
		});
	},
});
export const { setArrayCodes } = pucaraSlice.actions;
export default pucaraSlice.reducer;