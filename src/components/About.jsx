import { useParams } from 'react-router-dom';
import '../style/About.css';
import jsonData from '../sample_database.json';
import { PeopleOutline, StarBorderOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';

const db = jsonData.store;

const About = () => {
	const [review, setReview] = useState('');
	const { id } = useParams();

	const store = db.find((store) => store.id === id);

	return (
		<div>
			<div
				className="banner"
				style={{
					backgroundImage: `url(.${store.image_url})`,
				}}
			>
				<h1>About</h1>
			</div>
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
					<h2>Feet</h2>
				</IconButton>
				<IconButton className="transportation__icon">
					<h2>Scooter</h2>
				</IconButton>
				<IconButton className="transportation__icon">
					<h2>bike</h2>
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
	);
};

export default About;
