# Dynamic Tournament Search Implementation Guide

## Overview

This guide shows you how to complete the implementation of dynamic tournament search with Perplexity API integration for the VolleyHub app.

## ✅ Already Completed

1. **API Endpoints Created** (in `/api` folder):
   - `search-tournaments.js` - Dynamic tournament search
   - `search-teams.js` - Team information lookup

## 📋 Remaining Steps

### Step 1: Create Vercel Configuration

**File: `vercel.json` (in root `volleyball-app/` directory)**

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "build"
}
```

---

### Step 2: Create API Service Layer

**File: `src/services/apiService.js`**

```javascript
// API service for communicating with backend

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export class TournamentAPI {
  
  static async searchTournaments(region, filters = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/search-tournaments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ region, filters })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.tournaments || [];
    } catch (error) {
      console.error('Tournament search failed:', error);
      // Return empty array on error
      return [];
    }
  }

  static async searchTeam(teamName, region = null) {
    try {
      const params = new URLSearchParams({ teamName });
      if (region) params.append('region', region);

      const response = await fetch(`${API_BASE_URL}/search-teams?${params}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.team || null;
    } catch (error) {
      console.error('Team search failed:', error);
      return null;
    }
  }
}
```

---

### Step 3: Update Home Page Component

**File: `src/pages/Home.jsx` - Add these modifications:**

```javascript
import { useState, useEffect } from 'react';
import { TournamentAPI } from '../services/apiService';
import { tournaments as mockTournaments } from '../utils/mockData';

function Home() {
  const [tournaments, setTournaments] = useState(mockTournaments);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    region: 'California',
    organization: '',
    ageGroup: '',
    bidLevel: ''
  });
  const [useRealAPI, setUseRealAPI] = useState(false); // Toggle for testing

  // Load tournaments on mount or when search params change
  useEffect(() => {
    if (useRealAPI) {
      handleSearch();
    }
  }, [useRealAPI]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await TournamentAPI.searchTournaments(
        searchParams.region,
        {
          organization: searchParams.organization,
          ageGroup: searchParams.ageGroup,
          bidLevel: searchParams.bidLevel
        }
      );
      
      if (results.length > 0) {
        setTournaments(results);
      } else {
        // Fallback to mock data if no results
        setTournaments(mockTournaments);
      }
    } catch (error) {
      console.error('Search error:', error);
      setTournaments(mockTournaments);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="home-page">
      {/* Add toggle for testing */}
      <div className="api-toggle">
        <label>
          <input 
            type="checkbox" 
            checked={useRealAPI}
            onChange={(e) => setUseRealAPI(e.target.checked)}
          />
          Use Dynamic Search (requires API key)
        </label>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <input 
          type="text"
          placeholder="Search region (e.g., California, Texas)"
          value={searchParams.region}
          onChange={(e) => handleFilterChange('region', e.target.value)}
        />
        
        <select 
          value={searchParams.organization}
          onChange={(e) => handleFilterChange('organization', e.target.value)}
        >
          <option value="">All Organizations</option>
          <option value="USAV">USAV</option>
          <option value="AAU">AAU</option>
          <option value="JVA">JVA</option>
        </select>

        <select 
          value={searchParams.ageGroup}
          onChange={(e) => handleFilterChange('ageGroup', e.target.value)}
        >
          <option value="">All Age Groups</option>
          <option value="14U">14U</option>
          <option value="15U">15U</option>
          <option value="16U">16U</option>
          <option value="17U">17U</option>
          <option value="18U">18U</option>
        </select>

        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search Tournaments'}
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <div className="loading">Loading tournaments...</div>
      ) : (
        <div className="tournament-list">
          {/* Your existing tournament cards */}
          {tournaments.map(tournament => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
```

---

### Step 4: Create Environment Variables

**File: `.env.local` (in root `volleyball-app/` directory)**

```env
# Perplexity API Key
PERPLEXITY_API_KEY=your_perplexity_api_key_here

# Optional: Custom API URL for development
REACT_APP_API_URL=/api
```

**File: `.env.example` (template for others)**

```env
# Get your API key from https://www.perplexity.ai/
PERPLEXITY_API_KEY=

REACT_APP_API_URL=/api
```

---

### Step 5: Update package.json

Add this to your `scripts` section if not already present:

```json
{
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "start": "react-scripts start"
  }
}
```

---

### Step 6: Deploy to Vercel

1. **Add Environment Variable in Vercel Dashboard:**
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add: `PERPLEXITY_API_KEY` = your actual API key
   - Save and redeploy

2. **Deploy:**
```bash
git add .
git commit -m "Add dynamic tournament search with Perplexity API"
git push origin main
```

Vercel will automatically deploy.

---

## 🧪 Testing

### Local Testing

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Run locally:**
```bash
cd volleyball-app
vercel dev
```

3. **Test the API:**
```bash
# Test tournament search
curl -X POST http://localhost:3000/api/search-tournaments \
  -H "Content-Type: application/json" \
  -d '{"region": "California", "filters": {"organization": "USAV"}}'

# Test team search
curl "http://localhost:3000/api/search-teams?teamName=Test%20Team&region=California"
```

### Production Testing

1. Toggle "Use Dynamic Search" checkbox on the homepage
2. Enter a region (e.g., "Texas")
3. Select filters
4. Click "Search Tournaments"
5. Results should appear from Perplexity API

---

## 🔑 Getting Perplexity API Key

1. Go to https://www.perplexity.ai/
2. Sign up for an account
3. Navigate to API settings
4. Generate an API key
5. Add to Vercel environment variables

**Pricing:** Perplexity offers a free tier and paid plans.

---

## 📊 Features Implemented

✅ **Dynamic Tournament Search**
- Real-time web scraping via Perplexity
- Region-based filtering
- Organization filter (USAV, AAU, JVA)
- Age group filtering
- Bid level filtering

✅ **Team Information Lookup**
- Search by team name
- Get club affiliation
- Recent tournament results
- Coach information
- Contact details

✅ **Fallback Mechanism**
- Returns mock data if API fails
- Graceful error handling
- No disruption to user experience

---

## 🚀 Next Steps

1. **Enhanced UI**: Add loading spinners, better error messages
2. **Caching**: Implement Redis or local storage caching
3. **Tournament Details**: Add deep-dive pages with full tournament info
4. **Team Profiles**: Create dedicated team search page
5. **Saved Searches**: Let users save favorite regions/filters
6. **Notifications**: Alert users when new tournaments match their criteria

---

## 🐛 Troubleshooting

**Issue: API returns empty results**
- Check Perplexity API key is set correctly
- Verify environment variables in Vercel
- Check API rate limits

**Issue: CORS errors**
- API endpoints already have CORS headers
- Verify `/api/` routes are configured in vercel.json

**Issue: Build fails**
- Run `npm install` to ensure all dependencies
- Check that `src/services/apiService.js` is created
- Verify syntax in all new files

---

## 📝 Summary

You now have:
1. ✅ Two serverless API endpoints (`/api/search-tournaments`, `/api/search-teams`)
2. ✅ Dynamic web scraping with Perplexity AI
3. ✅ Frontend integration ready
4. ✅ Deployment configuration for Vercel

Just add the remaining files, configure your API key, and deploy! 🎉
