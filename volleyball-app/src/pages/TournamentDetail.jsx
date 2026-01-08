import React from 'react';
import { useParams } from 'react-router-dom';
import { tournaments } from '../utils/mockData';
import './TournamentDetail.css';

export default function TournamentDetail() {
  const { id } = useParams();
  const tournament = tournaments.find(t => t.id === id);

  if (!tournament) {
    return (
      <div className="container">
        <div className="not-found">
          <h1>Tournament Not Found</h1>
          <p>The tournament you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="tournament-detail">
        <div className="detail-header">
          <div className="detail-badges">
            <span className="badge badge-orange">{tournament.organization}</span>
            <span className="badge badge-blue">{tournament.ageGroup}</span>
            {tournament.bidRequired && <span className="badge badge-warning">🏆 Bid Required</span>}
          </div>
          <h1 className="detail-title">{tournament.name}</h1>
          <div className="detail-location">
            📍 {tournament.venue}, {tournament.city}, {tournament.state}
          </div>
        </div>

        <div className="coming-soon-card">
          <div className="coming-soon-icon">🏐</div>
          <h2>Full Tournament Details Coming Soon</h2>
          <p>
            This page will include:
          </p>
          <ul className="coming-soon-list">
            <li>Complete tournament information</li>
            <li>Detailed ratings breakdown</li>
            <li>Parent reviews and comments</li>
            <li>Hotel recommendations with map</li>
            <li>College scouts attending</li>
            <li>Travel cost calculator</li>
            <li>Registration links</li>
          </ul>
          <button className="btn btn-primary" disabled>
            Under Construction
          </button>
        </div>
      </div>
    </div>
  );
}
