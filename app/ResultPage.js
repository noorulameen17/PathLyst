
import PerplexityResponse from '@/components/PerplexityResponse';

export default function ResultPage({ responseData }) {
  return (
    <div className="max-w-3xl mx-auto my-10">
      <PerplexityResponse
        text={responseData.text}
        citations={responseData.citations}
        toolOutputs={responseData.tool_outputs}
      />
    </div>
  );
}