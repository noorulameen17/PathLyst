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
} from "lucide-react";
import PerpIcon from "@/components/ui/perpicon";
import Image from "next/image";

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
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-0">
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mb-12 lg:mb-0">
              <AnimatePresence>
                {isVisible.hero && (
                  <>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight text-center lg:text-left"
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
                      className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl text-center lg:text-left"
                    >
                      Your personal career research assistant. Ask about any
                      career path and get comprehensive insights powered by
                      Perplexity Sonar.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start"
                    >
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center justify-center w-full sm:w-auto">
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                      <button className="border border-slate-300 hover:border-purple-600 text-slate-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors w-full sm:w-auto">
                        Learn More
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-[260px] relative">
              {/* Main image */}
              <div className="relative w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] mx-auto">
                <Image
                  src="/sonar.svg"
                  color="black"
                  fill
                  alt="sonar"
                  className="object-contain"
                  sizes="(max-width: 640px) 220px, 300px"
                />
              </div>
              {/* Logo row: always below image, never overlay */}
              <div className="flex items-center gap-2 sm:gap-4 mt-4">
                className="
                  flex items-center gap-2 sm:gap-4 mt-4
                  lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/3 lg:mt-0
                "
              >
                <div className="w-14 h-14 sm:w-[90px] sm:h-[90px] relative">
                  <Image
                    src="/perplexity.svg"
                    fill
                    alt="perplexity"
                    className="object-contain"
                    sizes="(max-width: 640px) 56px, 90px"
                  />
                </div>
                <div className="p-1 translate-x-1">
                  <X className="w-8 h-8 text-black stroke-[3]" />
                </div>
                <div className="w-14 h-14 sm:w-[90px] sm:h-[90px] relative">
                  <Image
                    src="/perp logo.png"
                    fill
                    alt="perp logo"
                    className="object-contain"
                    sizes="(max-width: 640px) 56px, 90px"
                  />
                </div>
              </div>
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
                </div>
                <div className="mt-8 text-sm text-slate-500 flex items-center justify-center">
                  <Image
                    src="/sonar.svg"
                    width={300}
                    height={300}
                    alt="sonar"
                  ></Image>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
