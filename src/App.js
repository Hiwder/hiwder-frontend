import React from 'react';
import './style/App.css';
import Card from './components/Card';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Footer from './components/Footer';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/about/:name" element={<About />} />
					<Route
						index
						element={
							<>
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
