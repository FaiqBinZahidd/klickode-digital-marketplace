import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Code, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  codeContext?: string;
  language?: string;
}

interface AIChatProps {
  currentCode?: string;
  currentLanguage?: string;
  pageContext?: string;
  className?: string;
}

export default function AIChat({ 
  currentCode = '', 
  currentLanguage = 'javascript', 
  pageContext = 'general',
  className = ''
}: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm Klicko, your AI coding assistant. I can help you understand code, debug issues, suggest improvements, and answer programming questions. What would you like to work on?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      codeContext: currentCode,
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Build context for AI
      let contextPrompt = `You are Klicko, an expert programming assistant integrated into the Klickode platform. 
      
Context:
- Current page: ${pageContext}
- Programming language: ${currentLanguage}
- User's current code: ${currentCode || 'No code provided'}

Please provide helpful, accurate programming advice. Keep responses concise but thorough. Use code examples when relevant.

User question: ${inputValue}`;

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: contextPrompt,
          language: currentLanguage,
          context: pageContext
        })
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const data = await response.json();
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response || data,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatMessage = (content: string | any) => {
    // Ensure content is a string
    let textContent = '';
    if (typeof content === 'string') {
      textContent = content;
    } else if (typeof content === 'object' && content !== null) {
      // Extract explanation from response object
      textContent = content.explanation || content.response || JSON.stringify(content, null, 2);
    } else {
      textContent = String(content);
    }
    
    // Simple code block detection and formatting
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const inlineCodeRegex = /`([^`]+)`/g;
    
    let formatted = textContent;
    
    // Replace code blocks
    formatted = formatted.replace(codeBlockRegex, (match, language, code) => {
      return `<div class="bg-space-dark border border-gray-700 rounded-lg p-4 my-3 font-mono text-sm">
        ${language ? `<div class="text-xs text-gray-400 mb-2">${language}</div>` : ''}
        <pre class="text-gray-300 whitespace-pre-wrap">${code.trim()}</pre>
      </div>`;
    });
    
    // Replace inline code
    formatted = formatted.replace(inlineCodeRegex, '<code class="bg-gray-700 text-primary-red px-1 py-0.5 rounded font-mono text-sm">$1</code>');
    
    return formatted;
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 bg-primary-red hover:bg-red-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300",
          className
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={cn(
      "fixed bottom-6 right-6 z-50 bg-space-darker border-gray-700 shadow-2xl transition-all duration-300",
      isMinimized ? "w-80 h-16" : "w-96 h-[500px]",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-red/20 rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary-red" />
          </div>
          <CardTitle className="text-white font-space-mono text-sm">
            Klicko AI Assistant
          </CardTitle>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 hover:bg-gray-700"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[400px]">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start space-x-2",
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.type === 'ai' && (
                    <div className="w-6 h-6 bg-primary-red/20 rounded-full flex items-center justify-center mt-1">
                      <Bot className="h-3 w-3 text-primary-red" />
                    </div>
                  )}
                  
                  <div className={cn(
                    "max-w-[280px] rounded-lg p-3 font-space-mono text-sm relative group",
                    message.type === 'user' 
                      ? 'bg-primary-red text-white ml-auto' 
                      : 'bg-gray-700 text-gray-100'
                  )}>
                    <div 
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                      className="whitespace-pre-wrap"
                    />
                    
                    {message.type === 'ai' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="h-3 w-3 text-green-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                    
                    <div className="text-xs opacity-50 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mt-1">
                      <User className="h-3 w-3 text-gray-300" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-primary-red/20 rounded-full flex items-center justify-center">
                    <Bot className="h-3 w-3 text-primary-red" />
                  </div>
                  <div className="bg-gray-700 text-gray-100 rounded-lg p-3 font-space-mono text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t border-gray-700 p-4">
            <div className="flex items-end space-x-2">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Klicko about your code..."
                className="flex-1 bg-space-dark border-gray-600 text-white font-space-mono text-sm resize-none min-h-[40px] max-h-[100px]"
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-primary-red hover:bg-red-600 text-white p-2 h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {currentCode && (
              <div className="mt-2 text-xs text-gray-400 font-space-mono">
                <Code className="h-3 w-3 inline mr-1" />
                Context: {currentLanguage} code ({currentCode.length} chars)
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}