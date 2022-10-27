import { IconButton } from '@material-ui/core';
import ArrowsBackIosIcon from '@material-ui/icons/ArrowBackIos';
import '../style/Explore.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const apiLink='https://hiwder-tazrzv72fq-as.a.run.app/'

const Explore = () => {
	const [search, setSearch] = useState('');
	const [nearDB, setnearDB]=useState([]);
	const [nearYou, setNearYou]=useState([]);
	const navigate=useNavigate();
	useEffect(()=>{
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				fetch(apiLink+'/near-you', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						location: [position.coords.latitude, position.coords.longitude],
						radius: 3.5
					}),
				})
				.then((response) => response.json())
				.then((data) => setnearDB(data.items));
			});
		}
	}, [])
	useEffect(()=>{
		if(nearDB.length>0){
			var temp=nearDB.slice(0)
			var stores=[]
			for(let i=0; i<4; ++i) {
				var idx=Math.floor(Math.random()*temp.length);
				var item = temp[idx];
				temp.splice(idx, 1)
				stores.push(item)
			}
			setNearYou(stores)
		}
	}, [nearDB])
	return nearYou.length===4 ? (
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
					onKeyDown={(e)=> {
						if(e.key==="Enter") {
							navigate('/search/'+search)
						}
					}}
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
					<p>{nearYou[0].name}</p>
					<img src={nearYou[0].image_url} alt="" />
				</div>
				<div
					className="shop"
					style={{
						gridArea: 'menu2',
					}}
				>
					<p>{nearYou[1].name}</p>
					<img src={nearYou[1].image_url} alt="" />
				</div>
				<div
					className="shop"
					style={{
						gridArea: 'menu3',
					}}
				>
					<p>{nearYou[2].name}</p>
					<img src={nearYou[2].image_url} alt="" />
				</div>
				<div
					className="shop"
					style={{
						gridArea: 'menu4',
					}}
				>
					<p>{nearYou[3].name}</p>
					<img src={nearYou[3].image_url} alt="" />
				</div>
			</div>
		</div>
	):<div></div>;
};

export default Explore;
