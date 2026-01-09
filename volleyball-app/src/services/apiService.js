// API Service for Dynamic Tournament and Team Search
// This service communicates with Vercel serverless functions that use Perplexity API

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '' // Same domain in production
  : 'http://localhost:3000'; // Local development

/**
 * Search for volleyball tournaments based on region and filters
 * @param {Object} params - Search parameters
 * @param {string} params.region - Region to search (e.g., "Southern California", "Northern California")
 * @param {string} params.ageGroup - Age group filter (e.g., "12U", "14U", "16U", "18U")
 * @param {string} params.month - Month filter (e.g., "January", "February")
 * @returns {Promise<Object>} Tournament search results
 */
export const searchTournaments = async ({ region, ageGroup, month }) => {
  try {
    const params = new URLSearchParams();
    if (region) params.append('region', region);
    if (ageGroup) params.append('ageGroup', ageGroup);
    if (month) params.append('month', month);

    const response = await fetch(`${API_BASE_URL}/api/search-tournaments?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Tournament search failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching tournaments:', error);
    throw error;
  }
};

/**
 * Search for team information
 * @param {Object} params - Search parameters
 * @param {string} params.teamName - Team name to search
 * @param {string} params.region - Region filter (optional)
 * @param {string} params.ageGroup - Age group filter (optional)
 * @returns {Promise<Object>} Team search results
 */
export const searchTeams = async ({ teamName, region, ageGroup }) => {
  try {
    const params = new URLSearchParams();
    if (teamName) params.append('teamName', teamName);
    if (region) params.append('region', region);
    if (ageGroup) params.append('ageGroup', ageGroup);

    const response = await fetch(`${API_BASE_URL}/api/search-teams?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Team search failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching teams:', error);
    throw error;
  }
};

/**
 * Get tournament details by ID
 * @param {string} tournamentId - Tournament ID
 * @returns {Promise<Object>} Tournament details
 */
export const getTournamentDetails = async (tournamentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tournaments/${tournamentId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch tournament details: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tournament details:', error);
    throw error;
  }
};

export default {
  searchTournaments,
  searchTeams,
  getTournamentDetails
};
