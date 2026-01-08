import React, { useState, useMemo } from 'react';
import { tournaments as allTournaments, organizations, regions, ageGroups } from '../utils/mockData';
import TournamentCard from '../components/TournamentHub/TournamentCard';
import './Home.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    organization: 'all',
    region: 'all',
    ageGroup: 'all',
    bidLevel: 'all'
  });

  const filteredTournaments = useMemo(() => {
    return allTournaments.filter(tournament => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tournament.venue.toLowerCase().includes(searchQuery.toLowerCase());

      // Organization filter
      const matchesOrg = filters.organization === 'all' || 
        tournament.organization === filters.organization;

      // Region filter
      const matchesRegion = filters.region === 'all' || 
        tournament.region === filters.region;

      // Age group filter
      const matchesAge = filters.ageGroup === 'all' || 
        tournament.ageGroup === filters.ageGroup;

      // Bid level filter
      const matchesBid = filters.bidLevel === 'all' || 
        (filters.bidLevel === 'bid' && tournament.bidRequired) ||
        (filters.bidLevel === 'open' && !tournament.bidRequired);

      return matchesSearch && matchesOrg && matchesRegion && matchesAge && matchesBid;
    });
  }, [searchQuery, filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      organization: 'all',
      region: 'all',
      ageGroup: 'all',
      bidLevel: 'all'
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length;

  return (
    <div className="home-page">
      <div className="container">
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Find the Perfect
              <span className="hero-title-highlight"> Volleyball Tournament</span>
            </h1>
            <p className="hero-subtitle">
              Search 50+ tournaments across the US. Compare ratings, costs, and find the best fit for your daughter's goals.
            </p>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">{allTournaments.length}</div>
              <div className="hero-stat-label">Tournaments</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">12K+</div>
              <div className="hero-stat-label">Parent Reviews</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">50+</div>
              <div className="hero-stat-label">D1 Coaches</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="search-section">
          <div className="search-bar-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by tournament name, city, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear" onClick={() => setSearchQuery('')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <div className="filters-container">
            <div className="filters-grid">
              <select
                className="filter-select"
                value={filters.organization}
                onChange={(e) => handleFilterChange('organization', e.target.value)}
              >
                <option value="all">All Organizations</option>
                {organizations.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>

              <select
                className="filter-select"
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
              >
                <option value="all">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              <select
                className="filter-select"
                value={filters.ageGroup}
                onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
              >
                <option value="all">All Age Groups</option>
                {ageGroups.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>

              <select
                className="filter-select"
                value={filters.bidLevel}
                onChange={(e) => handleFilterChange('bidLevel', e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="open">Open Entry</option>
                <option value="bid">Bid Required</option>
              </select>
            </div>

            {activeFilterCount > 0 && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <div className="results-header">
            <h2 className="results-title">
              {filteredTournaments.length} Tournament{filteredTournaments.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="results-meta">
              {searchQuery && (
                <span className="results-search-term">
                  Searching for "{searchQuery}"
                </span>
              )}
            </div>
          </div>

          {filteredTournaments.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🏐</div>
              <h3 className="no-results-title">No tournaments found</h3>
              <p className="no-results-text">
                Try adjusting your filters or search term to find more tournaments.
              </p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="tournaments-grid">
              {filteredTournaments.map(tournament => (
                <TournamentCard key={tournament.id} tournament={tournament} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
