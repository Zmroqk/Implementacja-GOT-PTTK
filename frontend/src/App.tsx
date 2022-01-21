import React from 'react';
import logo from './logo.svg';
import './App.css';

import Badge from './components/Badge';
import Plan from './components/Plan';
import Trip from './components/Trip';
import Closure from './components/Closure';
import Leader from './components/Leader';
import Segment from './components/Segment';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/tourist/plan" element={<Plan />} />
          <Route path="/tourist/trip" element={<Trip />} />
          <Route path="/tourist/badge" element={<Badge />} />
          <Route path="/admin/segment" element={<Segment />} />
          <Route path="/admin/closure" element={<Closure />} />
          <Route path="/admin/leader" element={<Leader />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
