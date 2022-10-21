import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import '../style/Footer.css';

const Footer = () => {
	return (
		<div className="footer">
			<div className="footer__icon">
				<HomeOutlinedIcon fontSize="large" />
			</div>
			<div className="footer__icon">
				<SearchOutlinedIcon fontSize="large" />
			</div>
			<div className="footer__icon">
				<BookmarkBorderOutlinedIcon fontSize="large" />
			</div>
			<div className="footer__icon">
				<PermIdentityOutlinedIcon fontSize="large" />
			</div>
		</div>
	);
};

export default Footer;
