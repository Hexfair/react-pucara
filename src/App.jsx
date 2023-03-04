import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPucara } from './redux/pucaraSlice';
import { RusLangItem } from './components/RusLangItem/RusLangItem';
import noImage from './assets/no-image.png';
import { Textarea } from './components/Textarea/Textarea';
//=========================================================================================================================

const PORTION = 4;
const TIME = 15000;

//=========================================================================================================================

function App() {
	const dispatch = useDispatch();
	const { items, arrayCodes } = useSelector(state => state.pucara);

	const timerId = React.useRef();
	const startValue = React.useRef(0);

	const onClickShowMore = () => {
		if ((startValue.current + PORTION + PORTION) <= arrayCodes.length) {
			const stringCodes = arrayCodes && arrayCodes.slice(startValue.current, startValue.current + PORTION).join(',');
			dispatch(fetchPucara(stringCodes));
			startValue.current = startValue.current + PORTION;
		} else {
			const stringCodes = arrayCodes && arrayCodes.slice(startValue.current, arrayCodes.length + 1).join(',');
			dispatch(fetchPucara(stringCodes));
			clearInterval(timerId.current);
			alert('Парсинг завершен!');
		}
	}

	const onClickTimes = () => {
		timerId.current = setInterval(onClickShowMore, TIME);
	};


	return (
		<div className='app'>
			<div className='top'>
				<span className='label'>Created by Denis P.</span>
				<Textarea />
			</div>

			<div className='content'>
				{items && items.map((item) =>
					<div key={item.reference} className='itemBlock'>
						<div className='itemImage'>
							{item.imageUrl !== 'Ошибка загрузки'
								? <img src={item.imageUrl} alt='Ошибка загрузки изображения' />
								: <img src={noImage} alt={item.name} className='noImage' />}
						</div>
						<div className='itemLabel'>
							<p className='itemTitle'>{item.name}</p>
							<RusLangItem text={item.name} />
						</div>
						<div className='itemBottom'>
							<span className='itemReference'>{item.reference}</span>
							<span className='itemPrice'>{item.price}</span>
						</div>
					</div>)}
			</div>

			<div className='buttons'>
				<button className="btn" onClick={onClickShowMore}>Загрузить/показать еще</button>
				<button className="btn" onClick={onClickTimes}>Циклический поиск</button>

			</div>
		</div>
	);
}

export default App;
