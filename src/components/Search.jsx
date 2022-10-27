import { IconButton } from '@material-ui/core';
import ArrowsBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../style/Search.css';
import { useEffect, useState } from 'react';

const apiLink='https://hiwder-tazrzv72fq-as.a.run.app/'

const Search= ()=>{
    const {id}=useParams();
    const [db, setDB]=useState([])
    const [search, setSearch] = useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        fetch(apiLink+'explore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tag: id
            }),
        })
        .then((response) => response.json())
        .then((data) => setDB(data.items));
        setSearch(id);
        // eslint-disable-next-line
    }, [])
    return db.length>=3 ? (
		<div>
			<div className="header">
				<Link to="/explore">
					<IconButton>
						<ArrowsBackIosIcon fontSize="medium" />
					</IconButton>
				</Link>
				<input
					className="searchbar"
					type="text"
					placeholder="Search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e)=> {
						if(e.key==="Enter") {
							navigate('/search/'+search)
						}
					}}
				/>
			</div>
			<div className="categories">
				<div className="category">
					<p>{db[0].name}</p>
					<img src={db[0].image_url} alt="" />
				</div>
				<div className="category">
					<p>{db[1].name}</p>
					<img src={db[1].image_url} alt="" />
				</div>
				<div className="category">
					<p>{db[2].name}</p>
					<img src={db[2].image_url} alt="" />
				</div>
			</div>
        </div>
    ):<div>UGA UGA UGA</div>;
}

export default Search