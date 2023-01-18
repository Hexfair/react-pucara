import { configureStore } from '@reduxjs/toolkit';
import pucara from "./pucaraSlice";
//=========================================================================================================================

const store = configureStore({
	reducer: {
		pucara
	},
})

export default store