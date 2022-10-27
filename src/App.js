import React from 'react';
import './style/App.css';
import Card from './components/Card';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Explore from './components/Explore';
import Bookmark from './components/Bookmark';
import Profile from './components/Profile';
import Search from './components/Search';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/about/:id" element={<About />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/bookmark" element={<Bookmark />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/search/:id" element={<Search />} />
					<Route
						index
						element={
							<>
								<Header />
								<Card />
								<Footer />
							</>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
