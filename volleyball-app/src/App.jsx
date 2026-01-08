import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TournamentDetail from './pages/TournamentDetail';
import GameDay from './pages/GameDay';
import ChecklistDetail from './pages/ChecklistDetail';
import Profile from './pages/Profile';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournament/:id" element={<TournamentDetail />} />
          <Route path="/gameday" element={<GameDay />} />
          <Route path="/checklist/:id" element={<ChecklistDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
