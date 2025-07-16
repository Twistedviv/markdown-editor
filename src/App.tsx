import React from 'react';
import { Toaster } from 'react-hot-toast';
import Toolbar from './components/Toolbar';
import UnifiedEditor from './components/UnifiedEditor';
import './styles/highlight.css';
import './styles/animations.css';

const App: React.FC = () => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <Toolbar />
      
      <div className="flex-1 overflow-hidden bg-white">
        <UnifiedEditor />
      </div>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      />
    </div>
  );
};

export default App;