"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PromptForm from "@/components/promptForm";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [apiError, setApiError] = useState("");
  const router = useRouter();

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
        // Store result in sessionStorage and redirect
        if (typeof window !== "undefined") {
          sessionStorage.setItem("jobstackr_result", JSON.stringify(data));
        }
        router.push("/result");
      }
    } catch (error) {
      setApiError("Network error. Please try again.");
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Career Planning Dashboard</h1>
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300 text-center">
            {apiError}
          </div>
        )}
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <PromptForm onSubmit={handleSubmit} loading={isLoading} />
          </div>
        </div>
      </div>
    </main>
  );
}