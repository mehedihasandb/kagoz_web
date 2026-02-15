import { useState } from "react";
import DOMPurify from "dompurify";

const TruncatedHTML = ({ html }: { html: any }) => {
  const [expanded, setExpanded] = useState(false);
  const cleanHtml = DOMPurify.sanitize(html);
  const paragraphs = cleanHtml.split(/<\/p>/).filter(Boolean);

  const previewHtml = paragraphs.slice(0, 1).join("</p>") + "</p>";

  return (
    <div className="text-gray-800 flex flex-col gap-2">
      <div
        dangerouslySetInnerHTML={{
          __html: expanded ? cleanHtml : previewHtml,
        }}
      />
      {paragraphs.length > 1 && (
        <button
        className="text-green-600 font-medium hover:text-green-700 transition-colors flex items-center hover:cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Read More"}
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      )}
    </div>
  );
};

export default TruncatedHTML
