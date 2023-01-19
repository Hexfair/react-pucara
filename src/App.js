import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPucara } from './redux/pucaraSlice';
//=========================================================================================================================

const regex = new RegExp(/,/, 'ig')
const PORTION = 20;
//=========================================================================================================================

function App() {
	const dispatch = useDispatch();
	const items = useSelector(state => state.pucara.items)

	// Логика получения данных из текстареа
	const [codes, setCodes] = React.useState('')
	const onChangeTextArea = (event) => setCodes(event.target.value);
	const arrayCodes = codes.replace(regex, '.').split('\n')

	// Логика получения порций
	const [startValue, setStartValue] = React.useState(0);
	const [endValue, setEndValue] = React.useState(PORTION);
	let arrayCodesSlice = arrayCodes.slice(startValue, endValue);
	let stringCodes = arrayCodesSlice.join(',');

	const onClickShowMore = () => {
		dispatch(fetchPucara(stringCodes))
		setStartValue(prev => prev + PORTION);
		if (!(endValue + PORTION > arrayCodes.length)) {
			setEndValue(prev => prev + PORTION);
		} else {
			setEndValue(arrayCodes.length);
		}
	}

	const onClickTimes = () => {
		let timeId = setInterval(onClickShowMore, 5000);
		if (endValue === arrayCodes.length) {
			clearInterval(timeId);
		}
	}

	return (
		<div className='app'>
			<textarea
				className='textarea'
				placeholder='Вставьте список артикулов...'
				value={codes}
				onChange={onChangeTextArea}>
			</textarea>
			<div className='content'>
				{items && items.map((obj) =>
					<div key={obj.reference} className='itemBlock'>
						<div className='itemImage'>
							<img src={obj.imageUrl} alt='Ошибка загрузки изображения' />
						</div>
						<p className='itemTitle'>{obj.name}</p>
						<div className='itemBottom'>
							<span className='itemReference'>{obj.reference}</span>
							<span className='itemPrice'>{obj.price}</span>
						</div>
					</div>)}
			</div>
			<div className='button'>
				<button className="btn" onClick={onClickShowMore}>Загрузить/показать еще</button>
				<button className="btn" onClick={onClickTimes}>Циклический поиск</button>

			</div>

		</div>
	);
}

export default App;
