import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';

interface CodeSyntaxHighlighterProps {
  code: string;
  language: string;
  showCopyButton?: boolean;
  className?: string;
}

export default function CodeSyntaxHighlighter({ 
  code, 
  language, 
  showCopyButton = true, 
  className = "" 
}: CodeSyntaxHighlighterProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Simple syntax highlighting for common languages
  const highlightCode = (code: string, lang: string) => {
    // Keywords for different languages
    const keywords = {
      javascript: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'import', 'export', 'async', 'await', 'try', 'catch'],
      python: ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'try', 'except', 'async', 'await'],
      html: ['html', 'head', 'body', 'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'ol', 'li'],
      css: ['color', 'background', 'font', 'margin', 'padding', 'border', 'display', 'position', 'width', 'height']
    };

    const langKeywords = keywords[lang as keyof typeof keywords] || keywords.javascript;
    
    let highlighted = code;
    
    // Highlight keywords
    langKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlighted = highlighted.replace(regex, `<span class="text-blue-400 font-semibold">${keyword}</span>`);
    });
    
    // Highlight strings
    highlighted = highlighted.replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-400">$1$2$1</span>');
    
    // Highlight comments
    highlighted = highlighted.replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>');
    highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$1</span>');
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>');
    
    // Highlight HTML tags
    if (lang === 'html') {
      highlighted = highlighted.replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)(.*?)(&gt;)/g, 
        '<span class="text-red-400">$1</span><span class="text-blue-400">$2</span><span class="text-yellow-400">$3</span><span class="text-red-400">$4</span>');
    }
    
    return highlighted;
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="bg-space-dark rounded-lg border border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-400 font-space-mono">{language}</span>
          {showCopyButton && (
            <Button
              size="sm"
              variant="ghost"
              onClick={copyToClipboard}
              className="h-8 w-8 p-0 hover:bg-gray-700"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-gray-400" />
              )}
            </Button>
          )}
        </div>
        <div className="p-4 overflow-x-auto">
          <pre className="text-sm text-gray-300 font-space-mono">
            <code 
              dangerouslySetInnerHTML={{ 
                __html: highlightCode(code, language) 
              }} 
            />
          </pre>
        </div>
      </div>
    </div>
  );
}