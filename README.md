# PathLyst

## Project Overview

PathLyst is an AI-powered career research assistant that helps users make smarter, more confident career decisions. By leveraging the Perplexity Sonar-Pro API, PathLyst delivers comprehensive, up-to-date, and personalized insights about any career path, role, or industry. The app is designed for students, career switchers, returners, and anyone curious about their next professional move.

### Key Features

- **Personalized Career Guidance:** Users input their background, skills, interests, and a career question. PathLyst generates a tailored, research-grade response.
- **Comprehensive Insights:** Each response includes role descriptions, required skills, salary insights, job market trends, and curated learning resources.
- **Real-Time, Trustworthy Data:** By integrating Perplexity’s Sonar-Pro API with real-time web browsing, PathLyst provides answers sourced from the latest, most relevant information available online.
- **Citations & Resources:** All external resources (articles, videos, courses, etc.) are included as clickable markdown links, making it easy for users to explore further.
- **Modern, Intuitive UI:** The app features a step-by-step form, animated transitions, and a clean, accessible design for a delightful user experience.

### How It Works

1. **User Input:** The user fills out a multi-step form describing their background, skills, interests, and a specific career question.
2. **Prompt Generation:** The app constructs a structured, detailed prompt based on user input, enforcing strict formatting for clarity and skimmability.
3. **Perplexity API Integration:** The backend sends the prompt to the Perplexity Sonar-Pro API, retrieving results that leverage real-time web sources (including web and YouTube when relevant).
4. **Response Rendering:** The API’s response (including answer, citations, and any tool-related metadata) is displayed in a readable, interactive format, with embedded media and direct links to sources.
5. **Actionable Results:** Users receive a comprehensive, easy-to-skim breakdown of their query, empowering them to take the next step in their career journey.

---

## Inspiration

Career research is overwhelming—endless tabs, outdated advice, and generic job boards make it hard to find trustworthy, personalized guidance. We wanted to build a tool that gives anyone instant, research-grade career insights, tailored to their unique background and goals, powered by real-time AI.

## What it does

PathLyst is an AI-powered career research assistant. Users enter their background, skills, interests, and a career question. PathLyst generates a comprehensive, easy-to-read report covering role descriptions, required skills, salary insights, job market trends, and curated learning resources. All sources are cited and clickable, including web articles and YouTube videos.

## How we built it

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion for UI/UX and smooth transitions.
- **Backend:** Next.js API routes.
- **AI Integration:** Perplexity Sonar-Pro API for real-time, trustworthy research.
- **Features:** Multi-step form, animated UI, session-based result storage, and dynamic rendering of citations and embedded media.

## Challenges we ran into

- **Prompt Engineering:** Crafting prompts that consistently yield structured, skimmable, and source-rich responses from the Perplexity API.
- **Citation Handling:** Parsing and rendering diverse citation types (web, YouTube, PDF, Twitter) in a user-friendly way.
- **API Rate Limits:** Managing API usage and error handling for a smooth user experience.
- **UI Polish:** Balancing a modern, animated interface with accessibility and performance.

## Accomplishments that we're proud of

- Seamless integration with Perplexity Sonar-Pro for up-to-date, trustworthy answers.
- Highly personalized, actionable career insights with direct links to resources.
- A delightful, modern UI that makes career research engaging and easy.
- Robust handling of various citation types, including embedded YouTube and Twitter content.

## What we learned

- The power of real-time AI search for career guidance.
- How to design prompts and UI for clarity, trust, and user empowerment.
- Best practices for integrating third-party AI APIs in a production-ready app.
- The importance of actionable, cited information for user trust.

## What's next for PathLyst

- **User Accounts:** Save and track past queries and favorite resources.
- **Deeper Analytics:** Personalized job market trends and salary benchmarking.
- **More Integrations:** LinkedIn, job boards, and portfolio tools.
- **Mobile App:** Bring PathLyst to iOS and Android.
- **Community:** Enable users to share insights and experiences.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🚀 Hackathon Submission Checklist

### 1. Demo Video (3 minutes)
- Demo Video Link: https://www.youtube.com/watch?v=YOUR_VIDEO_ID

### 2. Private Code Repository
- GitHub Repo: https://github.com/YOUR_USERNAME/jobstackr
- Access granted to:
  - james.liounis@perplexity.ai
  - testing@devpost.com

### 3. Detailed README
- You are here! This README includes setup, usage, and hackathon-specific details.

### 4. Perplexity API Usage Explanation

**How Perplexity API is Used:**
- The app uses the [Perplexity Sonar-Pro API](https://docs.perplexity.ai/) to generate research-grade, personalized career insights.
- User input (background, skills, interests, question) is converted into a structured prompt.
- The backend (`/app/api/query/route.js`) sends this prompt to the Perplexity API using the `querySonar` function (`/lib/sonar.js`).
- The response includes a detailed answer and citations, which are rendered in the UI.
- The API enables real-time, up-to-date, and trustworthy career research, including web and YouTube sources when relevant.

### 5. Submission Category

Category:
> Best Use of Perplexity API for Career Guidance / Job Search

### 6. Devpost Submission

- All required fields in the Devpost submission form have been completed.

---

## 📝 Instructions for Judges

- Watch the demo video (first 3 minutes).
- Test the app using the provided repo and instructions.
- See `/lib/sonar.js` and `/app/api/query/route.js` for Perplexity API integration details.

Thank you for reviewing our submission!
