import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//=========================================================================================================================

export const fetchPucara = createAsyncThunk(
	'pucara/fetchPucara',
	async (params) => {
		const { data } = await axios.get('https://tienda.pucara.net/es/busqueda?controller=search&s=' + params);


		//console.log(newArray);

		// const text = data.products[0].name;
		// let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=ru&dt=t&q=' + encodeURI(text);
		// const translate = await axios.get(url);

		// const result = { ...data, data.products[0]: translate.data[0][0][0] }
		// console.log(result);
		// return data[0][0][0];


		//console.log(data);

		return data;
	}
)

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
		});
		builder.addCase(fetchPucara.fulfilled, (state, action) => {
			const arr = action.payload.products;
			arr.forEach((item) => {
				const obj = {
					name: item.name,
					price: item.price,
					reference: item.reference,
					imageUrl: item.cover.medium.url || item.cover.small.url
				}
				state.items.push(obj);
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