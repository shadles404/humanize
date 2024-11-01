import React, { useState } from 'react';
import { Bot, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { TextArea } from './components/TextArea';
import { humanizeText } from './utils/textTransformer';

function App() {
  const [aiText, setAiText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleHumanize = () => {
    setIsLoading(true);
    // Simulate API processing time
    setTimeout(() => {
      setHumanizedText(humanizeText(aiText));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black p-6 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Bot className="w-10 h-10 text-indigo-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              AI Text Humanizer
            </h1>
            <Zap className="w-8 h-8 text-indigo-400 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg">Transform robotic AI text into natural, human-like writing</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <TextArea
            label="AI-Generated Text"
            value={aiText}
            onChange={(e) => setAiText(e.target.value)}
            placeholder="Paste your AI-generated text here..."
          />

          <TextArea
            label="Humanized Text"
            value={humanizedText}
            placeholder="Your humanized text will appear here..."
            readOnly
            showCopy
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleHumanize}
            disabled={!aiText || isLoading}
            className="group relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-2">
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              <span className="text-lg">
                {isLoading ? 'Humanizing...' : 'Humanize Text'}
              </span>
            </div>
          </button>
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Powered by advanced AI text transformation</p>
        </footer>
      </div>
    </div>
  );
}

export default App;