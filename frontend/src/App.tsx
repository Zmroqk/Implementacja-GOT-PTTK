import React from 'react';
import logo from './logo.svg';
import './App.css';

import Tourist from './components/Tourist';
import Admin from './components/Admin';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";




function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/tourist/*" element={<Tourist />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
