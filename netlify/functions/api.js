// Netlify Function to handle API requests
const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Mock API responses for static deployment
app.use(express.json());

// Mock storage for static deployment
const mockCategories = [
  { id: 1, name: 'UI Kits', description: 'Professional interface components' },
  { id: 2, name: 'Templates', description: 'Complete project templates' },
  { id: 3, name: 'Icons', description: 'Pixel-perfect icon sets' },
  { id: 4, name: 'Mobile', description: 'Mobile app components' },
  { id: 5, name: 'Web Apps', description: 'Full-featured web applications' },
  { id: 6, name: 'All Assets', description: 'Browse all digital assets' }
];

const mockAssets = [
  {
    id: 1,
    title: 'Modern UI Kit',
    description: 'A comprehensive UI kit with modern design elements',
    price: 29.99,
    category: 'UI Kits',
    imageUrl: '/api/placeholder/400/300',
    rating: 4.8,
    downloads: 1250,
    seller: 'DesignStudio',
    tags: ['UI', 'Design', 'Components']
  },
  {
    id: 2,
    title: 'React Dashboard Template',
    description: 'Complete dashboard template built with React',
    price: 49.99,
    category: 'Templates',
    imageUrl: '/api/placeholder/400/300',
    rating: 4.9,
    downloads: 890,
    seller: 'CodeCrafters',
    tags: ['React', 'Dashboard', 'Template']
  }
];

// API Routes
app.get('/api/categories', (req, res) => {
  res.json(mockCategories);
});

app.get('/api/assets', (req, res) => {
  res.json(mockAssets);
});

app.get('/api/assets/:id', (req, res) => {
  const asset = mockAssets.find(a => a.id === parseInt(req.params.id));
  if (asset) {
    res.json(asset);
  } else {
    res.status(404).json({ error: 'Asset not found' });
  }
});

// AI Tools endpoint
app.post('/api/ai-tools', (req, res) => {
  const { tool, input } = req.body;
  
  // Mock AI responses
  const mockResponses = {
    'generator': `Generated code for: ${input}\n\n\`\`\`javascript\n// Generated code example\nfunction example() {\n  console.log('Hello, World!');\n}\n\`\`\``,
    'translator': `Translated code:\n\n\`\`\`python\n# Translated to Python\ndef example():\n    print('Hello, World!')\n\`\`\``,
    'explainer': `Code explanation:\n\n**This code** creates a simple function that outputs a greeting message. The function demonstrates basic syntax and console output.`,
    'optimizer': `Optimized code:\n\n\`\`\`javascript\n// Optimized version\nconst example = () => console.log('Hello, World!');\n\`\`\``,
    'debugger': `Debug analysis:\n\n**Issues found:**\n- No issues detected in the provided code\n- Code follows best practices`,
    'reviewer': `Code review:\n\n**Strengths:**\n- Clean and readable code\n- Good naming conventions\n\n**Suggestions:**\n- Consider adding error handling`
  };
  
  res.json({ result: mockResponses[tool] || 'AI tool response not available in static mode' });
});

// Learn endpoint
app.post('/api/learn', (req, res) => {
  const { topic, level, language } = req.body;
  
  const mockLearningContent = {
    explanation: `Learning content for ${topic} at ${level} level in ${language}:\n\n**Key concepts:**\n- Concept 1\n- Concept 2\n- Concept 3`,
    codeExample: `\`\`\`${language}\n// Example code\nconsole.log('Learning ${topic}');\n\`\`\``,
    keyPoints: [
      'Important point 1',
      'Important point 2',
      'Important point 3'
    ],
    nextTopics: [
      'Advanced topic 1',
      'Advanced topic 2',
      'Advanced topic 3'
    ]
  };
  
  res.json(mockLearningContent);
});

// Default fallback
app.use('*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

module.exports.handler = serverless(app);