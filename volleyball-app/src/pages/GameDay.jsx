import React from 'react';
import './GameDay.css';

export default function GameDay() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Game Day Command Center</h1>
        <p className="page-subtitle">Your tournament day essentials - checklists, schedules, nutrition, and mental prep.</p>
      </div>

      <div className="coming-soon-card">
        <div className="coming-soon-icon">📋</div>
        <h2>Phase 2 Coming Soon</h2>
        <p>
          This section will include:
        </p>
        <ul className="coming-soon-list">
          <li>Pre-game checklists with templates</li>
          <li>Venue information and parking</li>
          <li>Match schedule tracker</li>
          <li>Nutrition timing guide</li>
          <li>Mental preparation exercises</li>
        </ul>
        <button className="btn btn-primary" disabled>
          Under Construction
        </button>
      </div>
    </div>
  );
}
