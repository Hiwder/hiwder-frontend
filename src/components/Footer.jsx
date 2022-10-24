import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import '../style/Footer.css';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer__icon">
				<Link to="/">
					<IconButton>
						<HomeOutlinedIcon fontSize="large" />
					</IconButton>
				</Link>
			</div>
			<div className="footer__icon">
				<Link to="/explore">
					<IconButton>
						<SearchOutlinedIcon fontSize="large" />
					</IconButton>
				</Link>
			</div>
			<div className="footer__icon">
				<Link to="/bookmark">
					<IconButton>
						<BookmarkBorderOutlinedIcon fontSize="large" />
					</IconButton>
				</Link>
			</div>
			<div className="footer__icon">
				<Link to="/profile">
					<IconButton>
						<PermIdentityOutlinedIcon fontSize="large" />
					</IconButton>
				</Link>
			</div>
		</div>
	);
};

export default Footer;
