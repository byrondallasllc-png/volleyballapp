import React, { useState, useMemo } from 'react';
import { tournaments as allTournaments, organizations, regions, ageGroups } from '../utils/mockData';
import TournamentCard from '../components/TournamentHub/TournamentCard';
import { searchTournaments } from '../services/apiService';
import './Home.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    organization: 'all',
    region: 'all',
    ageGroup: 'all',
    bidLevel: 'all'
  });
  
  // Dynamic search states
  const [dynamicSearchQuery, setDynamicSearchQuery] = useState('');
  const [dynamicRegion, setDynamicRegion] = useState('');
  const [dynamicMonth, setDynamicMonth] = useState('');
  const [isDynamicSearch, setIsDynamicSearch] = useState(false);
  const [dynamicResults, setDynamicResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Handle dynamic search
  const handleDynamicSearch = async () => {
    if (!dynamicSearchQuery && !dynamicRegion && !dynamicMonth) {
      alert('Please enter at least one search criteria');
      return;
    }

    setIsLoading(true);
    setSearchError(null);
    setIsDynamicSearch(true);

    try {
      const results = await searchTournaments({
        region: dynamicSearchQuery || dynamicRegion,
        ageGroup: filters.ageGroup !== 'all' ? filters.ageGroup : undefined,
        month: dynamicMonth || undefined
      });
      
      setDynamicResults(results);
    } catch (error) {
      console.error('Dynamic search error:', error);
      setSearchError('Failed to fetch dynamic search results. Using local data.');
      setIsDynamicSearch(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to local search
  const resetToLocalSearch = () => {
    setIsDynamicSearch(false);
    setDynamicResults(null);
    setDynamicSearchQuery('');
    setDynamicRegion('');
    setDynamicMonth('');
    setSearchError(null);
  };

  // Local filtered tournaments
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

  // Determine which results to display
  const displayTournaments = isDynamicSearch && dynamicResults
    ? dynamicResults.tournaments || []
    : filteredTournaments;

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
        </div>

        {/* Dynamic Search Section */}
        <div className="dynamic-search-section" style={{
          backgroundColor: '#f8f9fa',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '32px',
          border: '2px solid #e7b10a'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px', marginRight: '12px' }}>🔍</span>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>AI-Powered Dynamic Search</h2>
          </div>
          <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
            Search beyond our database! Get real-time tournament information from across the web.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Search region (e.g., Southern California)"
              value={dynamicSearchQuery}
              onChange={(e) => setDynamicSearchQuery(e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <input
              type="text"
              placeholder="Month (e.g., January, February)"
              value={dynamicMonth}
              onChange={(e) => setDynamicMonth(e.target.value)}
              style={{
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleDynamicSearch}
              disabled={isLoading}
              style={{
                padding: '12px 24px',
                backgroundColor: isLoading ? '#ccc' : '#e7b10a',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {isLoading ? 'Searching...' : '🚀 Search Tournaments'}
            </button>
            
            {isDynamicSearch && (
              <button
                onClick={resetToLocalSearch}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'white',
                  color: '#333',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ← Back to Local Search
              </button>
            )}
          </div>

          {searchError && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              color: '#856404',
              fontSize: '14px'
            }}>
              ⚠️ {searchError}
            </div>
          )}

          {isDynamicSearch && dynamicResults && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              color: '#155724'
            }}>
              <strong>✓ Dynamic Search Active</strong>
              <div style={{ marginTop: '8px', fontSize: '14px' }}>
                {dynamicResults.summary || 'Showing AI-powered search results'}
              </div>
            </div>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search tournaments by name, city, or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <div className="filter-group">
              <label>Organization</label>
              <select 
                value={filters.organization} 
                onChange={(e) => handleFilterChange('organization', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Organizations</option>
                {organizations.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Region</label>
              <select 
                value={filters.region} 
                onChange={(e) => handleFilterChange('region', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Age Group</label>
              <select 
                value={filters.ageGroup} 
                onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Age Groups</option>
                {ageGroups.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Bid Level</label>
              <select 
                value={filters.bidLevel} 
                onChange={(e) => handleFilterChange('bidLevel', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Levels</option>
                <option value="bid">Bid Tournaments</option>
                <option value="open">Open Tournaments</option>
              </select>
            </div>

            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <h2>{displayTournaments.length} Tournament{displayTournaments.length !== 1 ? 's' : ''} Found</h2>
          {isDynamicSearch && (
            <span style={{ 
              fontSize: '14px', 
              color: '#666',
              marginLeft: '12px'
            }}>
              (AI-Powered Results)
            </span>
          )}
        </div>

        {/* Tournament Grid */}
        {isLoading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px', 
            fontSize: '18px',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            Searching for tournaments...
          </div>
        ) : displayTournaments.length === 0 ? (
          <div className="no-results">
            <p>No tournaments match your criteria.</p>
            <button onClick={isDynamicSearch ? resetToLocalSearch : clearFilters} className="reset-btn">
              {isDynamicSearch ? 'Try Local Search' : 'Clear Filters'}
            </button>
          </div>
        ) : (
          <div className="tournament-grid">
            {displayTournaments.map(tournament => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
