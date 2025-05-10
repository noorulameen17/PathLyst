import React from "react";
import ReactMarkdown from "react-markdown";
import {
  Briefcase,
  CheckCircle2,
  BarChart3,
  BookOpen,
  TrendingUp,
  Rocket,
  Users,
  Search,
  Info,
} from "lucide-react";

// Map heading text to icons
const headingIcons = {
  "Recommended Job Titles & Career Paths": <Briefcase className="inline w-5 h-5 mr-2 text-teal-700" />,
  "Core Skills and In-Demand Skills": <CheckCircle2 className="inline w-5 h-5 mr-2 text-teal-700" />,
  "Certifications (with sources)": <BookOpen className="inline w-5 h-5 mr-2 text-teal-700" />,
  "Approximate Salary Ranges": <BarChart3 className="inline w-5 h-5 mr-2 text-teal-700" />,
  "Current Industry Trends": <TrendingUp className="inline w-5 h-5 mr-2 text-teal-700" />,
  "Examples of Companies Hiring for These Roles": <Users className="inline w-5 h-5 mr-2 text-teal-700" />,
  "Where to Search for Jobs": <Search className="inline w-5 h-5 mr-2 text-teal-700" />,
  "Useful Resources": <Rocket className="inline w-5 h-5 mr-2 text-teal-700" />,
};

// Always return an icon, fallback to Info 
function getHeadingIcon(children) {
  // Flatten children to string
  const flatten = (child) => {
    if (typeof child === "string") return child;
    if (Array.isArray(child)) return child.map(flatten).join("");
    if (child && child.props && child.props.children) return flatten(child.props.children);
    return "";
  };
  const text = flatten(children).trim();
  return headingIcons[text] || <Info className="inline w-5 h-5 mr-2 text-teal-700" />;
}

function HeadingWithIconAndLine({ as: Tag, children, ...props }) {
  return (
    <>
      <hr className="my-4 border-t border-slate-7700" />
      <Tag className="font-[FKDisplay] font-bold flex items-center" {...props}>
        {getHeadingIcon(children)}
        {children}
      </Tag>
    </>
  );
}

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        h1: (props) => <HeadingWithIconAndLine as="h1" {...props} />,
        h2: (props) => <HeadingWithIconAndLine as="h2" {...props} />,
        h3: (props) => <HeadingWithIconAndLine as="h3" {...props} />,
        h4: (props) => <HeadingWithIconAndLine as="h4" {...props} />,
        h5: (props) => <HeadingWithIconAndLine as="h5" {...props} />,
        h6: (props) => <HeadingWithIconAndLine as="h6" {...props} />,
        li: ({ children, ...props }) => (
          <li className="flex items-start gap-2">
            <span className="text-#000000-700 font-bold mt-1">•</span>
            <span>{children}</span>
          </li>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}