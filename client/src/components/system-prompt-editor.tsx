import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSystemPrompt } from '@/hooks/useSystemPrompt';
import { Save, RotateCcw, Settings, Sparkles } from 'lucide-react';

export default function SystemPromptEditor() {
  const {
    systemPrompt,
    isLoading,
    error,
    saveSystemPrompt,
    resetSystemPrompt,
    isDefaultPrompt,
  } = useSystemPrompt();

  const [editedPrompt, setEditedPrompt] = useState(systemPrompt);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Update edited prompt when system prompt changes
  useState(() => {
    setEditedPrompt(systemPrompt);
  });

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    const success = saveSystemPrompt(editedPrompt);
    
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    
    setIsSaving(false);
  };

  const handleReset = () => {
    const success = resetSystemPrompt();
    if (success) {
      setEditedPrompt(systemPrompt);
    }
  };

  const hasChanges = editedPrompt !== systemPrompt;
  const isValidPrompt = editedPrompt.trim().length > 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className="ml-3 text-gray-300 font-space-mono">Loading system prompt...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Settings className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-space-mono text-white">
            AI System Prompt
          </h1>
          <Sparkles className="h-8 w-8 text-red-600" />
        </div>
        <p className="text-gray-300 font-space-mono max-w-2xl mx-auto">
          Customize how the AI assistant behaves across all tools and interactions. 
          This prompt will be prepended to every AI request to influence the tone, 
          style, and focus of responses.
        </p>
      </div>

      {/* Status Messages */}
      {error && (
        <Alert className="border-red-600/50 bg-red-900/20">
          <AlertDescription className="text-red-300 font-space-mono">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {saveSuccess && (
        <Alert className="border-green-600/50 bg-green-900/20">
          <AlertDescription className="text-green-300 font-space-mono">
            System prompt saved successfully! Changes will apply to new AI requests.
          </AlertDescription>
        </Alert>
      )}

      {/* Editor Card */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white font-space-mono flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Prompt Configuration
          </CardTitle>
          <CardDescription className="text-gray-400 font-space-mono">
            Define the AI's personality, expertise, and behavior patterns. 
            {!isDefaultPrompt() && (
              <span className="text-yellow-400 ml-2">
                (Custom prompt active)
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Prompt Editor */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 font-space-mono">
              System Prompt
            </label>
            <Textarea
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              placeholder="Enter your custom system prompt..."
              className="min-h-[400px] bg-gray-800 border-gray-600 text-white font-space-mono text-sm resize-none focus:border-red-500/50 focus:ring-red-500/20"
            />
            <div className="flex justify-between text-xs text-gray-500 font-space-mono">
              <span>
                {editedPrompt.length} characters
              </span>
              <span>
                {hasChanges ? 'Unsaved changes' : 'No changes'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleSave}
              disabled={!hasChanges || !isValidPrompt || isSaving}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-space-mono"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              disabled={isDefaultPrompt()}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800 font-space-mono"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>

          {/* Help Text */}
          <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium text-white font-space-mono">
              💡 Tips for effective system prompts:
            </h4>
            <ul className="text-xs text-gray-400 font-space-mono space-y-1">
              <li>• Be specific about the AI's role and expertise</li>
              <li>• Define the tone and communication style</li>
              <li>• Include guidelines for code quality and best practices</li>
              <li>• Specify any particular frameworks or technologies to focus on</li>
              <li>• Keep it concise but comprehensive</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
