import React from 'react';
import axios from 'axios';
import './RusLangItem.scss'
//=========================================================================================================================

export const RusLangItem = ({ text }) => {
	const [lang, setLang] = React.useState('')

	React.useEffect(() => {
		const fetchlang = async () => {
			const { data } = await axios.get('https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=ru&dt=t&q=' + encodeURI(text));
			setLang(data[0][0][0]);
		}
		fetchlang();
	}, [text]);

	return (
		<p className='translate'>{lang && lang}</p>
	)
}
