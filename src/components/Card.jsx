import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../style/Card.css';

const db = [
	{
		name: 'McDonald',
		place: 'ดาวพลูโต',
		distance: '5.1795 ล้านล้านกิโลเมตร',
		url: './img/macdonald.jpg',
	},
	{
		name: 'KFC',
		place: 'เชียงใหม่',
		distance: 'ไม่ถึง 100 เมตร',
		url: './img/kfc.jpg',
	},
	{
		name: 'Pizza Company',
		place: 'โรงอาหารวิศวะฯ',
		distance: '200 เมตร',
		url: './img/pizza_company.jpg',
	},
];

function Card() {
	const [currentIndex, setCurrentIndex] = useState(db.length - 1);
	const [lastDirection, setLastDirection] = useState();
	// used for outOfFrame closure
	const currentIndexRef = useRef(currentIndex);

	const childRefs = useMemo(
		() =>
			Array(db.length)
				.fill(0)
				.map((i) => React.createRef()),
		[],
	);

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val);
		currentIndexRef.current = val;
	};

	const canSwipe = currentIndex >= 0;

	// set last direction and decrease current index
	const swiped = (direction, swipedName, index) => {
		setLastDirection(direction);
		updateCurrentIndex(index - 1);
	};

	const swipe = async (dir) => {
		if (canSwipe && currentIndex < db.length) {
			await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
		}
	};

	return (
		<div>
			<div className="cardContainer">
				{db.map((store, index) => (
					<TinderCard
						ref={childRefs[index]}
						className="swipe"
						key={store.name}
						onSwipe={(dir) => swiped(dir, store.name, index)}
						preventSwipe={['up', 'down']}
					>
						<div
							style={{ backgroundImage: 'url(' + store.url + ')' }}
							className="card"
						>
							<h3>{store.name}</h3>
							<p>{store.place}</p>
							<p>{store.distance}</p>
						</div>
					</TinderCard>
				))}
			</div>
			<div className="buttons">
				<IconButton
					onClick={() => swipe('left')}
					style={{
						border: '2px solid #FF5E51',
						borderRadius: '100%',
						color: '#FF5E51',
						width: '4rem',
						height: '4rem',
						padding: '1.25rem',
					}}
				>
					<CloseIcon fontSize="large" />
				</IconButton>
				<IconButton
					style={{
						border: '2px solid #07A6FF',
						borderRadius: '100%',
						color: '#07A6FF',
						width: '2.5rem',
						height: '2.5rem',
						padding: '0.8rem',
					}}
				>
					<StarIcon fontSize="medium" />
				</IconButton>
				<IconButton
					onClick={() => swipe('right')}
					style={{
						border: '2px solid #00D387',
						borderRadius: '100%',
						color: '#00D387',
						width: '4rem',
						height: '4rem',
						padding: '1.25rem',
					}}
				>
					<FavoriteIcon fontSize="large" />
				</IconButton>
			</div>
		</div>
	);
}

export default Card;
