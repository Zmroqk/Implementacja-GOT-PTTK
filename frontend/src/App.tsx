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
import { Redirect } from './components/Redirect';
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/tourist/*" element={<Tourist />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/*" element={<Redirect to='/tourist'/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
