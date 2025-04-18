
export function generatePrompt(formData) {
  const { background, skills, interests, question } = formData;
  
  // Build a context section based on provided information
  let context = '';
  
  if (background) {
    context += `My background: ${background}. `;
  }
  
  if (skills) {
    context += `My skills include: ${skills}. `;
  }
  
  if (interests) {
    context += `I'm interested in: ${interests}. `;
  }
  
  // Format the user's question with enhanced research instructions
  let enhancedQuestion = question || "What career paths should I explore?";
  
  // Build the final research-grade prompt
  const prompt = `
    ${context}

    ${enhancedQuestion}
    
    Please provide a detailed, well-structured response with:
    1. Recommended job titles or career paths based on my profile
    2. Required skills and possible certifications for each option
    3. Approximate salary ranges (including entry-level and experienced)
    4. Current industry trends relevant to these career paths
    5. Specific companies that hire for these roles
    
    Support your answers with recent data and citations to credible sources.
  `.trim();
  
  return prompt;
}