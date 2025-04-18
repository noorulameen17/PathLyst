export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-sans">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">JobStackr</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your AI-powered career planning assistant that delivers personalized, 
            citation-backed career insights in seconds.
          </p>
          <a 
            href="/dashboard" 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block"
          >
            Start Planning Your Career
          </a>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Smart Prompting</h2>
            <p>Converts your skills, experience, and interests into research-grade questions.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">AI-Powered Answers</h2>
            <p>Get personalized, up-to-date career suggestions using Perplexity's Sonar-Large-Online model.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">Citations + Real Data</h2>
            <p>Each response includes links to credible sources and current salary statistics.</p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Who Uses JobStackr?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Students</h3>
              <p>Exploring mixed domains like AI + design or data science + marketing.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Professionals</h3>
              <p>Looking to pivot careers, such as frontend dev to AI product manager.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Curious Minds</h3>
              <p>Comparing future tech jobs and exploring emerging career opportunities.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
