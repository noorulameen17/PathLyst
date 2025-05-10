"use client";

import AiButton from "@/components/ui/Button/aiButton";
import { ShimmerButton } from "@/components/ui/Button/shimmer-button";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { DotWave } from "ldrs/react"; // Add this import
import "ldrs/react/DotStream.css";
import "ldrs/react/DotWave.css";
import {
  BookOpen,
  Briefcase,
  Code,
  GraduationCap,
  HelpCircle,
  Info,
  Lightbulb,
  RefreshCw,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CareerDashboard() {
  const [activeStep, setActiveStep] = useState(0);
  const [userType, setUserType] = useState(null);
  const [background, setBackground] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [question, setQuestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");
  const textareaRef = useRef(null);
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false); // Add loader state

  const steps = [
    { id: 0, name: "Background", icon: <BookOpen className="w-5 h-5" /> },
    { id: 1, name: "Skillset", icon: <Code className="w-5 h-5" /> },
    { id: 2, name: "Interests", icon: <Lightbulb className="w-5 h-5" /> },
    { id: 3, name: "Question", icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const userTypes = [
    {
      id: "student",
      label: "Student",
      icon: <GraduationCap className="w-4 h-4" />,
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
      id: "nonTech",
      label: "Non-Tech Pro",
      icon: <Briefcase className="w-4 h-4" />,
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
      id: "switcher",
      label: "Career Switcher",
      icon: <RefreshCw className="w-4 h-4" />,
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
      id: "returner",
      label: "Career Returner",
      icon: <User className="w-4 h-4" />,
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

  const stepFields = [
    {
      key: "background",
      label: "Background",
      placeholder:
        "E.g. I'm a final-year CS student passionate about building things.",
      type: "textarea",
      value: background,
      onChange: (e) => setBackground(e.target.value),
      example:
        "I’m a Full Stack Developer with 2 years of freelance experience.",
      tip: "Tip: Mention your education, past roles, or anything that shaped your journey.",
    },
    {
      key: "skills",
      label: "Skillset",
      placeholder: "E.g. TypeScript, React, Tailwind, Git, Teamwork",
      type: "input",
      value: skills,
      onChange: (e) => setSkills(e.target.value),
      example: "JavaScript, UI/UX, Team collaboration, API integration",
      tip: "Tip: List both tech and soft skills — anything you're confident putting on a resume.",
    },
    {
      key: "interests",
      label: "Interests",
      placeholder:
        "E.g. Building AI tools, automating workflows, clean UI design",
      type: "input",
      value: interests,
      onChange: (e) => setInterests(e.target.value),
      example: "AI Agents, Web Dev, Productivity Tools",
      tip: "Tip: What gets you hyped? Could be domains (like AI) or hobbies that influence your goals.",
    },
    {
      key: "question",
      label: "Question",
      placeholder: "E.g. What’s the fastest route into frontend dev in 2025?",
      type: "textarea",
      value: question,
      onChange: (e) => setQuestion(e.target.value),
      example: "What tech career suits someone with design + coding skills?",
      tip: "Tip: Ask what's really on your mind — career, skills, salary, trends, anything.",
    },
  ];

  useEffect(() => {
    // Auto-resize textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [question]);

  const handleGenerate = async () => {
    // Validation: all fields required
    if (
      !background.trim() ||
      !skills.trim() ||
      !interests.trim() ||
      !question.trim()
    ) {
      setValidationMsg("Please fill in all fields before generating insights.");
      return;
    }
    setIsGenerating(true);
    setShowPreview(false);
    setValidationMsg("");

    const formData = { background, skills, interests, question };

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();
      if (data && !data.error) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("jobstackr_result", JSON.stringify(data));
        }
        router.push("/result");
      } else {
        setValidationMsg("Failed to generate insights. Please try again.");
      }
    } catch (err) {
      setValidationMsg("Error generating insights. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNext = () => {
    // Validation for each step before proceeding
    let valid = true;
    let msg = "";
    if (activeStep === 0 && !background.trim()) {
      valid = false;
      msg = "Please fill in your background before continuing.";
    } else if (activeStep === 1 && !skills.trim()) {
      valid = false;
      msg = "Please fill in your skillset before continuing.";
    } else if (activeStep === 2 && !interests.trim()) {
      valid = false;
      msg = "Please fill in your interests before continuing.";
    }
    if (!valid) {
      setValidationMsg(msg);
      setTimeout(() => setValidationMsg(""), 3000);
      return;
    }
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 relative">
      {/* FlickeringGrid fills entire background */}
      <FlickeringGrid
        className="fixed inset-0 z-0 pointer-events-none"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      {/* Loader Overlay */}
      {showLoader && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80">
          <DotWave size={64} speed={1} color="black" />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden relative z-10"
      >
        {/* Responsive Logo at the Top */}
        <div className="w-full font-bold text-3xl font-[FKDisplay] flex justify-center p-1 -mb-1 mt-4">
          <h1>PathLyst</h1>
        </div>
        {/* Progress Steps */}
        <div className="px-6 pt-4">
          <div className="relative flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep >= step.id
                      ? "bg-teal-800 text-white"
                      : "bg-slate-100 text-slate-400"
                  } transition-colors duration-300`}
                >
                  {step.icon}
                </motion.div>
                <span
                  className={`text-xs mt-1 ${
                    activeStep >= step.id
                      ? "text-teal-800 font-medium"
                      : "text-slate-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            ))}

            {/* Progress Bar */}
            <div className="absolute h-1 bg-slate-100 left-0 right-0 top-5 -z-0">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: `${(activeStep / (steps.length - 1)) * 100}%`,
                }}
                className="h-full bg-teal-800"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Validation Popup */}
          <AnimatePresence>
            {validationMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm flex items-center justify-between"
              >
                <span>{validationMsg}</span>
                <button
                  className="ml-3 px-2 py-0.5 rounded bg-red-200 hover:bg-red-300"
                  onClick={() => setValidationMsg("")}
                  aria-label="Close"
                >
                  ×
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-slate-600 mb-3">
                    Select your current status:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {userTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setUserType(type.id);
                          setBackground(type.values.background);
                          setSkills(type.values.skills);
                          setInterests(type.values.interests);
                          setQuestion(type.values.question);
                        }}
                        className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                          userType === type.id
                            ? "border-teal-800 bg-teal-50 text-teal-800"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-full ${
                            userType === type.id
                              ? "bg-blue-100"
                              : "bg-slate-100"
                          }`}
                        >
                          {type.icon}
                        </div>
                        <span className="text-sm font-medium">
                          {type.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  {/* Now place the Input and other fields here, outside the map */}
                  <Label className="text-sm font-medium mb-2 flex items-center gap-1">
                    {stepFields[0].label}
                  </Label>
                  <Input
                    type="text"
                    value={background}
                    onChange={stepFields[0].onChange}
                    placeholder={stepFields[0].placeholder}
                    className="w-full p-3 text-sm border-2 border-slate-200 rounded-lg focus:border-teal-800 focus:ring-0 focus:outline-none transition-all"
                  />
                  <div className="text-xs text-slate-500 italic">
                    Example: &quot;{stepFields[0].example}&quot;
                  </div>
                  <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {stepFields[0].tip}
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep > 0 && activeStep < 3 && (
              <motion.div
                key={`step${activeStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-medium mb-2 flex items-center gap-1">
                    {stepFields[activeStep].label}
                  </Label>
                  <Input
                    type="text"
                    value={stepFields[activeStep].value}
                    onChange={stepFields[activeStep].onChange}
                    placeholder={stepFields[activeStep].placeholder}
                    className="w-full p-3 text-sm border-2 border-slate-200 rounded-lg focus:border-teal-800 focus:ring-0 focus:outline-none transition-all"
                  />
                  <div className="text-xs text-slate-500 italic">
                    Example: &quot;{stepFields[activeStep].example}&quot;
                  </div>
                  <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {stepFields[activeStep].tip}
                  </div>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-3 mb-6">
                  <Label className="text-sm font-medium mb-2 flex items-center gap-1">
                    {stepFields[3].label}
                  </Label>
                  <Input
                    type="text"
                    value={question}
                    onChange={stepFields[3].onChange}
                    placeholder={stepFields[3].placeholder}
                    className="w-full p-3 text-sm border-2 border-slate-200 rounded-lg focus:border-teal-800 focus:ring-0 focus:outline-none transition-all"
                  />
                  <div className="text-xs text-slate-500 italic">
                    Example: &quot;{stepFields[3].example}&quot;
                  </div>
                  <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {stepFields[3].tip}
                  </div>
                </div>
                {/* Replace button with AiButton */}
                <AiButton
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  isLoading={isGenerating}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 button-container">
            {/* Back Button */}
            <button
              type="button"
              className="button-3d"
              onClick={handlePrev}
              disabled={activeStep === 0}
              aria-label="Back"
            >
              <div className="button-top">
                <span className="material-icons">❮</span>
              </div>
              <div className="button-bottom"></div>
              <div className="button-base"></div>
            </button>

            {/* Next Button */}
            <button
              type="button"
              className="button-3d"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
              aria-label="Next"
            >
              <div className="button-top">
                <span className="material-icons">❯</span>
              </div>
              <div className="button-bottom"></div>
              <div className="button-base"></div>
            </button>
          </div>
          {/* Add ShinyButton as Back to Home */}
          <div className="flex justify-center mt-8">
            <ShimmerButton
              onClick={() => {
                setShowLoader(true);
                setTimeout(() => {
                  setShowLoader(false);
                  router.push("/");
                }, 1200); // show loader for 1.2s before navigating
              }}
              className="bg-slate-300 hover:bg-slate-500 text-white transition-all duration-300"
            >
              Back to Home
            </ShimmerButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
