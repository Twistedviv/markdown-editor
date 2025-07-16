/**
 * Custom hook for exporting markdown content to PDF and PNG formats
 * Uses html2canvas for screenshot generation and jsPDF for PDF creation
 * Updated to work with the unified editor interface
 */
import { useAtom } from 'jotai';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import { isExportingAtom, viewModeAtom } from '../store/editorStore';

export const useMarkdownExport = () => {
  const [isExporting, setIsExporting] = useAtom(isExportingAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);

  const exportToPNG = async () => {
    setIsExporting(true);
    
    // Temporarily switch to preview mode for export
    const originalMode = viewMode;
    if (viewMode !== 'preview') {
      setViewMode('preview');
      // Wait for the view to render
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
      const element = document.getElementById('markdown-preview');
      if (!element) {
        throw new Error('Preview element not found');
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `markdown-export-${new Date().toISOString().split('T')[0]}.png`;
      link.href = canvas.toDataURL();
      link.click();

      toast.success('Successfully exported to PNG!');
    } catch (error) {
      console.error('Export to PNG failed:', error);
      toast.error('Failed to export to PNG');
    } finally {
      // Restore original mode
      setViewMode(originalMode);
      setIsExporting(false);
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    
    // Temporarily switch to preview mode for export
    const originalMode = viewMode;
    if (viewMode !== 'preview') {
      setViewMode('preview');
      // Wait for the view to render
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
      const element = document.getElementById('markdown-preview');
      if (!element) {
        throw new Error('Preview element not found');
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`markdown-export-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('Successfully exported to PDF!');
    } catch (error) {
      console.error('Export to PDF failed:', error);
      toast.error('Failed to export to PDF');
    } finally {
      // Restore original mode
      setViewMode(originalMode);
      setIsExporting(false);
    }
  };

  return {
    exportToPNG,
    exportToPDF,
    isExporting,
  };
};