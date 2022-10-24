import { IconButton } from '@material-ui/core';
import ArrowsBackIosIcon from '@material-ui/icons/ArrowBackIos';
import '../style/Explore.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Explore = () => {
	const [search, setSearch] = useState('');

	return (
		<div>
			<div className="container">
				<div className="header">
					<Link to="/">
						<IconButton>
							<ArrowsBackIosIcon fontSize="medium" />
						</IconButton>
					</Link>
					<input
						type="text"
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Explore;
