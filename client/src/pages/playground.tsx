import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Play, Square, Download, Upload, Share2, Code, Globe, Smartphone, Brain, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import NetlifyBackground from "@/components/netlify-background";

import Footer from "@/components/footer";
import AIChat from "@/components/ai-chat";

interface CodeTemplate {
  name: string;
  language: string;
  code: string;
  description: string;
}

export default function Playground() {
  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Klickode Playground</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        .welcome-box {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
            margin-bottom: 20px;
        }
        .btn {
            background: #E53935;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(229, 57, 53, 0.4);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="welcome-box">
            <h1>🚀 Welcome to Klickode Playground</h1>
            <p>Start coding and see your changes live!</p>
            <button class="btn" onclick="changeMessage()">Click me!</button>
            <p id="message"></p>
        </div>
    </div>

    <script>
        function changeMessage() {
            document.getElementById('message').innerHTML = '✨ Hello from Klickode! Ready to code?';
        }
    </script>
</body>
</html>`);
  
  const [cssCode, setCssCode] = useState(`/* Modern CSS Playground */
body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
    color: white;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.welcome-box {
    background: rgba(255,255,255,0.1);
    padding: 30px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    margin-bottom: 20px;
    animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.btn {
    background: #E53935;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(229, 57, 53, 0.4);
}

/* Add your custom CSS here */`);
  
  const [jsCode, setJsCode] = useState(`// JavaScript Playground
console.log('Welcome to Klickode Playground!');

// Example function
function changeMessage() {
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.innerHTML = '✨ Hello from Klickode! Ready to code?';
        messageElement.style.color = '#E53935';
        messageElement.style.fontWeight = 'bold';
    }
}

// Example of modern JavaScript features
const features = [
    'Arrow Functions',
    'Template Literals',
    'Destructuring',
    'Async/Await',
    'Modules'
];

features.forEach((feature, index) => {
    setTimeout(() => {
        console.log(\`\${index + 1}. \${feature}\`);
    }, index * 1000);
});

// Add your JavaScript code here`);

  const [pythonCode, setPythonCode] = useState(`# Python Playground
print("Welcome to Klickode Python Playground!")

# Example: Simple calculator
def calculator(a, b, operation):
    operations = {
        'add': a + b,
        'subtract': a - b,
        'multiply': a * b,
        'divide': a / b if b != 0 else 'Cannot divide by zero'
    }
    return operations.get(operation, 'Invalid operation')

# Example usage
result = calculator(10, 5, 'add')
print(f"Result: {result}")

# Example: List comprehension
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(f"Squared numbers: {squared}")

# Example: Working with classes
class Greeting:
    def __init__(self, name):
        self.name = name
    
    def say_hello(self):
        return f"Hello, {self.name}! Welcome to Klickode!"

# Create an instance
greeter = Greeting("Developer")
print(greeter.say_hello())

# Add your Python code here`);

  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [codeExplanation, setCodeExplanation] = useState("");
  const { toast } = useToast();

  const explainCodeMutation = useMutation({
    mutationFn: async (data: { code: string; language: string }) => {
      return apiRequest("/api/explain-code", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      setCodeExplanation(data.explanation);
      toast({
        title: "Code Explained",
        description: "Klicko has analyzed your code!",
      });
    },
    onError: (error) => {
      console.error("Code explanation error:", error);
      toast({
        title: "Explanation Error",
        description: "Failed to explain code. The AI is processing your request...",
        variant: "destructive",
      });
    },
  });

  const languages = [
    { id: "html", name: "HTML/CSS/JS", icon: "🌐" },
    { id: "python", name: "Python", icon: "🐍" },
    { id: "javascript", name: "JavaScript", icon: "⚡" },
    { id: "css", name: "CSS", icon: "🎨" },
  ];

  const templates: CodeTemplate[] = [
    {
      name: "React Component",
      language: "javascript",
      description: "Basic React functional component",
      code: `import React, { useState } from 'react';

function MyComponent() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}

export default MyComponent;`
    },
    {
      name: "API Fetch",
      language: "javascript",
      description: "Modern async/await API call",
      code: `async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();`
    },
    {
      name: "Responsive Card",
      language: "html",
      description: "Modern CSS card component",
      code: `<!DOCTYPE html>
<html>
<head>
    <style>
        .card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            padding: 20px;
            margin: 20px;
            max-width: 300px;
            transition: transform 0.3s ease;
        }
        .card:hover {
            transform: translateY(-5px);
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Card Title</h2>
        <p>This is a beautiful card component.</p>
    </div>
</body>
</html>`
    }
  ];

  const getCurrentCode = () => {
    switch (selectedLanguage) {
      case "html": return htmlCode;
      case "css": return cssCode;
      case "javascript": return jsCode;
      case "python": return pythonCode;
      default: return "";
    }
  };

  const setCurrentCode = (code: string) => {
    switch (selectedLanguage) {
      case "html": setHtmlCode(code); break;
      case "css": setCssCode(code); break;
      case "javascript": setJsCode(code); break;
      case "python": setPythonCode(code); break;
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    
    try {
      if (selectedLanguage === "html") {
        // For HTML, we show the live preview
        setOutput("Check the live preview panel to see your HTML output!");
      } else if (selectedLanguage === "javascript") {
        // Mock JavaScript execution
        const result = `// JavaScript Output
Console: Code executed successfully!
Result: ${getCurrentCode().includes('console.log') ? 'Check browser console for logs' : 'No console output'}`;
        setOutput(result);
      } else if (selectedLanguage === "python") {
        // Mock Python execution
        const result = `# Python Output
Welcome to Klickode Python Playground!
Result: 15
Squared numbers: [1, 4, 9, 16, 25]
Hello, Developer! Welcome to Klickode!`;
        setOutput(result);
      } else {
        setOutput("Code executed successfully!");
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const loadTemplate = (template: CodeTemplate) => {
    setSelectedLanguage(template.language);
    setCurrentCode(template.code);
    toast({
      title: "Template Loaded",
      description: `${template.name} template has been loaded.`,
    });
  };

  const shareCode = () => {
    navigator.clipboard.writeText(getCurrentCode());
    toast({
      title: "Code Copied",
      description: "Code has been copied to clipboard for sharing.",
    });
  };

  const explainCode = () => {
    const code = getCurrentCode();
    if (!code.trim()) {
      toast({
        title: "No Code to Explain",
        description: "Please write some code first.",
        variant: "destructive",
      });
      return;
    }
    
    explainCodeMutation.mutate({ code, language: selectedLanguage });
  };

  return (
    <div className="min-h-screen bg-space-dark text-white relative overflow-x-hidden">


      <Navigation />
      
      <div className="pt-32 px-6 sm:px-8 lg:px-10" style={{ marginTop: '60px' }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-left mb-12">
            <div className="flex items-center mb-4">
              <Code className="h-8 w-8 text-primary-red mr-3" />
              <h1 className="text-2xl md:text-3xl font-space-mono text-white">
                Code <span className="text-primary-red">Playground</span>
              </h1>
            </div>
            <p className="text-base text-gray-300 max-w-3xl font-space-mono">
              Write, run, and test your code in real-time. Support for multiple languages with live preview and execution.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48 bg-space-darker border-gray-600">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.icon} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                onClick={runCode}
                disabled={isRunning}
                className="bg-primary-red hover:bg-primary-red/90"
              >
                {isRunning ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={explainCode}
                disabled={explainCodeMutation.isPending}
              >
                <Brain className="h-4 w-4 mr-2" />
                {explainCodeMutation.isPending ? "AI Analyzing... (30-45s)" : "Explain Code"}
              </Button>
              <Button variant="outline" size="sm" onClick={shareCode}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Templates Sidebar */}
            <div className="xl:col-span-1">
              <Card className="bg-space-darker border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Code Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {templates.map((template, index) => (
                      <div
                        key={index}
                        className="p-3 bg-space-dark rounded-lg cursor-pointer hover:bg-space-dark/80 transition-colors"
                        onClick={() => loadTemplate(template)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{template.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {template.language}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">{template.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-3">
              <Tabs defaultValue="editor" className="w-full">
                <TabsList className="grid grid-cols-4 w-full mb-4">
                  <TabsTrigger value="editor" className="flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    Editor
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    Live Preview
                  </TabsTrigger>
                  <TabsTrigger value="output" className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Output
                  </TabsTrigger>
                  <TabsTrigger value="explanation" className="flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    AI Explanation
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="editor" className="mt-0">
                  <Card className="bg-space-darker border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Code Editor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={getCurrentCode()}
                        onChange={(e) => setCurrentCode(e.target.value)}
                        className="min-h-[500px] bg-space-dark border-gray-600 font-space-mono force-space-mono text-sm"
                        placeholder="Write your code here..."
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview" className="mt-0">
                  <Card className="bg-space-darker border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Live Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedLanguage === "html" ? (
                        <div className="border border-gray-600 rounded-lg overflow-hidden">
                          <iframe
                            srcDoc={htmlCode}
                            className="w-full h-[500px] bg-white"
                            title="Live Preview"
                          />
                        </div>
                      ) : (
                        <div className="h-[500px] bg-space-dark rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Globe className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">
                              Live preview is available for HTML/CSS/JS projects
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="output" className="mt-0">
                  <Card className="bg-space-darker border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Output Console</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px] bg-space-dark rounded-lg p-4">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                          {output || "Click 'Run Code' to see output here..."}
                        </pre>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="explanation" className="mt-0">
                  <Card className="bg-space-darker border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-primary-red" />
                        AI Code Explanation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[500px] bg-space-dark rounded-lg p-4">
                        {codeExplanation ? (
                          <div className="prose prose-invert max-w-none">
                            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                              {codeExplanation}
                            </pre>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            <Lightbulb className="h-16 w-16 text-gray-600 mb-4" />
                            <p className="text-gray-400 mb-2">No code explanation yet</p>
                            <p className="text-sm text-gray-500">
                              Click "Explain Code" to get AI-powered insights about your code
                            </p>
                          </div>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pb-12"></div>
      <Footer />
      
      <AIChat 
        currentCode={getCurrentCode()}
        currentLanguage={selectedLanguage}
        pageContext="playground"
      />
    </div>
  );
}