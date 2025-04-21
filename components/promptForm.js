"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Info,
  User,
  Briefcase,
  Sparkles,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { DotStream } from "ldrs/react";
import "ldrs/react/DotStream.css";

// ShadCN-inspired Tooltip
function Tooltip({ text, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <span
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        tabIndex={0}
        className="align-middle focus:outline-none"
      >
        {children}
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-8 top-0 z-20 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-xs text-gray-700 dark:text-gray-200"
            role="tooltip"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const steps = [
  {
    label: "Background",
    icon: <User className="w-5 h-5 mr-2 text-blue-600" />,
    field: "background",
    placeholder:
      "E.g. I'm a final-year CS student passionate about building things.",
    tooltip:
      "Drop a quick intro — education, past roles, or anything that shaped your journey.",
    type: "textarea",
    example: "I’m a Full Stack Developer with 2 years of freelance experience.",
  },
  {
    label: "Skillset",
    icon: <Sparkles className="w-5 h-5 mr-2 text-green-600" />,
    field: "skills",
    placeholder: "E.g. TypeScript, React, Tailwind, Git, Teamwork",
    tooltip:
      "List both tech and soft skills — anything you're confident putting on a resume or flexing in a project.",
    type: "input",
    example: "JavaScript, UI/UX, Team collaboration, API integration",
  },
  {
    label: "Interests",
    icon: <Briefcase className="w-5 h-5 mr-2 text-purple-600" />,
    field: "interests",
    placeholder:
      "E.g. Building AI tools, automating workflows, clean UI design",
    tooltip:
      "What gets you hyped? Could be domains (like AI) or even hobbies that influence your goals.",
    type: "input",
    example: "AI Agents, Web Dev, Productivity Tools",
  },
  {
    label: "Question",
    icon: <HelpCircle className="w-5 h-5 mr-2 text-orange-600" />,
    field: "question",
    placeholder: "E.g. What’s the fastest route into frontend dev in 2025?",
    tooltip:
      "Ask what's *really* on your mind — career, skills, salary, trends, anything.",
    type: "textarea",
    example: "What tech career suits someone with design + coding skills?",
  },
];

const personas = [
  {
    label: "Student",
    icon: <User className="w-4 h-4 mr-1" />,
    values: {
      background:
        "I'm a recent CS grad passionate about building cool things on the web.",
      skills: "HTML, CSS, JavaScript, React, Python, Git",
      interests: "AI Agents, Frontend Engineering, Side Projects",
      question:
        "What career paths can help me grow into a frontend engineer?",
    },
  },
  {
    label: "Non-Tech Pro ",
    icon: <Briefcase className="w-4 h-4 mr-1" />,
    values: {
      background:
        "I’ve led retail teams for 5 years and excel at operations and people management.",
      skills: "Leadership, team coordination, sales strategy",
      interests: "Agile, Product Management, Tech Transitioning",
      question:
        "How can I pivot into a tech-focused project or product manager role?",
    },
  },
  {
    label: "Career Switcher",
    icon: <Sparkles className="w-4 h-4 mr-1" />,
    values: {
      background:
        "My background is in B2B sales, but I'm now learning to code.",
      skills: "Negotiation, CRM tools, basic JavaScript & SQL",
      interests: "SaaS, Web Dev, Tech Startups",
      question:
        "What beginner-friendly tech roles can help me transition into software development?",
    },
  },
  {
    label: "Career Returner",
    icon: <CheckCircle className="w-4 h-4 mr-1" />,
    values: {
      background:
        "I paused my career for a few years to take care of family, now I’m ready for a comeback.",
      skills: "Time management, budgeting, scheduling, soft skills",
      interests: "Remote tech jobs, flexible hours, online learning",
      question:
        "Which remote tech careers are best for someone returning to the workforce?",
    },
  },
];

function getPromptPreview(formData) {
  const { background, skills, interests, question } = formData;
  let context = "";
  if (background) context += `My background: ${background}. `;
  if (skills) context += `My skills include: ${skills}. `;
  if (interests) context += `I'm interested in: ${interests}. `;
  // Only show question if user has typed it
  if (question && question.trim()) {
    return `${context}\n\n${question}`;
  }
  return context;
}

export default function PromptForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    background: "",
    skills: "",
    interests: "",
    question: "",
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(true);

  // Validation
  function validate(currentStep = step) {
    const field = steps[currentStep].field;
    if (!formData[field] || !formData[field].trim()) {
      return { [field]: `${steps[currentStep].label} is required.` };
    }
    return {};
  }

  // Step navigation
  function nextStep() {
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  }
  function prevStep() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  // Persona quick-fill
  function handlePersona(values) {
    setFormData(values);
    setStep(0);
    setErrors({});
  }

  // Input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  // Prevent Enter key from submitting the form except on the last step
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Always prevent Enter from submitting
      if (step < steps.length - 1) {
        nextStep();
      }
      // On last step, do nothing (force explicit button click)
    }
  }

  // Final submit
  function handleSubmit(e) {
    e.preventDefault();
    let validation = {};
    steps.forEach((s) => {
      if (!formData[s.field] || !formData[s.field].trim()) {
        validation[s.field] = `${s.label} is required.`;
      }
    });
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      onSubmit(formData);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          JobStackr Career Wizard
        </h2>
        <button
          onClick={() => setShowPreview((v) => !v)}
          className="text-xs text-blue-600 hover:underline focus:outline-none"
          aria-expanded={showPreview}
        >
          {showPreview ? "Hide" : "Show"} Prompt Preview
        </button>
      </div>

      {/* Persona Quick-Fill */}
      <div className="flex flex-wrap gap-2 mb-6">
        {personas.map((persona, idx) => (
          <button
            key={idx}
            type="button"
            className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 border border-gray-200 dark:border-gray-700 transition"
            onClick={() => handlePersona(persona.values)}
            aria-label={`Use persona: ${persona.label}`}
          >
            {persona.icon}
            {persona.label}
          </button>
        ))}
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, idx) => (
          <div key={s.field} className="flex-1 flex flex-col items-center">
            <div
              className={`rounded-full border-2 w-8 h-8 flex items-center justify-center mb-1 transition-all
                ${
                  idx === step
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900"
                    : "border-gray-300 bg-gray-100 dark:bg-gray-800"
                }
                ${
                  idx < step
                    ? "border-green-500 bg-green-50 dark:bg-green-900"
                    : ""
                }
              `}
            >
              {idx < step ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                s.icon
              )}
            </div>
            <span
              className={`text-xs ${
                idx === step ? "font-semibold text-blue-700" : "text-gray-500"
              }`}
            >
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Animated Step Form */}
      <form onSubmit={handleSubmit} autoComplete="off">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="mb-6"
          >
            <label
              htmlFor={steps[step].field}
              className="text-sm font-medium mb-2 flex items-center gap-1"
            >
              {steps[step].icon}
              {steps[step].label}
              <Tooltip text={steps[step].tooltip}>
                <Info className="w-4 h-4 text-blue-400 hover:text-blue-600 cursor-pointer" />
              </Tooltip>
            </label>
            {steps[step].type === "textarea" ? (
              <textarea
                id={steps[step].field}
                name={steps[step].field}
                rows={step === 0 ? 2 : 3}
                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                  ${
                    errors[steps[step].field]
                      ? "border-red-500"
                      : "border-gray-300"
                  }
                `}
                placeholder={steps[step].placeholder}
                value={formData[steps[step].field]}
                onChange={handleChange}
                aria-label={steps[step].label}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <input
                type="text"
                id={steps[step].field}
                name={steps[step].field}
                className={`w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
                  ${
                    errors[steps[step].field]
                      ? "border-red-500"
                      : "border-gray-300"
                  }
                `}
                placeholder={steps[step].placeholder}
                value={formData[steps[step].field]}
                onChange={handleChange}
                aria-label={steps[step].label}
                onKeyDown={handleKeyDown}
              />
            )}
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <span className="italic">Example: “{steps[step].example}”</span>
              {errors[steps[step].field] && (
                <span className="ml-3 text-red-600">
                  {errors[steps[step].field]}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 3D Navigation Buttons */}
        <div className="button-container">
          {step > 0 && (
            <button
              type="button"
              className="button-3d"
              onClick={prevStep}
              disabled={loading}
              aria-label="Back"
            >
              <div className="button-top">
                <span className="material-icons">❮</span>
              </div>
              <div className="button-bottom"></div>
              <div className="button-base"></div>
            </button>
          )}
          {step < steps.length - 1 && (
            <button
              type="button"
              className="button-3d"
              onClick={nextStep}
              disabled={loading}
              aria-label="Next"
            >
              <div className="button-top">
                <span className="material-icons">❯</span>
              </div>
              <div className="button-bottom"></div>
              <div className="button-base"></div>
            </button>
          )}
        </div>

        {/* Separate Generate Button */}
        {step === steps.length - 1 && (
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow disabled:opacity-50 min-w-[220px]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <DotStream size={28} speed={2.5} color="white" />
                  Generating...
                </span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Generate Career Insights
                </>
              )}
            </button>
          </div>
        )}
      </form>

      {/* Live Prompt Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
            className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 shadow-inner"
          >
            <span className="font-semibold flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Live Prompt Preview:
            </span>
            <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-gray-800 dark:text-gray-100">
              {getPromptPreview(formData)}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

