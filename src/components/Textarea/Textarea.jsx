import React from 'react';
import './Textarea.scss'
import { setArrayCodes } from '../../redux/pucaraSlice';
import { useDispatch } from 'react-redux';
//=========================================================================================================================
const regex = new RegExp(/,/, 'ig');
//=========================================================================================================================

export const Textarea = () => {
	const dispatch = useDispatch();
	const [codes, setCodes] = React.useState('');
	const onChangeTextArea = (event) => {
		setCodes(event.target.value);
		const arrayCodes = event.target.value.replace(regex, '.').split('\n');
		dispatch(setArrayCodes(arrayCodes));
	}
	return (
		<textarea
			className='textarea'
			placeholder='Вставьте список артикулов...'
			value={codes}
			onChange={onChangeTextArea}>
		</textarea>
	)
}
