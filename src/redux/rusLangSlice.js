import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//=========================================================================================================================

export const fetchRusLang = createAsyncThunk(
	'pucara/fetchRusLang',
	async (params) => {
		const { data } = await axios.get('https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=ru&dt=t&q=' + encodeURI(params));
		return data[0][0][0];

	}
)

const initialState = {
	resultLang: [],
	status: ''
}

export const rusLangSlice = createSlice({
	name: 'lang',
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRusLang.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(fetchRusLang.fulfilled, (state, action) => {
			state.resultLang.push(action.payload);
			state.status = 'success';
		});
		builder.addCase(fetchRusLang.rejected, (state) => {
			state.status = 'error';
			state.resultLang.push('error');

		});
	},
})

export default rusLangSlice.reducer