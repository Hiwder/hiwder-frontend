import { Link, useNavigate, useParams } from 'react-router-dom';
import '../style/About.css';
import {
	ArrowBackIos,
	PeopleOutline,
	StarBorderOutlined,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const apiLink = 'https://hiwder-tazrzv72fq-as.a.run.app/';

const About = () => {
	const [db, setDB] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				fetch(apiLink + 'items-list', {
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

	const travel = (travelBy, dst, dstName) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				if (travelBy === 'walk') {
					const org = [
						position.coords.latitude,
						position.coords.longitude,
						'Your position',
						'WALK',
						id,
					];
					const orgStr = encodeURIComponent(JSON.stringify(org));
					const dstStr = encodeURIComponent(
						JSON.stringify([dst[0], dst[1], dstName]),
					);
					navigate('/map/' + orgStr + '/' + dstStr);
				} else {
					fetch(apiLink + 'beam', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							org: [position.coords.latitude, position.coords.longitude],
							dst: dst,
						}),
					})
						.then((response) => response.json())
						.then((data) => {
							if (
								data.BeamRoute.org.station_name !==
								data.BeamRoute.dst.station_name
							) {
								const orgName = data.BeamRoute.org.station_name;
								const orgLoc = data.BeamRoute.org.station_location;
								const dstName = data.BeamRoute.dst.station_name;
								const dstLoc = data.BeamRoute.dst.station_location;
								const org = [orgLoc[0], orgLoc[1], orgName, 'BEAM', id];
								const dst = [dstLoc[0], dstLoc[1], dstName];
								const orgStr = encodeURIComponent(JSON.stringify(org));
								const dstStr = encodeURIComponent(
									JSON.stringify([dst[0], dst[1], dstName]),
								);
								navigate('/map/' + orgStr + '/' + dstStr);
							}
						});
				}
			});
		}
	};

	return store ? (
		<div>
			<div
				className="banner"
				style={{
					backgroundImage: `url(${store.image_url})`,
				}}
			>
				<Link to="/">
					<IconButton
						style={{
							position: 'absolute',
							top: '2rem',
							left: '2rem',
							color: 'white',
						}}
					>
						<ArrowBackIos />
					</IconButton>
				</Link>
			</div>
			<div className="details">
				<p className="StoreName">{store.name}</p>
				<p className="StorePrice">{store.price} THB</p>
				<p className="StoreDistance">{store.distance} kilometer</p>
				<div className="rating">
					{/* <p>{store.star}</p> */}
					<StarBorderOutlined />
					<StarBorderOutlined />
					<StarBorderOutlined />
					<StarBorderOutlined />
					<StarBorderOutlined />
				</div>
				<p className="Detail">Details</p>
				<p className="StoreDetail">{store.details}</p>
				<div className="tags">
					{store.tags.map((tag) => (
						<p className="tag" key={tag}>
							{tag}
						</p>
					))}
				</div>
				<div className="transportation">
					<IconButton
						className="transportation__icon"
						id="left"
						onClick={() => travel('walk', store.location, store.name)}
					>
						<p className="transportation__type">Walk</p>
					</IconButton>
					<IconButton
						className="transportation__icon"
						id="middle"
						onClick={() => travel('beam', store.location, store.name)}
					>
						<p className="transportation__type">Beam</p>
					</IconButton>
					<IconButton
						className="transportation__icon"
						id="right"
						onClick={() => {}}
					>
						<p className="transportation__type">Pop Bus</p>
					</IconButton>
				</div>
				<div className="review">
					<div className="reviewfirstline">
						<p>Review </p>
						<ArrowDropDownIcon></ArrowDropDownIcon>
					</div>
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
							earum praesentium consequatur. Dolorem molestias provident,
							debitis magnam sed, commodi, nemo dolorum nisi est quidem aut
							perspiciatis. Similique distinctio sed perspiciatis.
						</div>
					</div>
					<input
						className="addareview"
						type="text"
						placeholder="add a review"
						value={review}
						onChange={(e) => setReview(e.target.value)}
					/>
				</div>
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default About;
