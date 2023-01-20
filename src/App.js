import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPucara } from './redux/pucaraSlice';
import { RusLangItem } from './components/RusLangItem';

//=========================================================================================================================

const regex = new RegExp(/,/, 'ig')
const PORTION = 3;
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

	const qwe = React.useRef();

	const isMounted = React.useRef(false);


	const onClickShowMore = () => {
		setStartValue(prev => prev + PORTION);
		if (!(endValue + PORTION > arrayCodes.length)) {
			setEndValue(prev => prev + PORTION);
		} else {
			setEndValue(arrayCodes.length);
		}
	}

	React.useEffect(() => {
		if (isMounted.current === true) {
			dispatch(fetchPucara(stringCodes));
		}
		isMounted.current = true;
	}, [dispatch, stringCodes])

	const onClickTimes = () => {
		qwe.current = setInterval(onClickShowMore, 5000);
	}

	if (endValue === arrayCodes.length) {
		clearInterval(qwe.current);
	}

	// var sourceText = 'Malta BelgaStar 33 cl Bandeja x 24';
	// var sourceLang = 'es';
	// var targetLang = 'ru';

	// var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

	// const onClickLang = async () => {
	// 	var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
	// 	const { data } = await axios.get(url);
	// 	return data[0][0][0];
	// }



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
						<p className='itemTitle'>{obj.name}</p>
						<RusLangItem text={obj.name} idx={index} />
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
