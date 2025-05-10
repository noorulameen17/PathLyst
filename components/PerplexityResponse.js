import React from 'react';
import showdown from 'showdown';
import { FaYoutube, FaTwitter, FaFilePdf, FaLink } from 'react-icons/fa';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import MarkdownRenderer from "./MarkdownRenderer";

function getYouTubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

function getTweetId(url) {
  const match = url.match(/twitter\.com\/(?:#!\/)?\w+\/status\/(\d+)/);
  return match ? match[1] : null;
}

function renderCitation(cite) {
  const { url, title, snippet } = cite;
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isTweet = url.includes('twitter.com');
  const isPDF = url.endsWith('.pdf');

  return (
    <div key={url} className="my-4 p-4 rounded-xl border bg-white shadow-sm space-y-3">
      <div className="flex items-center gap-2 font-semibold text-lg">
        {isYouTube && <FaYoutube className="text-red-600" />}
        {isTweet && <FaTwitter className="text-blue-500" />}
        {isPDF && <FaFilePdf className="text-rose-500" />}
        {!isYouTube && !isTweet && !isPDF && <FaLink className="text-gray-400" />}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {title || url}
        </a>
      </div>
      {snippet && <p className="text-sm text-gray-600">{snippet}</p>}
      {isYouTube && getYouTubeId(url) && (
        <iframe
          className="w-full aspect-video rounded-md"
          src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
          allowFullScreen
        />
      )}
      {isTweet && getTweetId(url) && (
        <TwitterTweetEmbed tweetId={getTweetId(url)} />
      )}
      {isPDF && (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
          className="w-full h-[500px] rounded-md border"
          title="PDF Viewer"
        />
      )}
    </div>
  );
}

export default function PerplexityResponse({ text, citations = [], toolOutputs = [] }) {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg space-y-6">
      {/* AI Response */}
      <div>
        
        <MarkdownRenderer content={text} />
      </div>

      {/* Citations */}
      {citations.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mt-4">📚 Sources</h3>
          <div>
            {citations.map((cite) => renderCitation(cite))}
          </div>
        </div>
      )}

      {/* Tool Outputs */}
      {toolOutputs.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mt-4">🛠 Tool Outputs</h3>
          <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700">
            <pre>{JSON.stringify(toolOutputs, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}