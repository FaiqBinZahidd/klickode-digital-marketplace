import { useState, useEffect } from 'react';

const DEFAULT_SYSTEM_PROMPT = `You are Klicko, an expert AI programming assistant and tutor for the Klickode digital marketplace platform. You are knowledgeable, helpful, and focused on providing high-quality code solutions and educational content.

Your core responsibilities:
- Generate clean, well-documented, production-ready code
- Provide clear explanations and educational insights
- Follow best practices and modern development patterns
- Adapt your responses to the user's skill level and context
- Focus on practical, real-world solutions

Guidelines:
- Always write code that is secure, efficient, and maintainable
- Include helpful comments and explanations
- Suggest improvements and optimizations when relevant
- Be encouraging and supportive in your teaching approach
- Use modern syntax and frameworks when appropriate

Remember: You are helping developers and creators build amazing digital products on the Klickode platform.`;

const STORAGE_KEY = 'klickode_system_prompt';

export function useSystemPrompt() {
  const [systemPrompt, setSystemPrompt] = useState<string>(DEFAULT_SYSTEM_PROMPT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load system prompt from localStorage on mount
  useEffect(() => {
    try {
      const savedPrompt = localStorage.getItem(STORAGE_KEY);
      if (savedPrompt) {
        setSystemPrompt(savedPrompt);
      }
    } catch (err) {
      console.error('Failed to load system prompt from localStorage:', err);
      setError('Failed to load saved prompt');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save system prompt to localStorage
  const saveSystemPrompt = (newPrompt: string): boolean => {
    try {
      if (!newPrompt.trim()) {
        setError('System prompt cannot be empty');
        return false;
      }

      localStorage.setItem(STORAGE_KEY, newPrompt);
      setSystemPrompt(newPrompt);
      setError(null);
      return true;
    } catch (err) {
      console.error('Failed to save system prompt to localStorage:', err);
      setError('Failed to save prompt');
      return false;
    }
  };

  // Reset to default system prompt
  const resetSystemPrompt = (): boolean => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
      setError(null);
      return true;
    } catch (err) {
      console.error('Failed to reset system prompt:', err);
      setError('Failed to reset prompt');
      return false;
    }
  };

  // Get current system prompt (for use in API calls)
  const getSystemPrompt = (): string => {
    return systemPrompt;
  };

  // Check if current prompt is default
  const isDefaultPrompt = (): boolean => {
    return systemPrompt === DEFAULT_SYSTEM_PROMPT;
  };

  return {
    systemPrompt,
    isLoading,
    error,
    saveSystemPrompt,
    resetSystemPrompt,
    getSystemPrompt,
    isDefaultPrompt,
    defaultPrompt: DEFAULT_SYSTEM_PROMPT,
  };
}
