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

				const strokeInitial = item.canonical_url?.slice(29);
				let lastSimbol;
				for (let i = 0; i < strokeInitial.length; i++) {
					if (strokeInitial[i] === '/') {
						lastSimbol = i;
					}
				}

				const categoryInitial = strokeInitial.slice(0, lastSimbol);
				let category;
				switch (categoryInitial) {
					case "refrescos-sodas":
					case "jugos":
					case "agua":
					case "mixers":
						category = 'drinks';
						break;
					case "vinos":
					case "cervezas":
					case "champagnes":
					case "espumosos":
					case "ron":
					case "destilados":
						category = 'alcohol';
						break;
					case "automotriz":
					case "cigarrillos":
					case "ofimatica":
					case "piensos-y-alimentos":
					case "articulos":
						category = 'different';
						break;
					case "mobiliario":
					case "industrial":
					case "electrodomesticos":
					case "jardin-y-terrazas":
					case "limpieza":
					case "estuches-y-cestas":
					case "accesorios":
						category = 'house';
						break;
					case "personal":
					case "cosmetica":
						category = 'hygiene';
						break;
					case "carnicos":
					case "conformados":
					case "pescados-mariscos":
					case "dulces-y-panes":
					case "vegetales-y-papas":
					case "helados":
						category = 'freeze';
						break;
					case "encurtidos":
					case "carnicas":
					case "frutas":
					case "vegetales":
						category = 'conserve';
						break;
					case "cristaleria":
					case "cuberteria":
					case "vajilla":
					case "desechables":
					case "menaje-cocina":
					case "pasteleria-y-horneado":
					case "utensilios":
					case "horneado-y-pasteleria":
						category = 'kitchen';
						break;

					case "aceites-y-vinagres":
					case "cafe-e-infusiones":
					case "cereales-desayuno":
					case "especias-y-condimentos":
					case "pastas-arroz-y-legumbres":
					case "harinas-mezclas":
					case "salsas":
					case "quesnackssos":
					case "embutidos":
					case "mantequillasmargarinas":
					case "leches-y-cremas":
					case "quesos":
					case "postres-lacteos":
					case "snacks":
						category = 'products';
						break;
					case "chocolates":
					case "galletas-y-bizcochos":
					case "caramelos":
					case "turrones":
						category = 'sweet';
						break;

					default:
						category = 'different';
						break;
				}


				const obj = {
					name: item.name || 'Ошибка загрузки',
					price: item.price || 'Ошибка загрузки',
					reference: item.reference || 'Ошибка загрузки',
					imageUrl: item.cover?.medium?.url || item.cover?.small?.url || 'Ошибка загрузки',
					category: category,
					subCategory: categoryInitial
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