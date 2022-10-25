import { IconButton } from '@material-ui/core';
import ArrowsBackIosIcon from '@material-ui/icons/ArrowBackIos';
import '../style/Explore.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Explore = () => {
	const [search, setSearch] = useState('');

	return (
		<div>
			<div className="header">
				<Link to="/">
					<IconButton>
						<ArrowsBackIosIcon fontSize="medium" />
					</IconButton>
				</Link>
				<input
					className="searchbar"
					type="text"
					placeholder="Search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</div>
			<div className="categories">
				<div className="category">
					<p>Thai Food</p>
					<img src="./img/category1.png" alt="" />
				</div>
				<div className="category">
					<p>Dessert</p>
					<img src="./img/category2.png" alt="" />
				</div>
				<div className="category">
					<p>Steak</p>
					<img src="./img/category3.png" alt="" />
				</div>
			</div>
			<div className="nearyou">
				<p style={{ gridArea: 'header' }}>near you</p>
				<div
					className="shop"
					style={{
						gridArea: 'menu1',
					}}
				>
					<p>ร้านป้าเบลอ</p>
					<img src="./img/nearyou1.png" alt="" />
				</div>
				<div
					className="shop"
					style={{
						gridArea: 'menu2',
					}}
				>
					<p>ลุงเหนอ ก๋วยเตี๋ยวทรงเครื่อง</p>
					<img src="./img/nearyou2.png" alt="" />
				</div>
				<div
					className="shop"
					style={{
						gridArea: 'menu3',
					}}
				>
					<p>café amazon</p>
					<img src="./img/nearyou3.png" alt="" />
				</div>
				<div
					className="shop"
					style={{
						gridArea: 'menu4',
					}}
				>
					<p>Inthanin Coffee</p>
					<img src="./img/nearyou4.png" alt="" />
				</div>
			</div>
		</div>
	);
};

export default Explore;
