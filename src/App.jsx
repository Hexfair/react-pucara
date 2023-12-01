import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPucara } from './redux/pucaraSlice';
import { RusLangItem } from './components/RusLangItem/RusLangItem';
import noImage from './assets/no-image.png';
import { Textarea } from './components/Textarea/Textarea';
//=========================================================================================================================

const PORTION = 10;
const TIME = 20000;

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

	function scrollToUp() {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	};

	function show(category) {
		const allItems = document.querySelectorAll('.itemBlock');
		const checkedItems = document.querySelectorAll(`[data-item=${category}]`);

		if (category !== 'all') {
			for (let i = 0; i < allItems.length; i++) {
				allItems[i].style.display = "none";
			};
			for (let i = 0; i < checkedItems.length; i++) {
				checkedItems[i].style.display = "flex";
			};
		} else {
			for (let i = 0; i < allItems.length; i++) {
				allItems[i].style.display = "flex"
			}
		}
	};

	/*
	<button class="categoryButton" onclick='show("all")'>ВСЕ</button>
	<button class="categoryButton" onclick='show("drinks")'>Напитки</button>
	<button class="categoryButton" onclick='show("alcohol")'>Алкоголь</button>
	<button class="categoryButton" onclick='show("products")'>Продукты</button>
	<button class="categoryButton" onclick='show("freeze")'>Заморозка</button>
	<button class="categoryButton" onclick='show("conserve")'>Консервы</button>
	<button class="categoryButton" onclick='show("sweet")'>Сладкое</button>
	<button class="categoryButton" onclick='show("hygiene")'>Гигиена</button>
	<button class="categoryButton" onclick='show("house")'>Для дома</button>
	<button class="categoryButton" onclick='show("kitchen")'>Кухня</button>
	<button class="categoryButton" onclick='show("different")'>Разное</button>
	*/

	/*
	<div class='buttons'>
		<button class="btn" onclick={onClickShowMore}>Загрузить/показать еще</button>
		<button class="btn" onclick={onClickTimes}>Циклический поиск</button>
	</div>
	*/

	/*
	<button class="scrollUp" onclick={scrollToUp}>
		<svg width="20" height="20" viewBox="0 -0.15 13.1 13.1" xmlns="http://www.w3.org/2000/svg">
			<path d="m11.5 8.025-.85.85L6.55 4.8l-4.1 4.075-.85-.85 4.95-4.9 4.95 4.9Z" />
		</svg>
	</button>
	*/

	return (
		<div className='app'>
			<div className='top'>
				<span className='label'>Created by Denis P.</span>
				<Textarea />
			</div>

			<button className="categoryButton" onClick={() => show("all")}>ВСЕ</button>
			<button className="categoryButton" onClick={() => show("drinks")}>Напитки</button>
			<button className="categoryButton" onClick={() => show("alcohol")}>Алкоголь</button>
			<button className="categoryButton" onClick={() => show("products")}>Продукты</button>
			<button className="categoryButton" onClick={() => show("freeze")}>Заморозка</button>
			<button className="categoryButton" onClick={() => show("conserve")}>Консервы</button>
			<button className="categoryButton" onClick={() => show("sweet")}>Сладкое</button>
			<button className="categoryButton" onClick={() => show("hygiene")}>Гигиена</button>
			<button className="categoryButton" onClick={() => show("house")}>Для дома</button>
			<button className="categoryButton" onClick={() => show("kitchen")}>Кухня</button>
			<button className="categoryButton" onClick={() => show("different")}>Разное</button>

			<div className='content'>
				{items && items.map((item) =>
					<div
						key={item.reference}
						className='itemBlock'
						data-item={item.category}
					>
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

			<button className="scrollUp" onClick={scrollToUp}>
				<svg width="20" height="20" viewBox="0 -0.15 13.1 13.1" xmlns="http://www.w3.org/2000/svg">
					<path d="m11.5 8.025-.85.85L6.55 4.8l-4.1 4.075-.85-.85 4.95-4.9 4.95 4.9Z" />
				</svg>
			</button>

		</div >
	);
}

export default App;
