/**
 * Unified editor component that combines editing and preview in the same area
 * Supports seamless switching between edit and preview modes
 * Provides keyboard shortcuts and smooth transitions
 */
import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { Eye, Edit, Keyboard } from 'lucide-react';
import { markdownContentAtom, viewModeAtom, isPreviewHintVisibleAtom } from '../../store/editorStore';
import MarkdownEditor from './MarkdownEditor';
import MarkdownPreview from './MarkdownPreview';

const UnifiedEditor: React.FC = () => {
  const [content] = useAtom(markdownContentAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [isPreviewHintVisible, setIsPreviewHintVisible] = useAtom(isPreviewHintVisibleAtom);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Show preview hint when user has content and stops typing
  useEffect(() => {
    if (content.trim() && viewMode === 'edit') {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsPreviewHintVisible(true);
      }, 2000);
    } else {
      setIsPreviewHintVisible(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [content, viewMode, setIsPreviewHintVisible]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + P to toggle preview
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setViewMode(mode => mode === 'edit' ? 'preview' : 'edit');
        setIsPreviewHintVisible(false);
      }
      // Escape to go back to edit mode
      if (e.key === 'Escape' && viewMode === 'preview') {
        setViewMode('edit');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, setViewMode, setIsPreviewHintVisible]);

  const toggleViewMode = () => {
    setViewMode(mode => mode === 'edit' ? 'preview' : 'edit');
    setIsPreviewHintVisible(false);
  };

  return (
    <div className="relative w-full h-full">
      {/* Main Content Area */}
      <div className="w-full h-full">
        {viewMode === 'edit' ? <MarkdownEditor /> : <MarkdownPreview />}
      </div>

      {/* Mode Toggle Button */}
      <button
        onClick={toggleViewMode}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-200 z-10 ${
          viewMode === 'edit' 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-gray-800 hover:bg-gray-900 text-white'
        }`}
        title={`Switch to ${viewMode === 'edit' ? 'Preview' : 'Edit'} mode (Ctrl+P)`}
      >
        {viewMode === 'edit' ? (
          <Eye className="w-5 h-5" />
        ) : (
          <Edit className="w-5 h-5" />
        )}
      </button>

      {/* Preview Hint */}
      {isPreviewHintVisible && content.trim() && viewMode === 'edit' && (
        <div className="fixed bottom-20 right-6 bg-black bg-opacity-80 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 animate-fadeIn z-20">
          <Keyboard className="w-4 h-4" />
          <span>Press Ctrl+P to preview your content</span>
          <button
            onClick={() => setIsPreviewHintVisible(false)}
            className="ml-2 text-gray-300 hover:text-white"
          >
            ×
          </button>
        </div>
      )}

      {/* Keyboard Shortcuts Helper */}
      {viewMode === 'preview' && (
        <div className="fixed bottom-6 left-6 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-xs flex items-center space-x-2 z-10">
          <Keyboard className="w-3 h-3" />
          <span>Escape to edit • Ctrl+P to toggle</span>
        </div>
      )}
    </div>
  );
};

export default UnifiedEditor;
