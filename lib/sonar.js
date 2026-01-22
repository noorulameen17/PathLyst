const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
// Update to correct Perplexity endpoint for chat completions
const API_URL = "https://api.perplexity.ai/chat/completions";

export async function querySonar(prompt) {
  if (!PERPLEXITY_API_KEY) {
    throw new Error("Perplexity API key is missing");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content: "You are a helpful career research assistant.",
          },
          { role: "user", content: prompt },
        ],
        // Perplexity handles web browsing internally for Sonar models; tools are for function-calling only.
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`
      );
    }

    // Perplexity returns { choices: [{ message: { content }, ... }], citations?: [] }
    const data = await response.json();
    const message = data.choices?.[0]?.message;
    return {
      text: message?.content || "",
      citations: data.citations || message?.citations || [],
      tool_outputs: [],
    };
  } catch (error) {
    console.error("Error querying Perplexity API:", error);
    throw error;
  }
}

// Example: How to call Perplexity API (Sonar) in Node.js/JavaScript
async function exampleChatCompletion() {
  const API_KEY = process.env.PERPLEXITY_API_KEY;
  const API_URL = "https://api.perplexity.ai/chat/completions";
  const messages = [
    {
      role: "system",
      content:
        "You are an artificial intelligence assistant and you need to engage in a helpful, detailed, polite conversation with a user.",
    },
    {
      role: "user",
      content: "How many stars are in the universe?",
    },
  ];

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "sonar-pro",
      messages,
    }),
  });

  const data = await response.json();
  console.log(data);
}
