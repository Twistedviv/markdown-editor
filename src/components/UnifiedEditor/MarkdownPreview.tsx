/**
 * Enhanced markdown preview for the unified interface
 * Optimized for full-width single area display
 */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import { useAtom } from 'jotai';
import { markdownContentAtom } from '../../store/editorStore';

const MarkdownPreview: React.FC = () => {
  const [content] = useAtom(markdownContentAtom);

  return (
    <div 
      id="markdown-preview"
      className="w-full h-full overflow-auto bg-white relative"
      style={{ minHeight: 'calc(100vh - 120px)' }}
    >
      {/* Preview Status */}
      <div className="absolute top-4 right-4 bg-green-100 px-3 py-1 rounded text-xs text-green-700 z-10">
        Preview Mode
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {content.trim() === '' ? (
          <div className="text-center py-20">
            <div className="text-gray-500 text-xl mb-2">
              No content to preview
            </div>
            <div className="text-gray-400 text-sm">
              Switch back to edit mode to start writing
            </div>
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
            className="prose prose-slate max-w-none prose-lg"
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-6 text-gray-900 border-b pb-2">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-semibold mb-4 text-gray-800 mt-8">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold mb-3 text-gray-700 mt-6">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-gray-700 leading-relaxed text-base">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 pl-6 list-disc space-y-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 pl-6 list-decimal space-y-1">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700 leading-relaxed">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-400 pl-6 my-6 bg-blue-50 p-4 italic text-gray-600 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600">
                      {children}
                    </code>
                  );
                }
                return <code className={className}>{children}</code>;
              },
              pre: ({ children }) => (
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6 text-sm">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-gray-300 px-4 py-3 bg-gray-100 font-semibold text-left">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-gray-300 px-4 py-3">
                  {children}
                </td>
              ),
              hr: () => (
                <hr className="my-8 border-t-2 border-gray-200" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default MarkdownPreview;
