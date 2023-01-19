import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRusLang } from '../redux/rusLangSlice';
import axios from 'axios';

export const RusLangItem = ({ text, idx }) => {
	const dispatch = useDispatch();
	//const resultLang = useSelector(state => state.language.resultLang)
	const [lang, setLang] = React.useState('')

	React.useEffect(() => {
		const fetchlang = async () => {
			const { data } = await axios.get('https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=ru&dt=t&q=' + encodeURI(text));
			setLang(data[0][0][0]);
		}
		fetchlang();
	}, []);

	return (
		<p className='translate'>{lang && lang}</p>
	)
}
