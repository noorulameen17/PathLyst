# PathLyst

## Project Overview

PathLyst is an AI-powered career research assistant that helps users make smarter, more confident career decisions. By leveraging the Perplexity Sonar-Pro API, PathLyst delivers comprehensive, up-to-date, and personalized insights about any career path, role, or industry. The app is designed for students, career switchers, returners, and anyone curious about their next professional move.

### Key Features

- **Personalized Career Guidance:** Users input their background, skills, interests, and a career question. PathLyst generates a tailored, research-grade response.
- **Comprehensive Insights:** Each response includes role descriptions, required skills, salary insights, job market trends, and curated learning resources.
- **Real-Time, Trustworthy Data:** By integrating Perplexity’s Sonar-Pro API (with web and YouTube tools enabled), PathLyst provides answers sourced from the latest, most relevant information available online.
- **Citations & Resources:** All external resources (articles, videos, courses, etc.) are included as clickable markdown links, making it easy for users to explore further.
- **Modern, Intuitive UI:** The app features a step-by-step form, animated transitions, and a clean, accessible design for a delightful user experience.

### How It Works

1. **User Input:** The user fills out a multi-step form describing their background, skills, interests, and a specific career question.
2. **Prompt Generation:** The app constructs a structured, detailed prompt based on user input, enforcing strict formatting for clarity and skimmability.
3. **Perplexity API Integration:** The backend sends the prompt to the Perplexity Sonar-Pro API, requesting both web and YouTube sources.
4. **Response Rendering:** The API’s response (including answer, citations, and tool outputs) is displayed in a readable, interactive format, with embedded media and direct links to sources.
5. **Actionable Results:** Users receive a comprehensive, easy-to-skim breakdown of their query, empowering them to take the next step in their career journey.

## How we built it

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion for UI/UX and smooth transitions.
- **Backend:** Next.js API routes.
- **AI Integration:** Perplexity Sonar-Pro API (with web and YouTube tools enabled) for real-time, trustworthy research.
- **Features:** Multi-step form, animated UI, session-based result storage, and dynamic rendering of citations and embedded media.
---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

### Perplexity API Usage Explanation

**How Perplexity API is Used:**
- The app uses the [Perplexity Sonar-Pro API](https://docs.perplexity.ai/) to generate research-grade, personalized career insights.
- User input (background, skills, interests, question) is converted into a structured prompt.
- The backend (`/app/api/query/route.js`) sends this prompt to the Perplexity API using the `querySonar` function (`/lib/sonar.js`).
- The response includes a detailed answer, citations, and tool outputs, which are rendered in the UI.
- The API enables real-time, up-to-date, and trustworthy career research, including web and YouTube sources.
