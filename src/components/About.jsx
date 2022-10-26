import { useParams } from 'react-router-dom';
import '../style/About.css';
import { PeopleOutline, StarBorderOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const About = () => {
	const [db, setDB] = useState([]);
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
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
					.then((data) => setDB(data.items));
			});
		}
	}, []);

	const [review, setReview] = useState('');
	const { id } = useParams();
	const store = db.find((store) => store.id === id);
	return store ? (
		<div>
			<div
				className="banner"
				style={{
					backgroundImage: `url(${store.image_url})`,
				}}
			></div>
			<div className="details">
				<h2>{store.name}</h2>
				<p>{store.distance}</p>
				<div className="rating">
					{store.star}
					<StarBorderOutlined />
					<StarBorderOutlined />
					<StarBorderOutlined />
					<StarBorderOutlined />
					<StarBorderOutlined />
				</div>
				<h3>{store.price}</h3>
				<h2>รายละเอียด</h2>
				<p>{store.details}</p>
				<div className="tag">
					{store.tags.map((tag) => (
						<p key={tag}>{tag}</p>
					))}
				</div>
			</div>
			<div className="transportation">
				<IconButton className="transportation__icon">
					<h2>Walk</h2>
				</IconButton>
				<IconButton className="transportation__icon">
					<h2>ฺBeam</h2>
				</IconButton>
				<IconButton className="transportation__icon">
					<h2>Pop Bus</h2>
				</IconButton>
			</div>
			<div className="review">
				<h2>Review</h2>
				<div className="review__card">
					<div className="review__card__header">
						<PeopleOutline />
					</div>
					<div className="review__card__body">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
						laudantium ex deleniti iste fugiat neque suscipit veritatis
						voluptatem perferendis earum fuga officia, itaque nostrum quaerat
						eos quod. Excepturi, recusandae accusantium.
					</div>
				</div>
				<div className="review__card">
					<div className="review__card__header">
						<PeopleOutline />
					</div>
					<div className="review__card__body">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
						earum praesentium consequatur. Dolorem molestias provident, debitis
						magnam sed, commodi, nemo dolorum nisi est quidem aut perspiciatis.
						Similique distinctio sed perspiciatis.
					</div>
				</div>
				<input
					type="text"
					placeholder="add a review"
					value={review}
					onChange={(e) => setReview(e.target.value)}
				/>
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default About;
