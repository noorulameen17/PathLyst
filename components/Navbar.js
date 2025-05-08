"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-teal-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Sparkles className="h-8 w-8 text-teal-600" />
            <span className="ml-2 text-xl font-bold text-slate-900">
              JobStackr
            </span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how"
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="text-slate-600 hover:text-teal-600 transition-colors"
            >
              Benefits
            </a>
            <a
              href="#audience"
              className="text-slate-600 hover:text-teal-600 transition-colors"
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
  );
}
