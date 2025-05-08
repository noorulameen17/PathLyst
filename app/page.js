"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import HoverButton from "@/components/ui/Button/hover-button";
import { MorphingText } from "@/components/ui/morphing-text";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock,
  Compass,
  GraduationCap,
  Lightbulb,
  Menu,
  RefreshCw,
  Rocket,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    how: false,
    benefits: false,
    audience: false,
    cta: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = ["hero", "features", "how", "benefits", "audience", "cta"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev === 5 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { title: "Role Description", icon: <Briefcase className="w-5 h-5" /> },
    { title: "Required Skills", icon: <CheckCircle2 className="w-5 h-5" /> },
    { title: "Salary Insights", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Getting Started", icon: <Rocket className="w-5 h-5" /> },
    { title: "Future Demand", icon: <TrendingUp className="w-5 h-5" /> },
    { title: "Learning Resources", icon: <BookOpen className="w-5 h-5" /> },
  ];

  const texts = ["Smart", "Career", "Choices?"];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-teal-500" />,
      title: "No more sifting through tabs",
      description:
        "Get everything you need to know about a career in one comprehensive response.",
    },
    {
      icon: <Target className="w-6 h-6 text-teal-500" />,
      title: "Personalized resources",
      description:
        "Discover tailored learning materials to help you level up your skills.",
    },
    {
      icon: <Brain className="w-6 h-6 text-teal-500" />,
      title: "AI that understands you",
      description:
        "Powered by Perplexity's Sonar-Pro model for smart, accurate career guidance.",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-teal-500" />,
      title: "Simple, helpful, no B.S.",
      description:
        "Clear, straightforward advice without the fluff or corporate jargon.",
    },
  ];

  const audiences = [
    {
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      title: "Students & Fresh Grads",
      description:
        "Discover career paths that match your education and interests.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-white" />,
      title: "Career Switchers",
      description:
        "Find out how your existing skills transfer to new industries.",
    },
    {
      icon: <Compass className="w-6 h-6 text-white" />,
      title: "Curious Minds",
      description:
        "Explore what's out there and discover exciting career possibilities.",
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "Decision Makers",
      description:
        "Make informed career moves based on real data and insights.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-teal-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="./logo.svg"
                alt="Sonar Logo"
                className="h-42 w-auto mr-2"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-slate-600 font-[FKDisplay] hover:text-teal-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how"
                className="text-slate-600 font-[FKDisplay] hover:text-teal-600 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#benefits"
                className="text-slate-600 font-[FKDisplay] hover:text-teal-600 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#audience"
                className="text-slate-600 font-[FKDisplay] hover:text-teal-600 transition-colors"
              >
                Who It's For
              </a>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors">
                Get Started
              </button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-teal-600 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-teal-100"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <a
                  href="#features"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-600 hover:text-teal-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#how"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-600 hover:text-teal-600 transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#benefits"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-600 hover:text-teal-600 transition-colors"
                >
                  Benefits
                </a>
                <a
                  href="#audience"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-600 hover:text-teal-600 transition-colors"
                >
                  Who It's For
                </a>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors w-full">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <AnimatePresence>
                {isVisible.hero && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium mb-4"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      <span>AI-Powered Career Guidance</span>
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-4xl font-[FKDisplay] sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
                    >
                      Career Clarity Meets{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-700">
                        AI Power
                      </span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mt-6 text-xl text-slate-600 max-w-2xl"
                    >
                      Your personal career research assistant. Ask about any
                      career path and get comprehensive insights powered by
                      Perplexity Sonar.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="mt-8 flex flex-col sm:flex-row gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center shadow-lg shadow-teal-200"
                      >
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="border-2 border-teal-300 hover:border-teal-500 text-teal-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="lg:w-1/2 flex flex-col items-center">
              <img
                src="./sonar.svg"
                alt="Sonar Logo"
                className="w-68 h-auto mb-4"
              />
              <div className="flex items-center">
                <img
                  src="./perplexity.svg"
                  alt="Perplexity Logo"
                  className="w-24 h-auto"
                />
                <X className="h-6 w-6 text-slate-800 translate-x-1 mx-6" />
                <img
                  src="./perp logo.png"
                  alt="Perplexity Logo"
                  className="w-24 h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence>
            {isVisible.features && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-16"
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium mb-4">
                    <Sparkles className="h-4 w-4 mr-2" />
                    <span>Comprehensive Career Insights</span>
                  </div>
                  <h2 className="text-3xl font-[FKDisplay] sm:text-4xl font-bold text-slate-900">
                    What JobStackr Does
                  </h2>
                  <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                    Your personal career research assistant that breaks down any
                    career path like a pro.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="bg-teal-50 rounded-xl p-6 border border-teal-200 hover:shadow-md transition-shadow"
                    >
                      <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <div className="text-teal-600">{feature.icon}</div>
                      </div>
                      <h3 className="text-xl font-[FKDisplay] font-semibold text-slate-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600">
                        {index === 0 &&
                          "Get a clear understanding of what the role entails and its responsibilities."}
                        {index === 1 &&
                          "Discover the essential skills and qualifications needed to succeed."}
                        {index === 2 &&
                          "Learn about compensation ranges across experience levels and locations."}
                        {index === 3 &&
                          "Find out the best path to enter the field and build your career."}
                        {index === 4 &&
                          "Understand job market trends and long-term career prospects."}
                        {index === 5 &&
                          "Access curated learning materials to develop necessary skills."}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-50 to-white"
      >
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence>
            {isVisible.how && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-16"
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Simple Process</span>
                  </div>
                  <h2 className="text-3xl font-[FKDisplay] sm:text-4xl font-bold text-slate-900">
                    How It Works
                  </h2>
                  <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                    Simple, intuitive, and powered by advanced AI to give you
                    the career insights you need.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl p-6 border border-teal-200 shadow-sm"
                  >
                    <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                      1
                    </div>
                    <h3 className="text-xl font-[FKDisplay] font-semibold text-slate-900 mb-2">
                      Ask About Any Career
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Type in your career question, whether it's about a
                      specific role, industry, or career path.
                    </p>
                    <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                      <p className="text-slate-700 text-sm italic">
                        "What does a Data Scientist do and what skills do I
                        need?"
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl p-6 border border-teal-200 shadow-sm"
                  >
                    <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                      2
                    </div>
                    <h3 className="text-xl font-[FKDisplay] font-semibold text-slate-900 mb-2">
                      AI Processes Your Query
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Perplexity's Sonar-Pro model analyzes your question and
                      searches for the most relevant, up-to-date information.
                    </p>
                    <div className="flex justify-center">
                      <div className="relative w-16 h-16">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 3,
                            ease: "linear",
                          }}
                          className="absolute inset-0 rounded-full border-t-2 border-teal-600"
                        ></motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Brain className="w-8 h-8 text-teal-600" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl p-6 border border-teal-200 shadow-sm"
                  >
                    <div className="bg-teal-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                      3
                    </div>
                    <h3 className="text-xl font-[FKDisplay] font-semibold text-slate-900 mb-2">
                      Get Comprehensive Insights
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Receive a detailed breakdown of the career, including role
                      description, skills, salary, and more.
                    </p>
                    <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                        <p className="text-slate-700 text-sm">
                          Role Description
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                        <p className="text-slate-700 text-sm">
                          Required Skills
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-teal-700 rounded-full"></div>
                        <p className="text-slate-700 text-sm">
                          Salary Insights
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence>
            {isVisible.benefits && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-16"
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-medium mb-4">
                    <Zap className="h-4 w-4 mr-2" />
                    <span>Why Users Love Us</span>
                  </div>
                  <h2 className="text-3xl font-[FKDisplay] sm:text-4xl font-bold text-slate-900">
                    Why JobStackr Slaps
                  </h2>
                  <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                    Career research that's actually helpful, not overwhelming.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-xl p-6 border border-teal-200 shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start">
                        <div className="bg-teal-100 rounded-full p-3 mr-4">
                          <div className="text-teal-600">{benefit.icon}</div>
                        </div>
                        <div>
                          <h3 className="text-xl font-[FKDisplay] font-semibold text-slate-900 mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-slate-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Audience Section */}
      <section
        id="audience"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-600 to-teal-800 text-black"
      >
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence>
            {isVisible.audience && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-16"
                >
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500 text-white text-sm font-medium mb-4">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Target Audience</span>
                  </div>
                  <h2 className="text-3xl text-white font-[FKDisplay] sm:text-4xl font-bold">
                    Perfect For
                  </h2>
                  <p className="mt-4 text-xl text-teal-100 max-w-3xl mx-auto">
                    JobStackr helps anyone looking to make informed career
                    decisions.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  {audiences.map((audience, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ y: -5 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                    >
                      <div className="bg-teal-500/50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        {audience.icon}
                      </div>
                      <h3 className="text-xl font-[FKDisplay] text-white font-semibold mb-2">
                        {audience.title}
                      </h3>
                      <p className="text-teal-100">{audience.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section as Footer */}
      <footer
        id="cta"
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-slate-800"></div>
        <BackgroundBeams className="z-0 absolute inset-0" />

        {/* Rotating Star */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32 flex items-center justify-center pointer-events-none"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 100,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <img src="./Star1.svg" alt="Perplexity Logo" className="w-24 h-24" />
        </motion.div>

        {/* Rotating Star */}
        <motion.div
          className="absolute bottom-0 right-0 w-32 h-32 flex items-center justify-center pointer-events-none"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 200,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <img src="./Star1.svg" alt="Perplexity Logo" className="w-24 h-24" />
        </motion.div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <AnimatePresence>
            {isVisible.cta && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Decorative elements */}
                <div className="bg-slate-800 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                    <div className="lg:col-span-3 text-left">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500 text-slate-50 text-sm font-medium mb-4">
                          <Sparkles className="h-4 w-4 mr-2" />
                          <span>AI-Powered Career Guidance</span>
                        </div>
                        <h2 className="text-3xl font-[FKDisplay] sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                          <span className="text-blue-400">Ready</span> to Make
                        </h2>
                        <div className="flex justify-center mb-4 -translate-x-32 text-white">
                          <MorphingText texts={texts} />
                        </div>
                        <p className="text-lg text-purple-100 mb-6 max-w-2xl">
                          Stop guessing about your career path. Get clear,
                          actionable insights powered by Perplexity Sonar that
                          help you make confident decisions about your future.
                        </p>

                        <div className="space-y-4 mb-8">
                          {[
                            {
                              icon: <Search className="h-5 w-5" />,
                              text: "Discover ideal career paths based on your skills and interests",
                            },
                            {
                              icon: <BarChart3 className="h-5 w-5" />,
                              text: "Get accurate salary insights and market demand data",
                            },
                            {
                              icon: <BookOpen className="h-5 w-5" />,
                              text: "Access personalized learning resources and roadmaps",
                            },
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: 0.5 + index * 0.1,
                              }}
                              className="flex items-start"
                            >
                              <div className="flex-shrink-0 h-6 w-6 rounded-full text-white flex items-center justify-center mr-3">
                                {item.icon}
                              </div>
                              <p className="text-purple-100">{item.text}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <div className="lg:col-span-2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-gradient-to-br from-slate-400 to-blue-400 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-xl relative overflow-hidden"
                      >
                        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-slate-200 to-blue-500 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-br from-slate-200 to-blue-500 rounded-full blur-xl"></div>

                        <div className="text-center">
                          <motion.div
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-200 to-blue-500 flex items-center justify-center"
                          >
                            <Rocket className="h-10 w-10 text-white" />
                          </motion.div>

                          <h3 className="text-2xl font-bold text-white font-[FKDisplay] mb-4">
                            Start Your Journey
                          </h3>
                          <div className="flex justify-center mb-4">
                            <img
                              src="./sonar.svg"
                              alt="Sonar Logo"
                              className="w-48 h-auto mb-4"
                            />
                          </div>
                          <Link href="/InputForm">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="w-full flex items-center justify-center group"
                            >
                              <HoverButton>Get Started </HoverButton>
                              <motion.div
                                initial={{ x: 0 }}
                                animate={{ x: [0, 5, 0] }}
                                transition={{
                                  duration: 1,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "reverse",
                                  ease: "easeInOut",
                                }}
                              ></motion.div>
                            </motion.button>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex space-x-6">
                      <div className="flex items-center text-purple-200">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        <span className="text-sm">AI-Powered</span>
                      </div>
                      <div className="flex items-center text-purple-200">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        <span className="text-sm">Real-time Data</span>
                      </div>
                      <div className="flex items-center text-purple-200">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        <span className="text-sm">Personalized</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>
    </div>
  );
}
