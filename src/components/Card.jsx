import React, { useState, useEffect, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { IconButton } from '@material-ui/core';
import '../style/Card.css';
import { useNavigate } from 'react-router-dom';

const Card = () => {
	const [db, setDB] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				fetch('https://hiwder-tazrzv72fq-as.a.run.app/items-list', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						location: [position.coords.latitude, position.coords.longitude],
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						setDB(data.items);
						setCurrentIndex(data.items.length - 1);
					});
			});
		}
	}, []);
	// eslint-disable-next-line
	const [lastDirection, setLastDirection] = useState();
	const navigate = useNavigate();
	// used for outOfFrame closure
	const currentIndexRef = useRef(currentIndex);

	const childRefs = useMemo(
		() =>
			Array(db.length)
				.fill(0)
				.map((_) => React.createRef()),
		[db],
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

	let mousePosX = 0;
	let mousePosY = 0;

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
							onMouseDown={(e) => {
								mousePosX = e.clientX;
								mousePosY = e.clientY;
							}}
							onMouseUp={(e) => {
								if (
									Math.abs(e.clientX - mousePosX) < 10 &&
									Math.abs(e.clientY - mousePosY) < 10
								) {
									swipe('up');
								}
							}}
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
