/**
 * Enhanced toolbar with mode indicator and export functionality
 * Shows current mode and provides export options
 */
import React from 'react';
import { FileImage, FileText, Loader2, Eye, Edit } from 'lucide-react';
import { useAtom } from 'jotai';
import { viewModeAtom } from '../../store/editorStore';
import { useMarkdownExport } from '../../hooks/useMarkdownExport';

const Toolbar: React.FC = () => {
  const [viewMode] = useAtom(viewModeAtom);
  const { exportToPNG, exportToPDF, isExporting } = useMarkdownExport();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">Markdown Editor</h1>
          
          {/* Mode Indicator */}
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-lg">
            {viewMode === 'edit' ? (
              <>
                <Edit className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Edit Mode</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Preview Mode</span>
              </>
            )}
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={exportToPNG}
            disabled={isExporting}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileImage className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Export PNG</span>
          </button>
          
          <button
            onClick={exportToPDF}
            disabled={isExporting}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;