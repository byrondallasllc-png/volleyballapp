import React from 'react';
import './ChecklistDetail.css';

export default function ChecklistDetail() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Game Day Checklist</h1>
        <p className="page-subtitle">Create and manage your tournament checklists.</p>
      </div>

      <div className="coming-soon-card">
        <div className="coming-soon-icon">✅</div>
        <h2>Checklists Coming in Phase 2</h2>
        <p>
          Build your perfect game day checklist:
        </p>
        <ul className="coming-soon-list">
          <li>Pre-built templates for different tournament types</li>
          <li>Customizable checklist items</li>
          <li>PDF export for printing</li>
          <li>Share with other parents</li>
          <li>Save to your vault</li>
        </ul>
        <button className="btn btn-primary" disabled>
          Under Construction
        </button>
      </div>
    </div>
  );
}
