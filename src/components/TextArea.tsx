import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface TextAreaProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  readOnly?: boolean;
  showCopy?: boolean;
}

export function TextArea({ label, value, onChange, placeholder, readOnly, showCopy }: TextAreaProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-black/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className="w-full h-64 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200 hover:bg-white/70"
        placeholder={placeholder}
      />
      {showCopy && value && (
        <button
          onClick={handleCopy}
          className="absolute bottom-8 right-8 p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-all duration-200 flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}