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
      
      
      {/* <BrowserRouter>
      <Tourist />
        <Routes>
        <Route path="/tourist" element={<Tourist />} />
          <Route path="/tourist/plan" element={<Plan />} />
          <Route path="/tourist/trip" element={<Trip />} />
          <Route path="/tourist/badge" element={<Badge />} />
          <Route path="/admin/segment" element={<Segment />} />
          <Route path="/admin/closure" element={<Closure />} />
          <Route path="/admin/leader" element={<Leader />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
