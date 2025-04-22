"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Search,
  BarChart3,
  BookOpen,
  Rocket,
  GraduationCap,
  RefreshCw,
  Brain,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  User,
} from "lucide-react";

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false); // close mobile menu if open
  };

  const features = [
    { title: "Role Description", icon: <Search className="w-5 h-5" /> },
    { title: "Required Skills", icon: <CheckCircle2 className="w-5 h-5" /> },
    { title: "Salary Insights", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Getting Started", icon: <Rocket className="w-5 h-5" /> },
    { title: "Future Demand", icon: <BarChart3 className="w-5 h-5" /> },
    { title: "Learning Resources", icon: <BookOpen className="w-5 h-5" /> },
  ];

  const benefits = [
    {
      icon: <Rocket className="w-6 h-6 text-purple-500" />,
      title: "No more sifting through tabs",
      description:
        "Get everything you need to know about a career in one comprehensive response.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
      title: "Personalized resources",
      description:
        "Discover tailored learning materials to help you level up your skills.",
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "AI that understands you",
      description:
        "Powered by Perplexity's Sonar-Pro model for smart, accurate career guidance.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
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
      icon: <Search className="w-6 h-6 text-white" />,
      title: "Curious Minds",
      description:
        "Explore what's out there and discover exciting career possibilities.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-white" />,
      title: "Decision Makers",
      description:
        "Make informed career moves based on real data and insights.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-slate-900">
                JobStackr
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("features");
                }}
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("how");
                }}
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("benefits");
                }}
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("audience");
                }}
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                Who It's For
              </a>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => scrollToSection("cta")}
              >
                Get Started
              </button>
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-purple-600 transition-colors"
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
              className="md:hidden bg-white border-b border-slate-200"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("features");
                  }}
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("how");
                  }}
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  How It Works
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("benefits");
                  }}
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Benefits
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("audience");
                  }}
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Who It's For
                </a>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors w-full"
                  onClick={() => scrollToSection("cta")}
                >
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
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
                    >
                      Career clarity meets{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                        AI power
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
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="mt-8 flex flex-col sm:flex-row gap-4"
                    >
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center">
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                      <button className="border border-slate-300 hover:border-purple-600 text-slate-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
                        Learn More
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="lg:w-1/2">
              <AnimatePresence>
                {isVisible.hero && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative"
                  >
                    {/* 3D Card with perspective effect */}
                    <motion.div
                      whileHover={{ rotateY: 5, rotateX: -5 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transform perspective-1200"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Top Bar */}
                      <div className="bg-slate-800 p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-white font-medium flex items-center">
                          <Sparkles className="h-4 w-4 text-purple-400 mr-2" />
                          JobStackr
                        </div>
                        <div className="w-16"></div>{" "}
                        {/* Spacer for alignment */}
                      </div>

                      {/* Chat Interface */}
                      <div className="p-6">
                        {/* User Query */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mb-6"
                        >
                          <div className="flex items-start">
                            <div className="bg-slate-200 rounded-full p-2 mr-3">
                              <User className="h-5 w-5 text-slate-600" />
                            </div>
                            <div className="bg-slate-100 rounded-2xl p-4 shadow-sm max-w-[85%]">
                              <p className="text-slate-800 font-medium">
                                I'm interested in becoming a UX Designer. What
                                should I know about this career?
                              </p>
                            </div>
                          </div>
                        </motion.div>

                        {/* AI Response */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          <div className="flex items-start">
                            <div className="bg-purple-600 rounded-full p-2 mr-3">
                              <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="bg-white rounded-2xl p-4 shadow-md border border-slate-100">
                                <div className="flex items-center mb-3">
                                  <div className="font-semibold text-slate-900">
                                    JobStackr AI
                                  </div>
                                  <div className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                                    Powered by Perplexity
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  {/* Introduction */}
                                  <p className="text-slate-700">
                                    Here's what you should know about becoming a
                                    UX Designer:
                                  </p>

                                  {/* Feature Cards */}
                                  <div className="relative">
                                    {/* Active Feature Card */}
                                    <AnimatePresence mode="wait">
                                      {activeFeature === 0 && (
                                        <motion.div
                                          key="role"
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -10 }}
                                          className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100 shadow-sm"
                                        >
                                          <div className="flex items-center mb-2">
                                            <div className="bg-purple-600 rounded-lg p-1.5 mr-2">
                                              <Search className="h-4 w-4 text-white" />
                                            </div>
                                            <h4 className="font-semibold text-purple-900">
                                              Role Description
                                            </h4>
                                          </div>
                                          <p className="text-slate-700">
                                            UX Designers create user-centered
                                            digital products by understanding
                                            user needs, designing intuitive
                                            interfaces, and testing with real
                                            users to improve usability.
                                          </p>
                                        </motion.div>
                                      )}

                                      {activeFeature === 1 && (
                                        <motion.div
                                          key="skills"
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -10 }}
                                          className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 shadow-sm"
                                        >
                                          <div className="flex items-center mb-2">
                                            <div className="bg-blue-600 rounded-lg p-1.5 mr-2">
                                              <CheckCircle2 className="h-4 w-4 text-white" />
                                            </div>
                                            <h4 className="font-semibold text-blue-900">
                                              Required Skills
                                            </h4>
                                          </div>
                                          <div className="flex flex-wrap gap-2">
                                            {[
                                              "Figma",
                                              "User Research",
                                              "Wireframing",
                                              "Prototyping",
                                              "UI Design",
                                              "Empathy",
                                            ].map((skill, i) => (
                                              <span
                                                key={i}
                                                className="bg-white px-2 py-1 rounded-md text-sm border border-blue-100 text-blue-700"
                                              >
                                                {skill}
                                              </span>
                                            ))}
                                          </div>
                                        </motion.div>
                                      )}

                                      {activeFeature === 2 && (
                                        <motion.div
                                          key="salary"
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -10 }}
                                          className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 shadow-sm"
                                        >
                                          <div className="flex items-center mb-2">
                                            <div className="bg-green-600 rounded-lg p-1.5 mr-2">
                                              <BarChart3 className="h-4 w-4 text-white" />
                                            </div>
                                            <h4 className="font-semibold text-green-900">
                                              Salary Insights
                                            </h4>
                                          </div>
                                          <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                              <span className="text-slate-700">
                                                Entry-level:
                                              </span>
                                              <span className="font-medium text-green-700">
                                                $70-85K
                                              </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <span className="text-slate-700">
                                                Mid-level:
                                              </span>
                                              <span className="font-medium text-green-700">
                                                $85-110K
                                              </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <span className="text-slate-700">
                                                Senior:
                                              </span>
                                              <span className="font-medium text-green-700">
                                                $110-150K+
                                              </span>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}

                                      {activeFeature === 3 && (
                                        <motion.div
                                          key="start"
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -10 }}
                                          className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-100 shadow-sm"
                                        >
                                          <div className="flex items-center mb-2">
                                            <div className="bg-amber-600 rounded-lg p-1.5 mr-2">
                                              <Rocket className="h-4 w-4 text-white" />
                                            </div>
                                            <h4 className="font-semibold text-amber-900">
                                              Getting Started
                                            </h4>
                                          </div>
                                          <ol className="list-decimal list-inside space-y-1 text-slate-700">
                                            <li>
                                              Learn design fundamentals &
                                              principles
                                            </li>
                                            <li>
                                              Master tools like Figma & Sketch
                                            </li>
                                            <li>
                                              Build a portfolio with real
                                              projects
                                            </li>
                                            <li>
                                              Network with UX professionals
                                            </li>
                                            <li>
                                              Apply for internships or junior
                                              roles
                                            </li>
                                          </ol>
                                        </motion.div>
                                      )}

                                      {activeFeature === 4 && (
                                        <motion.div
                                          key="demand"
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -10 }}
                                          className="bg-gradient-to-br from-indigo-50 to-violet-50 p-4 rounded-xl border border-indigo-100 shadow-sm"
                                        >
                                          <div className="flex items-center mb-2">
                                            <div className="bg-indigo-600 rounded-lg p-1.5 mr-2">
                                              <BarChart3 className="h-4 w-4 text-white" />
                                            </div>
                                            <h4 className="font-semibold text-indigo-900">
                                              Future Demand
                                            </h4>
                                          </div>
                                          <div className="space-y-2">
                                            <div className="w-full bg-white rounded-full h-2.5">
                                              <div className="bg-indigo-600 h-2.5 rounded-full w-[80%]"></div>
                                            </div>
                                            <p className="text-slate-700">
                                              Growing at 8% annually with strong
                                              demand in tech, healthcare, and
                                              financial services.
                                            </p>
                                          </div>
                                        </motion.div>
                                      )}

                                      {activeFeature === 5 && (
                                        <motion.div
                                          key="resources"
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -10 }}
                                          className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-100 shadow-sm"
                                        >
                                          <div className="flex items-center mb-2">
                                            <div className="bg-rose-600 rounded-lg p-1.5 mr-2">
                                              <BookOpen className="h-4 w-4 text-white" />
                                            </div>
                                            <h4 className="font-semibold text-rose-900">
                                              Learning Resources
                                            </h4>
                                          </div>
                                          <div className="space-y-2 text-slate-700">
                                            <div className="flex items-center">
                                              <CheckCircle2 className="h-4 w-4 text-rose-500 mr-2" />
                                              <span>
                                                Google UX Design Certificate
                                              </span>
                                            </div>
                                            <div className="flex items-center">
                                              <CheckCircle2 className="h-4 w-4 text-rose-500 mr-2" />
                                              <span>
                                                Interaction Design Foundation
                                              </span>
                                            </div>
                                            <div className="flex items-center">
                                              <CheckCircle2 className="h-4 w-4 text-rose-500 mr-2" />
                                              <span>
                                                Nielsen Norman Group Resources
                                              </span>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>

                                  {/* Navigation Dots */}
                                  <div className="flex justify-center space-x-2 pt-2">
                                    {features.map((feature, index) => (
                                      <button
                                        key={index}
                                        onClick={() => setActiveFeature(index)}
                                        className={`w-8 h-1.5 rounded-full transition-colors ${
                                          activeFeature === index
                                            ? "bg-purple-600"
                                            : "bg-slate-200 hover:bg-slate-300"
                                        }`}
                                        aria-label={`View ${feature.title}`}
                                      ></button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Floating Elements */}
                              <motion.div
                                animate={{
                                  y: [0, -8, 0],
                                  rotate: [0, 5, 0],
                                }}
                                transition={{
                                  repeat: Number.POSITIVE_INFINITY,
                                  duration: 5,
                                  ease: "easeInOut",
                                }}
                                className="absolute -top-6 -right-4 bg-blue-500 text-white p-2 rounded-lg shadow-lg transform rotate-12 z-10"
                              >
                                <GraduationCap className="h-5 w-5" />
                              </motion.div>

                              <motion.div
                                animate={{
                                  y: [0, 10, 0],
                                  rotate: [0, -8, 0],
                                }}
                                transition={{
                                  repeat: Number.POSITIVE_INFINITY,
                                  duration: 6,
                                  ease: "easeInOut",
                                  delay: 0.5,
                                }}
                                className="absolute -bottom-4 -left-4 bg-purple-500 text-white p-2 rounded-lg shadow-lg transform -rotate-12 z-10"
                              >
                                <Rocket className="h-5 w-5" />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Background Decorations */}
                    <div className="absolute -bottom-10 -right-10 -z-10 w-64 h-64 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute -top-10 -left-10 -z-10 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
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
                      className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow"
                    >
                      <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <div className="text-purple-600">{feature.icon}</div>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
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
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white"
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
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
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
                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      Ask About Any Career
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Type in your career question, whether it's about a
                      specific role, industry, or career path.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <p className="text-slate-700 text-sm italic">
                        "What does a Data Scientist do and what skills do I
                        need?"
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
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
                          className="absolute inset-0 rounded-full border-t-2 border-purple-600"
                        ></motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Brain className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      Get Comprehensive Insights
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Receive a detailed breakdown of the career, including role
                      description, skills, salary, and more.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <p className="text-slate-700 text-sm">
                          Role Description
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="text-slate-700 text-sm">
                          Required Skills
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <p className="text-slate-700 text-sm">
                          Salary Insights
                        </p>
                      </div>
                    </div>
                  </div>
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
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
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
                      className="bg-white rounded-xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start">
                        <div className="mr-4">{benefit.icon}</div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">
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
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-indigo-700 text-white"
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
                  <h2 className="text-3xl sm:text-4xl font-bold">
                    Perfect For
                  </h2>
                  <p className="mt-4 text-xl text-purple-100 max-w-3xl mx-auto">
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
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                    >
                      <div className="bg-purple-500/50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        {audience.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {audience.title}
                      </h3>
                      <p className="text-purple-100">{audience.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <AnimatePresence>
            {isVisible.cta && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm text-center"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                  Ready to Make Smarter Career Choices?
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                  Stop guessing about your career path. Get clear, actionable
                  insights powered by Perplexity Sonar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center">
                    Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="border border-slate-300 hover:border-purple-600 text-slate-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors">
                    See Demo
                  </button>
                </div>
                <div className="mt-8 text-sm text-slate-500">
                  <p>Powered by Perplexity Sonar — Smarter Career Choices</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      
    </div>
  );
}
