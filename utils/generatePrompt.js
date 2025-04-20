export function generatePrompt(formData) {
  const { background, skills, interests, question } = formData;

  // Build a context section based on provided information
  let context = "";

  if (background) {
    context += `My background: ${background}. `;
  }

  if (skills) {
    context += `My skills include: ${skills}. `;
  }

  if (interests) {
    context += `I'm interested in: ${interests}. `;
  }

  // Default fallback question
    let enhancedQuestion = question ||"Based on my profile, what career options or learning paths should I seriously consider in 2025?";

  // Build the final research-grade prompt
  const prompt = `
${context}

${enhancedQuestion}

Please provide a detailed, well-structured response using **bullet points** under each section. Avoid using tables. Include:

- **Recommended job titles or career paths** tailored to my background
- **Required skills and certifications** for each role
- **Approximate salary ranges** (entry-level to experienced)
- **Current industry trends** relevant to these paths
- **Examples of companies hiring for these roles**
- **Useful resources** (learning platforms, certification programs, networking sites, and relevant YouTube videos)

Be sure to include **direct links (full URLs) to credible sources** and make the response easy to skim. 
**For every YouTube video, resource, or source you mention, include the actual clickable URL in markdown format (e.g., [Video Title](https://youtube.com/...)).**
If you reference a source, always attach its link.
  `.trim();

  return prompt;
}
