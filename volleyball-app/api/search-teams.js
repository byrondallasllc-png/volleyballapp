// Vercel Serverless Function for Team Search
// Uses Perplexity API to find team information

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { teamName, region } = req.query;
    
    if (!teamName) {
      return res.status(400).json({ error: 'Team name is required' });
    }

    const query = buildTeamSearchQuery(teamName, region);
    const perplexityKey = process.env.PERPLEXITY_API_KEY;
    
    if (!perplexityKey) {
      return res.status(200).json({ 
        team: getMockTeamData(teamName),
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
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.statusText}`);
    }

    const data = await response.json();
    const teamInfo = parseTeamData(data, teamName);

    return res.status(200).json({ 
      team: teamInfo,
      source: 'perplexity'
    });

  } catch (error) {
    console.error('Team search error:', error);
    return res.status(500).json({ 
      error: error.message,
      team: getMockTeamData(req.query.teamName)
    });
  }
};

function buildTeamSearchQuery(teamName, region) {
  return `Find information about the volleyball team "${teamName}"${region ? ` in ${region}` : ''}.

Provide:
- Full team name and club affiliation
- Location (city, state)
- Age division / level
- Head coach name
- Recent tournament results (last 6 months)
- Notable achievements
- Contact information if publicly available

Format as JSON:
{
  "teamName": "Full Team Name",
  "clubName": "Club Affiliation",
  "location": "City, State",
  "ageDiv": "14U",
  "coach": "Coach Name",
  "recentResults": [{"tournament": "Name", "place": "1st", "date": "2026-01"}],
  "achievements": ["Achievement 1"],
  "contact": "email@example.com"
}

Only return verified, publicly available information.`;
}

function parseTeamData(apiResponse, teamName) {
  try {
    const content = apiResponse.choices[0]?.message?.content || '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return { teamName, error: 'No data found' };
  } catch (error) {
    console.error('Error parsing team data:', error);
    return { teamName, error: 'Parse error' };
  }
}

function getMockTeamData(teamName) {
  return {
    teamName: teamName,
    clubName: "Mock Volleyball Club",
    location: "San Francisco, CA",
    ageDiv: "14U",
    coach: "Coach Smith",
    recentResults: [],
    achievements: ["Regional Finalist"],
    contact: "N/A"
  };
}
