"use client";

import { useState } from "react";
import PromptForm from "@/components/promptForm";
import ResponseCard from "@/components/ResponseCard";
import Loader from "@/components/Loader";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setApiError("");
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setApiError(data.error || "Something went wrong. Please try again.");
        setResponse(null);
      } else {
        setResponse(data);
      }
    } catch (error) {
      setApiError("Network error. Please try again.");
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Career Planning Dashboard</h1>
      {apiError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
          {apiError}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 h-64 flex items-center justify-center text-center">
              <p className="text-gray-500">
                Fill out the form to get personalized career insights
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}