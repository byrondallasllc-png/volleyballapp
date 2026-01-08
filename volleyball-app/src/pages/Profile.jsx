import React from 'react';
import './Profile.css';

export default function Profile() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Player Profile</h1>
        <p className="page-subtitle">Manage your daughter's profile for personalized tournament recommendations.</p>
      </div>

      <div className="coming-soon-card">
        <div className="coming-soon-icon">👤</div>
        <h2>Profile Management Coming Soon</h2>
        <p>
          Set up your daughter's profile to get:
        </p>
        <ul className="coming-soon-list">
          <li>Personalized tournament recommendations</li>
          <li>Skill level matching</li>
          <li>Recruiting visibility insights</li>
          <li>Schedule conflict detection</li>
          <li>Budget-based suggestions</li>
        </ul>
        <button className="btn btn-primary" disabled>
          Under Construction
        </button>
      </div>
    </div>
  );
}
