import { configureStore } from '@reduxjs/toolkit';
import pucara from "./pucaraSlice";
import language from './rusLangSlice';
//=========================================================================================================================

const store = configureStore({
	reducer: {
		pucara,
		language,
	},
})

export default store