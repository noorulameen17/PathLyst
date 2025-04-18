"use client";

import { useState } from "react";
import { FiInfo } from "react-icons/fi";

const PERSONAS = [
  {
    label: "👤 I’m a student",
    values: {
      background: "I'm a university student majoring in psychology.",
      skills: "Research, teamwork, communication",
      interests: "Tech, mental health, AI",
      question: "What tech careers fit my background and interests?",
    },
  },
  {
    label: "👩‍💼 Working in non-tech",
    values: {
      background: "I've worked in retail management for 5 years.",
      skills: "Leadership, sales, customer service",
      interests: "Tech, project management",
      question: "How can I transition into a tech project manager role?",
    },
  },
  {
    label: "🔄 Switching careers",
    values: {
      background: "I used to work in sales but now I'm interested in tech.",
      skills: "Negotiation, presentation, Excel",
      interests: "Software development, startups",
      question: "What entry-level tech jobs are a good fit for me?",
    },
  },
  {
    label: "🧓 Returning to work",
    values: {
      background: "I took a career break to raise my family.",
      skills: "Organization, multitasking, budgeting",
      interests: "Remote work, flexible jobs",
      question: "What flexible careers are available for someone returning to work?",
    },
  },
];

function InfoTooltip({ text, link }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative ml-1">
      <button
        type="button"
        aria-label="More info"
        tabIndex={0}
        className="text-blue-500 hover:text-blue-700 focus:outline-none align-middle"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      >
        <FiInfo size={16} />
      </button>
      {show && (
        <div className="absolute z-10 left-6 top-0 bg-white border rounded p-2 text-xs shadow w-56">
          {text}
          {link && (
            <div className="mt-1">
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                See examples
              </a>
            </div>
          )}
        </div>
      )}
    </span>
  );
}

export default function PromptForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    background: "",
    skills: "",
    interests: "",
    question: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePersona = (values) => {
    setFormData(values);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.background.trim()) newErrors.background = "Background is required.";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required.";
    if (!formData.interests.trim()) newErrors.interests = "Interests are required.";
    if (!formData.question.trim()) newErrors.question = "Please enter a question.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitError("Please fill in all required fields.");
      return;
    }
    try {
      onSubmit(formData);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  function getPromptPreview() {
    const { background, skills, interests, question } = formData;
    let context = '';
    if (background) context += `My background: ${background}. `;
    if (skills) context += `My skills include: ${skills}. `;
    if (interests) context += `I'm interested in: ${interests}. `;
    let enhancedQuestion = question || "What career paths should I explore?";
    return `${context}\n\n${enhancedQuestion}`;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Tell us about yourself</h2>

      <div className="flex flex-wrap gap-2 mb-4" aria-label="Preset personas">
        {PERSONAS.map((persona, idx) => (
          <button
            key={idx}
            type="button"
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 border"
            onClick={() => handlePersona(persona.values)}
            aria-label={`Use persona: ${persona.label}`}
          >
            {persona.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="background" className="block text-sm font-medium mb-1">
            Your Background
            <InfoTooltip text="Describe your education, work history, or life experience. E.g., 'I used to work in sales but now I'm interested in tech.'" />
          </label>
          <textarea
            id="background"
            name="background"
            rows={2}
            className={`w-full px-3 py-2 border rounded-md ${errors.background ? "border-red-500" : ""}`}
            placeholder="Current role, years of experience..."
            value={formData.background}
            onChange={handleChange}
            aria-label="Your background"
          />
          <p className="text-xs text-gray-500 italic mt-1">
            Example: “I used to work in sales but now I'm interested in tech.”
          </p>
          {errors.background && <p className="text-xs text-red-600 mt-1">{errors.background}</p>}
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium mb-1">
            Your Skills
            <InfoTooltip
              text="Skills = stuff you’re good at, like public speaking or Python."
              link="https://www.careeronestop.org/Toolkit/Skills/skills-matcher.aspx"
            />
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            className={`w-full px-3 py-2 border rounded-md ${errors.skills ? "border-red-500" : ""}`}
            placeholder="React, Python, Project Management..."
            value={formData.skills}
            onChange={handleChange}
            aria-label="Your skills"
          />
          <p className="text-xs text-gray-500 italic mt-1">
            Example: “Negotiation, Excel, public speaking”
          </p>
          {errors.skills && <p className="text-xs text-red-600 mt-1">{errors.skills}</p>}
        </div>

        <div>
          <label htmlFor="interests" className="block text-sm font-medium mb-1">
            Interests or Industries
            <InfoTooltip text="What fields or topics excite you? E.g., AI, healthcare, sustainability." />
          </label>
          <input
            type="text"
            id="interests"
            name="interests"
            className={`w-full px-3 py-2 border rounded-md ${errors.interests ? "border-red-500" : ""}`}
            placeholder="AI, Healthcare, Sustainability..."
            value={formData.interests}
            onChange={handleChange}
            aria-label="Your interests"
          />
          <p className="text-xs text-gray-500 italic mt-1">
            Example: “AI, healthcare, sustainability”
          </p>
          {errors.interests && <p className="text-xs text-red-600 mt-1">{errors.interests}</p>}
        </div>

        <div>
          <label htmlFor="question" className="block text-sm font-medium mb-1">
            What do you want to know?
            <InfoTooltip text="Ask anything! E.g., 'What career pivots are trending in 2025?'" />
          </label>
          <textarea
            id="question"
            name="question"
            rows={3}
            className={`w-full px-3 py-2 border rounded-md ${errors.question ? "border-red-500" : ""}`}
            placeholder="E.g., What career paths should I explore? Compare AI vs Cybersecurity..."
            value={formData.question}
            onChange={handleChange}
            aria-label="Your question"
          />
          <p className="text-xs text-gray-500 italic mt-1">
            Example: “What entry-level tech jobs are a good fit for me?”
          </p>
          {errors.question && <p className="text-xs text-red-600 mt-1">{errors.question}</p>}
        </div>

        {submitError && (
          <div className="text-red-600 text-sm mb-2">{submitError}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Generate Career Insights
        </button>
      </form>

      <div className="mt-4">
        <button
          type="button"
          className="text-xs text-blue-600 underline"
          onClick={() => setShowPreview((v) => !v)}
          aria-expanded={showPreview}
        >
          {showPreview ? "Hide" : "Show"} prompt preview
        </button>
        {showPreview && (
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm text-gray-700 dark:text-gray-200 border">
            <span className="font-semibold">Here’s what we’ll ask Perplexity for you:</span>
            <br />
            <span className="italic">{getPromptPreview()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
