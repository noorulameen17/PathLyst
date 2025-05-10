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
  let enhancedQuestion =
    question ||
    "Based on my profile, what career options or learning paths should I seriously consider in 2025?";

  // Build the final research-grade prompt
  const prompt = `
${context}

${enhancedQuestion}

**Please strictly follow these formatting and content guidelines:**

- Use bullet symbols (•) for all lists to improve readability.
- All external sources (YouTube videos, documents, courses, etc.) must be included as direct, clickable URLs in markdown format (e.g., [Video Title](https://youtube.com/...)).
- Always attach links when referencing a source.

**You must preserve the exact formatting, usage, font, bolding, and bullet symbols as described below. Do not change the structure, styles, or formatting in any way. Always follow this template exactly.**

**Structure your response into these 8 sections:**

1. **Recommended Job Titles & Career Paths**  
   - 5 examples, each with 1–5 bullet points describing the role.

2.  **Core Skills and In-Demand Skills**  
   - 1–5 bullet points for each.

3.  **Certifications (with sources)**  
   - 1–5 bullet points, each with a direct source link.

4 **Approximate Salary Ranges**  
   - 1–5 bullet points, each with a tooltip: "Salaries can vary based on location, company, and experience level".

5 **Current Industry Trends**  
   - 1–5 bullet points (e.g., hackathons, open-source programs, projects).

6.  **Examples of Companies Hiring for These Roles**  
   - Include: Major Tech Companies, Product & SaaS Startups, AI & Tooling Startups, Well-known Consulting Agencies.

7. **Where to Search for Jobs**  
   - List popular job boards and platforms.

8.  **Useful Resources**  
   - Include learning platforms, networking, portfolios, YouTube channels, hackathon sites, etc.

**Formatting notes:**
- Use bullet symbols for all lists.
- Every external resource or source must be a clickable markdown link.
- Always attach links when referencing a source.

**Do not use tables. Make the response easy to skim.**

**Never change the above formatting or styles. Always generate the response using this exact structure and markdown.**

**Never adapt or simplify the formatting for any interface. Always output the marplaceholders exactly as described above, for rendering in a React/Next.js app.**
`.trim();

  return prompt;
}
