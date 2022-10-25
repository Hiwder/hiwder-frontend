import { IconButton } from '@material-ui/core';
import '../style/Bookmark.css';
import { Link } from 'react-router-dom';

const Bookmark = () => {
	return (
		<div>
			<div className="header">
				<Link to="/">
					<IconButton>
						<img src="./img/backbutton.png" alt="" />
					</IconButton>
				</Link>
				<p>saved</p>
				<Link to="/">
					<IconButton>
						<img src="./img/plusbutton.png" alt="" />
					</IconButton>
				</Link>
			</div>
			<div className="groups">
				<div className="group" style={{ gridArea: 'group1' }}>
					<img src="./img/Allposts.png" alt="" />
					<p>All Posts</p>
				</div>
				<div className="group" style={{ gridArea: 'group2' }}>
					<img src="./img/Thaifood.png" alt="" />
					<p>🇹🇭 Thai Food</p>
				</div>
				<div className="group" style={{ gridArea: 'group3' }}>
					<img src="./img/Steak.png" alt="" />
					<p>🥩 Steak</p>
				</div>
				<div className="group" style={{ gridArea: 'group4' }}>
					<img src="./img/Dessert.png" alt="" />
					<p>🍨 Dessert</p>
				</div>
			</div>
		</div>
	);
};
export default Bookmark;
