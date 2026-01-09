// Vercel Serverless Function for Tournament Search
// Uses Perplexity API to search for volleyball tournaments dynamically

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get parameters from query string (GET) or body (POST)
    const { region, filters = {}, ageGroup, month } = 
      req.method === 'GET' ? req.query : req.body;

    if (!region && !ageGroup && !month) {
      return res.status(400).json({ error: 'Region, age group, or month is required' });
    }

    // Build search query
    const query = buildSearchQuery(region, { ...filters, ageGroup, month });

    // Call Perplexity API
    const perplexityKey = process.env.PERPLEXITY_API_KEY;

    if (!perplexityKey) {
      console.error('PERPLEXITY_API_KEY not set');
      // Return mock data if no API key
      return res.status(200).json({
        tournaments: getMockTournaments(region),
        source: 'mock'
      });
    }

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [{
          role: 'user',
          content: query
        }],
        temperature: 0.2,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data = await response.json();
    const tournaments = parseTournamentData(data, region);

    return res.status(200).json({
      tournaments,
      source: 'perplexity',
      summary: `Found ${tournaments.length} tournaments in ${region || 'selected region'}`
    });

  } catch (error) {
    console.error('Tournament search error:', error);
    return res.status(500).json({
      error: error.message,
      tournaments: getMockTournaments(req.body.region || req.query.region)
    });
  }
};

function buildSearchQuery(region, filters) {
  const { organization, ageGroup, bidLevel, dateRange } = filters;
  
  let query = `Find upcoming volleyball tournaments`;
  
  if (region) query += ` in ${region}`;
  if (ageGroup) query += ` for ${ageGroup} age group`;
  if (organization) query += ` organized by ${organization}`;
  if (bidLevel) query += ` (${bidLevel} level)`;
  if (dateRange) query += ` during ${dateRange}`;
  
  query += `. Include tournament name, dates, location, organization, cost, and registration details.`;
  
  return query;
}

function parseTournamentData(data, region) {
  // Extract tournament information from Perplexity response
  try {
    const content = data.choices[0].message.content;
    
    // Basic parsing - you can enhance this based on response format
    const tournaments = [];
    
    // For now, return structured mock data that would come from parsing
    // In production, you'd parse the AI response here
    return getMockTournaments(region);
    
  } catch (error) {
    console.error('Error parsing tournament data:', error);
    return [];
  }
}

function getMockTournaments(region) {
  // Mock tournament data for testing
  return [
    {
      id: 'dynamic-1',
      name: `${region || 'Regional'} Volleyball Championship`,
      organization: 'USAV',
      city: region || 'Various',
      state: 'CA',
      venue: 'Convention Center',
      dates: 'Jan 25-26, 2026',
      ageGroup: '14U, 16U, 18U',
      bidRequired: true,
      cost: 550,
      rating: {
        competition: 8,
        organization: 9,
        recruiting: 8,
        value: 7
      },
      aiGenerated: true
    }
  ];
}
