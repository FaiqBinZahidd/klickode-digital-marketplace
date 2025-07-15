import { useState } from "react";
import Navigation from "@/components/navigation";
import CheckeredBackground from "@/components/checkered-background";
import Footer from "@/components/footer";
import AIChat from '@/components/ai-chat';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Zap, MessageCircle, Bug, BookOpen, Play, Sparkles } from "lucide-react";
import AIResponseFormatter from "@/components/ai-response-formatter";

export default function AITools() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [activeTab, setActiveTab] = useState("generator");
  const [isTyping, setIsTyping] = useState(false);

  const tools = [
    {
      id: "generator",
      name: "Code Generator",
      icon: <Code className="h-6 w-6" />,
      description: "Generate code from natural language descriptions",
      placeholder: "Describe what you want to build..."
    },
    {
      id: "translator",
      name: "Code Translator",
      icon: <Zap className="h-6 w-6" />,
      description: "Translate code between programming languages",
      placeholder: "Paste your code here..."
    },
    {
      id: "optimizer",
      name: "Code Optimizer",
      icon: <Zap className="h-6 w-6" />,
      description: "Improve performance and readability",
      placeholder: "Paste your code to optimize..."
    },
    {
      id: "explainer",
      name: "Code Explainer",
      icon: <MessageCircle className="h-6 w-6" />,
      description: "Get detailed explanations of code snippets",
      placeholder: "Paste code you want explained..."
    },
    {
      id: "debugger",
      name: "Code Debugger",
      icon: <Bug className="h-6 w-6" />,
      description: "Find and fix bugs in your code",
      placeholder: "Paste problematic code here..."
    },
    {
      id: "tutor",
      name: "Learning Hub",
      icon: <BookOpen className="h-6 w-6" />,
      description: "Interactive programming tutorials",
      placeholder: "What would you like to learn?"
    }
  ];

  const handleProcessCode = async (toolId: string) => {
    if (!inputCode.trim()) return;
    
    setIsLoading(true);
    setIsTyping(true);
    setOutputCode("");
    
    try {
      const response = await fetch("/api/ai-tools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tool: toolId,
          input: inputCode,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOutputCode(data.result);
      setIsTyping(false);
    } catch (error) {
      console.error("Error processing code:", error);
      setOutputCode("⚠️ **Error Processing Request**\n\nSorry, I encountered an issue while processing your code. Please try again.\n\n**Common solutions:**\n• Check your internet connection\n• Verify the input is valid\n• Try a different tool or simpler request\n\nIf the problem persists, please contact support.");
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckeredBackground className="min-h-screen">

      <Navigation />
      
      <div className="pt-32 pb-16 px-6 sm:px-8 lg:px-10" style={{ marginTop: '60px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <h1 className="text-2xl md:text-3xl font-space-mono mb-4 text-white">
              AI-Powered <span className="text-primary-red">Development Tools</span>
            </h1>
            <p className="text-base text-gray-300 max-w-3xl font-space-mono">
              Supercharge your development workflow with cutting-edge AI tools
            </p>
          </div>

          {/* Tools Tabs */}
          <Tabs defaultValue="generator" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8 bg-space-darker border-gray-700">
              {tools.map((tool) => (
                <TabsTrigger 
                  key={tool.id} 
                  value={tool.id}
                  className="flex items-center gap-2 text-xs lg:text-sm font-space-mono data-[state=active]:bg-primary-red data-[state=active]:text-white"
                >
                  <span className="hidden sm:block">{tool.icon}</span>
                  <span className="truncate">{tool.name.replace('Code ', '').replace('Learning ', '')}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {tools.map((tool) => (
              <TabsContent key={tool.id} value={tool.id} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-space-mono text-white mb-2">{tool.name}</h2>
                  <p className="text-gray-300 font-space-mono">{tool.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Input Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-300 font-space-mono">
                        Input
                      </label>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-32 bg-space-darker border-gray-700 text-white text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="css">CSS</SelectItem>
                          <SelectItem value="typescript">TypeScript</SelectItem>
                          <SelectItem value="react">React</SelectItem>
                          <SelectItem value="vue">Vue</SelectItem>
                          <SelectItem value="angular">Angular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="relative">
                      <Textarea
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder={tool.placeholder}
                        className="min-h-[300px] bg-space-darker border-gray-700 text-white font-space-mono text-sm resize-none focus:border-primary-red/50 pr-12"
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {inputCode.length} chars
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleProcessCode(tool.id)}
                      disabled={isLoading || !inputCode.trim()}
                      className="w-full bg-primary-red hover:bg-red-600 font-space-mono transform hover:scale-105 transition-all duration-200"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                          Processing with AI...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          <Sparkles className="h-4 w-4 mr-2" />
                          Process with AI
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Output Section */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-300 font-space-mono">
                      AI Response
                    </label>
                    {outputCode ? (
                      <AIResponseFormatter
                        response={outputCode}
                        isTyping={isTyping}
                        language={selectedLanguage}
                        showCopyButton={true}
                        className="min-h-[300px]"
                      />
                    ) : (
                      <div className="min-h-[300px] bg-space-darker border border-gray-700 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Sparkles className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400 font-space-mono text-sm">
                            AI-generated results will appear here...
                          </p>
                          <p className="text-gray-500 font-space-mono text-xs mt-2">
                            Enter your code or description above and click "Process with AI"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
      
      <AIChat 
        currentCode={inputCode}
        currentLanguage={selectedLanguage}
        pageContext="ai-tools"
      />
    </CheckeredBackground>
  );
}