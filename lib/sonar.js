
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
const API_URL = 'https://api.perplexity.ai/sonar/api/v1/query';

export async function querySonar(prompt) {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('Perplexity API key is missing');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
      },
      body: JSON.stringify({
        model: 'sonar-large-online',
        query: prompt,
        include_citations: true,
        search_focus: 'recency'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error querying Perplexity API:', error);
    throw error;
  }
}