import { useParams } from 'react-router-dom';
import '../style/About.css';
import jsonData from '../sample_database.json';
import { PeopleOutline, StarBorderOutlined } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
				<p className='StoreName'>{store.name}</p>
				<p className='StorePrice'>{store.price} THB</p>
				<p className='StoreDistance'>{store.distance} meter</p>
				<div className="rating">
					{/* <p>{store.star}</p> */}
					<StarBorderOutlined />
					<StarBorderOutlined />
					<StarBorderOutlined />
					<StarBorderOutlined />
					<StarBorderOutlined />
				</div>
				<p className='Detail'>Details</p>
				<p className='StoreDetail'>{store.details}</p>
				<div className="tags">
					{store.tags.map((tag) => (
						<p className='tag' key={tag}>{tag}</p>
					))}
				</div>
				<div className="transportation">
					<IconButton className="transportation__icon">
						<p>Feet</p>
					</IconButton>
					<IconButton className="transportation__icon" id='middle'>
						<p>Scooter</p>
					</IconButton>
					<IconButton className="transportation__icon">
						<p>bike</p>
					</IconButton>
				</div>
				<div className="review">
					<div className='reviewfirstline'><p>Review	</p><ArrowDropDownIcon></ArrowDropDownIcon></div>
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
						className='addareview'
						type="text"
						placeholder="add a review"
						value={review}
						onChange={(e) => setReview(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
