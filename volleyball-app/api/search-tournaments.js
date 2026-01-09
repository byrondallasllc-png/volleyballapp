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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { region, filters = {} } = req.body;
    
    if (!region) {
      return res.status(400).json({ error: 'Region is required' });
    }

    // Build search query
    const query = buildSearchQuery(region, filters);
    
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
      source: 'perplexity'
    });

  } catch (error) {
    console.error('Tournament search error:', error);
    return res.status(500).json({ 
      error: error.message,
      tournaments: getMockTournaments(req.body.region)
    });
  }
};

function buildSearchQuery(region, filters) {
  const { organization, ageGroup, bidLevel, dateRange } = filters;
  const year = new Date().getFullYear();
  
  return `Find upcoming volleyball tournaments in ${region} for ${year}. 
${organization ? `Organization: ${organization} (USAV, AAU, JVA, etc.)` : 'Include all major organizations (USAV, AAU, JVA)'}
${ageGroup ? `Age group: ${ageGroup}` : 'Include all age groups'}
${bidLevel ? `Bid level: ${bidLevel}` : 'Include all bid levels'}
${dateRange ? `Date range: ${dateRange}` : `From now through end of ${year}`}

For each tournament found, provide:
- Exact tournament name
- Organization (USAV, AAU, JVA, etc.)
- City and state
- Venue name
- Start and end dates (format: YYYY-MM-DD)
- Registration deadline
- Estimated total cost (registration + travel estimate)
- Bid level (if applicable)
- Age groups accepted
- Expected number of teams
- College scouts information if available

Format response as a JSON array with this structure:
[
  {
    "name": "Tournament Name",
    "organization": "USAV",
    "city": "City",
    "state": "State",
    "venue": "Venue Name",
    "startDate": "2026-03-15",
    "endDate": "2026-03-17",
    "registrationDeadline": "2026-03-01",
    "estimatedCost": 1200,
    "bidLevel": "Regional",
    "ageGroups": ["14U", "15U"],
    "expectedTeams": 150,
    "collegeScouts": ["Stanford", "Berkeley"]
  }
]

Only return valid, real tournaments. Do not make up information.`;
}

function parseTournamentData(apiResponse, region) {
  try {
    const content = apiResponse.choices[0]?.message?.content || '';
    
    // Try to extract JSON from the response
    const jsonMatch = content.match(/\[\s*{[\s\S]*}\s*\]/);
    
    if (jsonMatch) {
      const tournaments = JSON.parse(jsonMatch[0]);
      
      // Transform to match our app's format
      return tournaments.map((t, index) => ({
        id: `${t.organization?.toLowerCase() || 'tournament'}-${index + 1}`,
        name: t.name || 'Unknown Tournament',
        organization: t.organization || 'N/A',
        region: region,
        city: t.city || '',
        state: t.state || region,
        venue: t.venue || '',
        dates: {
          start: t.startDate || '',
          end: t.endDate || ''
        },
        bidRequired: t.bidLevel ? true : false,
        registrationDeadline: t.registrationDeadline || '',
        registrationOpen: true,
        estimatedTravelCost: Math.floor((t.estimatedCost || 1000) * 0.3),
        ratings: {
          competitionLevel: 4.0,
          organizationQuality: 4.0,
          recruitingValue: 3.5,
          valueForMoney: 4.0
        },
        coordinates: [0, 0],
        collegeScoutsAttending: t.collegeScouts || [],
        lastYearTeamList: t.expectedTeams || 0
      }));
    }
    
    // If no JSON found, return empty array
    return [];
    
  } catch (error) {
    console.error('Error parsing tournament data:', error);
    return [];
  }
}

function getMockTournaments(region) {
  // Fallback mock data if API fails
  return [
    {
      id: "fallback-1",
      name: `${region} Spring Championship`,
      organization: "USAV",
      region: region,
      city: region.split(' ')[0],
      state: region,
      venue: "Convention Center",
      dates: {
        start: "2026-04-15",
        end: "2026-04-17"
      },
      bidRequired: false,
      registrationDeadline: "2026-04-01",
      registrationOpen: true,
      estimatedTravelCost: 600,
      ratings: {
        competitionLevel: 4.0,
        organizationQuality: 4.0,
        recruitingValue: 3.5,
        valueForMoney: 4.0
      },
      coordinates: [0, 0],
      collegeScoutsAttending: ["Local Universities"],
      lastYearTeamList: 100
    }
  ];
}
