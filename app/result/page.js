"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PerplexityResponse from "@/components/PerplexityResponse";
import Loader from "@/components/Loader";

export default function ResultPage() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem("jobstackr_result");
      if (data) setResponseData(JSON.parse(data));
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!responseData) {
    return (
      <div className="max-w-3xl mx-auto my-10 text-center text-gray-500">
        No result found. Please submit a query first.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10">
      {/* Back Button */}
      <button
        onClick={() => router.push("/dashboard")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        ← Back
      </button>
      <PerplexityResponse
        text={responseData.text}
        citations={responseData.citations}
        toolOutputs={responseData.tool_outputs}
      />
    </div>
  );
}