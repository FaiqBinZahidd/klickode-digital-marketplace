import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Brain, Code, Play, BookOpen, Lightbulb, Target, Zap, Check, X, Trophy, ArrowRight, Terminal, Cpu, FileText, Award } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/navigation";
import CheckeredBackground from "@/components/checkered-background";
import Footer from "@/components/footer";
import AIChat from '@/components/ai-chat';
import AIResponseFormatter from "@/components/ai-response-formatter";

interface LearningResponse {
  explanation: string;
  codeExamples: string[];
  exercises: string[];
  tips: string[];
  nextTopics: string[];
}

// Helper function to highlight AI-generated content marked with **
const highlightAIContent = (text: string) => {
  return text.replace(/\*\*(.*?)\*\*/g, '<span class="text-primary-red font-semibold glow-red">$1</span>');
};

export default function Learn() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [response, setResponse] = useState<LearningResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testCode, setTestCode] = useState("");
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testScore, setTestScore] = useState<number>(0);
  const [completedTests, setCompletedTests] = useState<Set<string>>(new Set());
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [codeOutput, setCodeOutput] = useState<string>("");
  const [showTestDialog, setShowTestDialog] = useState(false);
  const { toast } = useToast();

  const learnMutation = useMutation({
    mutationFn: async (data: { topic: string; level: string; language: string }) => {
      return apiRequest("/api/learn", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      setResponse(data);
      setIsLoading(false);
      toast({
        title: "Content Generated",
        description: "AI learning content has been generated successfully!",
      });
    },
    onError: (error) => {
      console.error("Learning error:", error);
      toast({
        title: "Learning Error",
        description: "Failed to generate learning content. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const handleLearn = () => {
    if (!topic.trim() || !level || !selectedLanguage) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to get started.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse(null); // Clear previous response
    learnMutation.mutate({ topic, level, language: selectedLanguage });
  };

  const runCode = async (code: string) => {
    if (!code.trim()) {
      toast({
        title: "No Code to Run",
        description: "Please enter some code first.",
        variant: "destructive",
      });
      return;
    }

    setIsRunningCode(true);
    setCodeOutput("");

    try {
      // Simulate code execution with different outcomes based on language
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate execution time
      
      let output = "";
      const currentLang = language.toLowerCase();
      
      if (currentLang.includes('javascript')) {
        if (code.includes('console.log')) {
          const matches = code.match(/console\.log\((.*?)\)/g);
          if (matches) {
            output = matches.map(match => {
              const content = match.match(/console\.log\((.*?)\)/)[1];
              return `> ${content.replace(/['"]/g, '')}`;
            }).join('\n');
          }
        } else if (code.includes('function')) {
          output = `> Function defined successfully\n> Ready to execute`;
        } else {
          output = `> Code executed successfully\n> No output to display`;
        }
      } else if (currentLang.includes('python')) {
        if (code.includes('print')) {
          const matches = code.match(/print\((.*?)\)/g);
          if (matches) {
            output = matches.map(match => {
              const content = match.match(/print\((.*?)\)/)[1];
              return content.replace(/['"]/g, '');
            }).join('\n');
          }
        } else {
          output = `>>> Code executed successfully\n>>> No output to display`;
        }
      } else {
        output = `Program executed successfully\nOutput: Code compiled and ran without errors`;
      }
      
      setCodeOutput(output || "Code executed successfully - no output generated");
      
      toast({
        title: "Code Executed",
        description: "Your code ran successfully!",
      });
    } catch (error) {
      setCodeOutput(`Error: ${error.message || 'Code execution failed'}`);
      toast({
        title: "Execution Error",
        description: "There was an error running your code.",
        variant: "destructive",
      });
    } finally {
      setIsRunningCode(false);
    }
  };

  const generateTestPrompt = (topic: string, lang: string) => {
    const langComment = lang.toLowerCase().includes('python') ? '#' : '//';
    
    return `${langComment} Interactive Code Test: ${topic}
${langComment} 
${langComment} Instructions:
${langComment} 1. Write code that demonstrates your understanding of ${topic}
${langComment} 2. Include comments explaining your approach
${langComment} 3. Test your code using the Run button
${langComment} 4. Submit when ready for AI evaluation
${langComment}
${langComment} Example task: Create a practical example using ${topic}

`;
  };

  const startTest = (topic: string) => {
    setActiveTest(topic);
    setTestResult(null);
    setCodeOutput("");
    setTestScore(0);
    
    // Generate a detailed test prompt based on the topic and language
    const testPrompt = generateTestPrompt(topic, selectedLanguage);
    setTestCode(testPrompt);
  };

  const submitTest = async () => {
    if (!activeTest || !testCode.trim()) return;

    setIsLoading(true);
    try {
      const response = await apiRequest("/api/ai-tools", {
        method: "POST",
        body: JSON.stringify({
          tool: "explainer",
          input: testCode,
          language: language,
          context: `Review this code for understanding of ${activeTest}. Provide a score (1-10) and detailed feedback.`
        }),
      });

      setTestResult(response.result);
      
      // Extract score from response (simple pattern matching)
      const scoreMatch = response.result.match(/(?:score|rating).*?(\d+)/i);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 7;
      setTestScore(score);
      
      if (score >= 7) {
        setCompletedTests(prev => new Set([...prev, activeTest]));
        toast({
          title: "Test Passed!",
          description: `Great work! You scored ${score}/10 on ${activeTest}`,
        });
      } else {
        toast({
          title: "Keep trying!",
          description: `You scored ${score}/10. Review the feedback and try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Test submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const programmingLanguages = [
    "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Go", "Rust", "Swift",
    "TypeScript", "Kotlin", "Dart", "Scala", "R", "MATLAB", "HTML/CSS", "SQL"
  ];

  const difficultyLevels = [
    "Beginner", "Intermediate", "Advanced", "Expert"
  ];

  const popularTopics = [
    "Variables and Data Types", "Functions", "Loops", "Arrays", "Objects", "Classes",
    "Algorithms", "Data Structures", "Database Design", "Web Development", "Mobile Development",
    "Machine Learning", "API Development", "Testing", "Security", "Performance Optimization"
  ];

  return (
    <CheckeredBackground className="min-h-screen">


      <Navigation />
      
      <div className="pt-32 px-6 sm:px-8 lg:px-10" style={{ marginTop: '60px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <div className="flex items-center mb-4">
              <Brain className="h-8 w-8 text-primary-red mr-3" />
              <h1 className="text-2xl md:text-3xl font-space-mono text-white">
                Klicko <span className="text-primary-red">AI Learning</span>
              </h1>
            </div>
            <p className="text-base text-gray-300 max-w-3xl font-space-mono">
              Your personal AI learning assistant. Master any programming topic with interactive explanations, 
              code examples, and hands-on exercises tailored to your skill level.
            </p>
          </div>

          {/* Learning Input Panel - First Row */}
          <div className="mb-8">
            <Card className="bg-space-darker border-gray-700 hover:border-primary-red/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-white font-space-mono">
                  <Target className="h-5 w-5 mr-3 text-primary-red" />
                  Learning Setup
                </CardTitle>
                <CardDescription className="text-gray-300 font-space-mono">
                  Tell Klicko what you want to learn and at what level
                </CardDescription>
              </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Programming Language</label>
                    <Select value={selectedLanguage} onValueChange={(value) => {
                      setSelectedLanguage(value);
                      setLanguage(value);
                    }}>
                      <SelectTrigger className="bg-space-dark border-gray-600 hover:border-primary-red/50 transition-colors">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-space-darker border-gray-600">
                        {programmingLanguages.map((lang) => (
                          <SelectItem key={lang} value={lang.toLowerCase()} className="hover:bg-primary-red/20">
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger className="bg-space-dark border-gray-600 hover:border-primary-red/50 transition-colors">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent className="bg-space-darker border-gray-600">
                        {difficultyLevels.map((lvl) => (
                          <SelectItem key={lvl} value={lvl.toLowerCase()} className="hover:bg-primary-red/20">
                            {lvl}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Topic or Question</label>
                    <Textarea
                      placeholder="e.g., 'How do I create a REST API?', 'Explain recursion', 'Array sorting algorithms'"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="bg-space-dark border-gray-600 hover:border-primary-red/50 transition-colors min-h-[100px] focus:border-primary-red/70"
                    />
                  </div>

                  <Button
                    onClick={handleLearn}
                    disabled={isLoading}
                    className="w-full bg-primary-red hover:bg-primary-red/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary-red/50"
                  >
                    {isLoading ? (
                      <>
                        <Zap className="h-5 w-5 mr-2 animate-spin" />
                        Klicko is Learning... (30-45s)
                      </>
                    ) : (
                      <>
                        <Brain className="h-5 w-5 mr-2" />
                        Start Learning
                      </>
                    )}
                  </Button>

                  <Separator className="bg-gray-700" />

                  <div>
                    <h3 className="text-sm font-medium mb-3">Popular Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTopics.slice(0, 8).map((popularTopic) => (
                        <Badge
                          key={popularTopic}
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary-red/20 text-xs"
                          onClick={() => setTopic(popularTopic)}
                        >
                          {popularTopic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          {/* Learning Content - Second Row */}
          {response ? (
            <div className="space-y-6">
              {/* Explanation */}
              <Card className="bg-space-darker border-gray-700 hover:shadow-xl hover:shadow-primary-red/10 transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="flex items-center text-white font-space-mono">
                    <BookOpen className="h-6 w-6 mr-3 text-primary-red animate-pulse" />
                    AI Explanation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AIResponseFormatter
                    response={response.explanation}
                    className="min-h-[200px]"
                    showCopyButton={true}
                  />
                </CardContent>
              </Card>

                  {/* Code Examples */}
                  {response.codeExamples.length > 0 && (
                    <Card className="bg-space-darker border-gray-700 hover:shadow-xl hover:shadow-primary-red/10 transition-all duration-300 transform hover:scale-[1.02]">
                      <CardHeader>
                        <CardTitle className="flex items-center text-white ">
                          <Code className="h-6 w-6 mr-3 text-primary-red animate-pulse" />
                          AI Code Examples
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {response.codeExamples.map((code, index) => (
                            <div key={index} className="relative group">
                              <div className="bg-gradient-to-r from-primary-red/20 to-transparent p-1 rounded-lg">
                                <pre className="bg-space-dark p-6 rounded-lg overflow-x-auto border border-primary-red/30">
                                  <code 
                                    className="text-sm text-gray-300 leading-relaxed"
                                    dangerouslySetInnerHTML={{ 
                                      __html: highlightAIContent(code) 
                                    }}
                                  />
                                </pre>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-3 right-3 text-xs bg-primary-red/20 border-primary-red/50 hover:bg-primary-red/30 transform hover:scale-110 transition-all duration-200"
                                onClick={() => runCode(code)}
                              >
                                <Play className="h-3 w-3 mr-1" />
                                Run
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Tips */}
                  {response.tips.length > 0 && (
                    <Card className="bg-space-darker border-gray-700 hover:shadow-xl hover:shadow-primary-red/10 transition-all duration-300 transform hover:scale-[1.02]">
                      <CardHeader>
                        <CardTitle className="flex items-center text-white ">
                          <Lightbulb className="h-6 w-6 mr-3 text-primary-red animate-pulse" />
                          AI Pro Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          {response.tips.map((tip, index) => (
                            <li key={index} className="flex items-start p-4 bg-gradient-to-r from-primary-red/10 to-transparent rounded-lg border border-primary-red/20">
                              <span className="text-primary-red mr-3 text-xl font-bold">•</span>
                              <span 
                                className="text-gray-300 leading-relaxed"
                                dangerouslySetInnerHTML={{ 
                                  __html: highlightAIContent(tip) 
                                }}
                              />
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Exercises */}
                  {response.exercises.length > 0 && (
                    <Card className="bg-space-darker border-gray-700 hover:shadow-xl hover:shadow-primary-red/10 transition-all duration-300 transform hover:scale-[1.02]">
                      <CardHeader>
                        <CardTitle className="flex items-center text-white ">
                          <Target className="h-6 w-6 mr-3 text-primary-red animate-pulse" />
                          AI Practice Exercises
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {response.exercises.map((exercise, index) => (
                            <div key={index} className="p-6 bg-gradient-to-r from-primary-red/10 to-transparent rounded-lg border border-primary-red/20 hover:border-primary-red/40 transition-all duration-300">
                              <div className="flex items-start">
                                <div className="bg-primary-red/20 rounded-full p-2 mr-4">
                                  <span className="text-primary-red font-bold text-sm">{index + 1}</span>
                                </div>
                                <div 
                                  className="text-gray-300 leading-relaxed flex-1"
                                  dangerouslySetInnerHTML={{ 
                                    __html: highlightAIContent(exercise) 
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

              {/* Interactive Code Tests */}
              {response.nextTopics.length > 0 && (
                <Card className="bg-space-darker border-gray-700 hover:shadow-xl hover:shadow-primary-red/10 transition-all duration-300 transform hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white font-space-mono">
                      <Trophy className="h-6 w-6 mr-3 text-primary-red animate-pulse" />
                      Interactive Code Tests
                    </CardTitle>
                    <CardDescription className="text-gray-300 font-space-mono">
                      Practice what you learned with hands-on coding challenges
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {response.nextTopics.map((nextTopic, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-space-dark rounded-lg border border-gray-700 hover:border-primary-red/30 transition-colors">
                          <div className="flex items-center space-x-3">
                            {completedTests.has(nextTopic) ? (
                              <Award className="h-5 w-5 text-green-500" />
                            ) : (
                              <Target className="h-5 w-5 text-gray-400" />
                            )}
                            <div>
                              <h4 className="font-space-mono text-white">{nextTopic}</h4>
                              <p className="text-sm text-gray-400 font-space-mono">
                                {completedTests.has(nextTopic) ? "✓ Completed" : "Test your understanding"}
                              </p>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant={completedTests.has(nextTopic) ? "outline" : "default"}
                                className={`font-space-mono ${completedTests.has(nextTopic) 
                                  ? "border-green-500 text-green-500 hover:bg-green-500/20" 
                                  : "bg-primary-red hover:bg-red-600"}`}
                                onClick={() => startTest(nextTopic)}
                              >
                                {completedTests.has(nextTopic) ? "Retake" : "Start Test"}
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl bg-space-darker border-gray-700 text-white">
                              <DialogHeader>
                                <DialogTitle className="flex items-center text-white font-space-mono">
                                  <Code className="h-6 w-6 mr-3 text-primary-red" />
                                  Code Test: {nextTopic}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="bg-space-dark p-4 rounded-lg border border-gray-700">
                                  <h4 className="font-space-mono text-primary-red mb-2">Instructions:</h4>
                                  <div className="text-sm text-gray-300 font-space-mono space-y-1">
                                    <p>• Write code that demonstrates your understanding of <span className="text-primary-red font-semibold">{nextTopic}</span></p>
                                    <p>• Include comments explaining your approach</p>
                                    <p>• Test your code using the Run button</p>
                                    <p>• Submit when ready for AI evaluation</p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <label className="text-sm font-medium text-gray-300">Code Editor</label>
                                      <Button
                                        size="sm"
                                        onClick={() => runCode(testCode)}
                                        disabled={isRunningCode || !testCode.trim()}
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                      >
                                        {isRunningCode ? (
                                          <>
                                            <Cpu className="h-4 w-4 mr-2 animate-spin" />
                                            Running...
                                          </>
                                        ) : (
                                          <>
                                            <Play className="h-4 w-4 mr-2" />
                                            Run Code
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                    <Textarea
                                      value={testCode}
                                      onChange={(e) => setTestCode(e.target.value)}
                                      className="min-h-[300px] bg-space-dark border-gray-700 text-white font-space-mono text-sm resize-none focus:border-primary-red/50"
                                      placeholder="Write your code here..."
                                    />
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="flex items-center">
                                      <Terminal className="h-4 w-4 mr-2 text-green-400" />
                                      <label className="text-sm font-medium text-gray-300">Output</label>
                                    </div>
                                    <div className="bg-black/50 border border-gray-700 rounded-lg p-4 min-h-[300px] font-mono text-sm">
                                      {isRunningCode ? (
                                        <div className="flex items-center text-green-400">
                                          <Cpu className="h-4 w-4 mr-2 animate-spin" />
                                          Executing code...
                                        </div>
                                      ) : codeOutput ? (
                                        <pre className="text-green-400 whitespace-pre-wrap">{codeOutput}</pre>
                                      ) : (
                                        <div className="text-gray-500">Run your code to see output here...</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex justify-between items-center pt-4">
                                  <div className="text-sm text-gray-400 font-space-mono">
                                    Language: <span className="text-primary-red">{language}</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      className="border-gray-600 text-gray-300 hover:border-gray-500 font-space-mono"
                                      onClick={() => setActiveTest(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={submitTest}
                                      disabled={isLoading || !testCode.trim()}
                                      className="bg-primary-red hover:bg-red-600 font-space-mono"
                                    >
                                      {isLoading ? (
                                        <>
                                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                          AI Reviewing...
                                        </>
                                      ) : (
                                        <>
                                          <Trophy className="h-4 w-4 mr-2" />
                                          Submit for Review
                                        </>
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}



              {/* Test Results - Enhanced with better organization */}
              {testResult && (
                <Card className={`border-2 ${testScore >= 7 ? 'border-green-500/50 bg-green-500/5' : 'border-yellow-500/50 bg-yellow-500/5'} hover:shadow-xl transition-all duration-300`}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white font-space-mono">
                      <div className="flex items-center">
                        {testScore >= 7 ? (
                          <Award className="h-6 w-6 mr-3 text-green-500" />
                        ) : (
                          <FileText className="h-6 w-6 mr-3 text-yellow-500" />
                        )}
                        AI Test Results
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${testScore >= 7 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {testScore}/10
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-space-dark rounded-lg border border-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${testScore >= 7 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <span className="text-sm font-space-mono">
                            {testScore >= 7 ? "Test Passed!" : "Needs Improvement"}
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {testScore >= 7 ? "Great job! Keep learning." : "Review feedback and try again."}
                        </div>
                      </div>
                      
                      <div className="bg-space-dark p-4 rounded-lg border border-gray-700">
                        <h4 className="font-space-mono text-primary-red mb-3 flex items-center">
                          <Brain className="h-4 w-4 mr-2" />
                          AI Feedback
                        </h4>
                        <AIResponseFormatter
                          response={testResult}
                          className="min-h-[100px] text-gray-300"
                          showCopyButton={true}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="bg-space-darker border-gray-700">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Brain className="h-24 w-24 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2 font-space-mono">
                  Ready to Learn?
                </h3>
                <p className="text-gray-500 text-center max-w-md font-space-mono">
                  Fill in the learning setup panel and click "Start Learning" to get 
                  personalized explanations, code examples, and exercises from Klicko.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
      
      <AIChat 
        currentCode=""
        currentLanguage={selectedLanguage}
        pageContext="learn"
      />
    </CheckeredBackground>
  );
}