import './App.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPucara } from './redux/asyncActions';


function App() {
	const dispatch = useDispatch();
	const items = useSelector(state => state.pucara.items)

	const [text, setText] = React.useState('')

	React.useEffect(() => {
		dispatch(fetchPucara('BVEES830006,HDEES113.57'))
	}, [dispatch])


	const parsTextArea = () => {

	}


	return (
		<div className="App">
			<button className="btn" onClick={parsTextArea}></button>
			<textarea></textarea>
			{/* <div >{value.image}</div>
				<div >{value.price}</div>

				<div >{value.name}</div> */}
			{/* <div>{items && JSON.stringify(items[0].cover.small.url)}</div>
			<img src={items && items.products[0].cover.small.url} alt='' /> */}
		</div>
	);
}

export default App;
