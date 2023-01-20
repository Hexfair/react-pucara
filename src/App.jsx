import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPucara } from './redux/pucaraSlice';
import { RusLangItem } from './RusLangItem';
//=========================================================================================================================

const regex = new RegExp(/,/, 'ig');
const PORTION = 3;

//=========================================================================================================================

function App() {
	const dispatch = useDispatch();
	const items = useSelector(state => state.pucara.items);
	const isMounted = React.useRef(false);
	const isTextareaChanged = React.useRef(false);

	// Логика получения данных из текстареа
	const [codes, setCodes] = React.useState('');
	const onChangeTextArea = (event) => setCodes(event.target.value);
	const arrayCodes = codes.replace(regex, '.').split('\n');

	// Логика получения порций
	const [startValue, setStartValue] = React.useState(0);
	const [endValue, setEndValue] = React.useState(0);
	let arrayCodesSlice = arrayCodes.slice(startValue, endValue);
	let stringCodes = arrayCodesSlice.join(',');

	const timerId = React.useRef();
	const finishValue = React.useRef(0);

	const onClickShowMore = () => {
		if (isTextareaChanged.current === true) {
			if ((endValue + PORTION) <= arrayCodes.length) {
				setStartValue(prev => prev + PORTION);
				setEndValue(prev => prev + PORTION);
				finishValue.current = finishValue.current + PORTION;
			} else {
				setEndValue(arrayCodes.length + 1);
				finishValue.current = arrayCodes.length + 1;
			};
		} else {
			setStartValue(0);
			setEndValue(PORTION);
			dispatch(fetchPucara(stringCodes));
			finishValue.current = PORTION;
			isTextareaChanged.current = true;
		};
	};

	React.useEffect(() => {
		if (isMounted.current === true && isTextareaChanged.current === true) {
			dispatch(fetchPucara(stringCodes));
		};
		isMounted.current = true;
	}, [dispatch, stringCodes]);

	const onClickTimes = () => {
		timerId.current = setInterval(onClickShowMore, 10000);
	};

	if (finishValue.current === arrayCodes.length + 1) {
		clearInterval(timerId.current);
		alert('Парсинг завершен!');
	};

	return (
		<div className='app'>
			<textarea
				className='textarea'
				placeholder='Вставьте список артикулов...'
				value={codes}
				onChange={onChangeTextArea}>
			</textarea>
			<div className='content'>
				{items && items.map((obj, index) =>
					<div key={obj.reference} className='itemBlock'>
						<div className='itemImage'>
							<img src={obj.imageUrl} alt='Ошибка загрузки изображения' />
						</div>
						<div className='itemLabel'>
							<p className='itemTitle'>{obj.name}</p>
							<RusLangItem text={obj.name} />
						</div>
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
