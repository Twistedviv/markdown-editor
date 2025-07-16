/**
 * Enhanced markdown editor for the unified interface
 * Optimized for full-width single area experience
 */
import React, { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { markdownContentAtom, viewModeAtom } from '../../store/editorStore';

const MarkdownEditor: React.FC = () => {
  const [content, setContent] = useAtom(markdownContentAtom);
  const [viewMode] = useAtom(viewModeAtom);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea when switching to edit mode
  useEffect(() => {
    if (viewMode === 'edit' && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [viewMode]);

  const placeholderText = `# Welcome to Markdown Editor

Start typing to see your markdown come to life!

## Basic Syntax

### Headers
# H1 Header
## H2 Header  
### H3 Header

### Text Formatting
**Bold text**
*Italic text*
~~Strikethrough~~
\`Inline code\`

### Lists
- Unordered list item
- Another item

1. Ordered list item
2. Another item

### Links and Images
[Link text](https://example.com)
![Image alt text](https://picsum.photos/200/100)

### Code Blocks
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Blockquotes
> This is a blockquote
> It can span multiple lines

### Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

---

**Quick Tips:**
• Press Ctrl+P anytime to preview your content
• Press Escape while in preview to return to editing
• Use the floating button to toggle between modes`;

  return (
    <div className="w-full h-full relative">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-full p-8 border-none outline-none resize-none font-mono text-sm bg-white leading-relaxed"
        style={{ 
          minHeight: 'calc(100vh - 120px)',
          fontSize: '14px',
          lineHeight: '1.6'
        }}
        spellCheck={false}
      />
      {content.trim() === '' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="p-8 text-gray-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {placeholderText}
          </div>
        </div>
      )}
      
      {/* Editor Status */}
      <div className="absolute top-4 right-4 bg-gray-100 px-3 py-1 rounded text-xs text-gray-600">
        Editing Mode
      </div>
    </div>
  );
};

export default MarkdownEditor;
