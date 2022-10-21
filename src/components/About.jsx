import { useParams } from 'react-router-dom';

const About = () => {
	const { name } = useParams();
	return (
		<div>
			<h1>About {name}</h1>
		</div>
	);
};

export default About;
