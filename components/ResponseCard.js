
export default function ResponseCard({ response }) {
  if (!response) return null;
  
  const { text, citations } = response;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-4">Career Insights</h2>
      
      <div className="prose dark:prose-invert max-w-none">
        {text && (
          <div className="mb-6" dangerouslySetInnerHTML={{ __html: text }} />
        )}
        
        {citations && citations.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">Sources</h3>
            <ul className="list-disc pl-5 space-y-1">
              {citations.map((citation, index) => (
                <li key={index}>
                  <a 
                    href={citation.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-words"
                  >
                    {citation.title || citation.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}