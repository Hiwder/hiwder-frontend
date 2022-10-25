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
	// eslint-disable-next-line
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
	const swiped = (direction, swipedID, index) => {
		setLastDirection(direction);
		updateCurrentIndex(index - 1);
		if (direction === 'up') {
			navigate('/about/' + swipedID);
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
						onSwipe={(dir) => swiped(dir, store.id, index)}
						preventSwipe={['down']}
					>
						<div
							style={{ backgroundImage: 'url(' + store.image_url + ')' }}
							className="card"
						>
							<h3>{store.name}</h3>
							<p>{store.place}</p>
							<p>{store.distance} กิโลเมตร</p>
						</div>
					</TinderCard>
				))}
			</div>
			<div className="buttons">
				<IconButton onClick={() => swipe('left')}>
					<img src="./img/closeIcon.png" alt="" />
				</IconButton>
				<IconButton onClick={() => swipe('right')}>
					<img src="./img/favIcon.png" alt="" />
				</IconButton>
			</div>
		</div>
	);
};

export default Card;
