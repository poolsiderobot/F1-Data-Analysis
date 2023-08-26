import React from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import './App.css';
import Header from './Header.js';
import Navigation from './Navigation.js';
import Position from './Position.js';

function App() {
  return (
    <div>
      <Header />
      
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/position" element={<Position />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
