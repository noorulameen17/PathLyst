"use client";

import Loader from "@/components/Loader";
import PerplexityResponse from "@/components/PerplexityResponse";
import { ShimmerButton } from "@/components/ui/Button/shimmer-button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DotWave } from "ldrs/react"; // Add this import
import "ldrs/react/DotWave.css";

export default function ResultPage() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false); // Add loader state
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
      {/* Loader Overlay */}
      {showLoader && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80">
          <DotWave size={64} speed={1} color="black" />
        </div>
      )}
      {/* Back Button */}
      <ShimmerButton
        onClick={() => {
          setShowLoader(true);
          setTimeout(() => {
            setShowLoader(false);
            router.push("/InputForm");
          }, 1200);
        }}
      >
        Back
      </ShimmerButton>
      <PerplexityResponse
        text={responseData.text}
        citations={responseData.citations}
        toolOutputs={responseData.tool_outputs}
      />
    </div>
  );
}
