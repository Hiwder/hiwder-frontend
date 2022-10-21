import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { IconButton } from '@material-ui/core';
import '../style/Card.css';
import { useNavigate } from 'react-router-dom';
import jsonData from '../sample_database.json';

// import db from json
const db = jsonData.store;

const Card = () => {
	const [currentIndex, setCurrentIndex] = useState(db.length - 1);
	const [lastDirection, setLastDirection] = useState();
	const navigate = useNavigate();
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
		if (direction === 'up') {
			console.log('swiped up');
			navigate('/about/' + swipedName);
		}
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
						preventSwipe={['down']}
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
				<IconButton onClick={() => swipe('left')}>
					<img src="./img/closeIcon.png" />
				</IconButton>
				<IconButton onClick={() => swipe('right')}>
					<img src="./img/favIcon.png" />
				</IconButton>
			</div>
		</div>
	);
};

export default Card;
