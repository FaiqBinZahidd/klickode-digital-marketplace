// Test script to verify AI functionality is working
const testAIFunctionality = async () => {
  console.log('Testing AI functionality...');
  
  // Test 1: Learning API
  console.log('\n1. Testing Learning API...');
  try {
    const learnResponse = await fetch('http://localhost:5000/api/learn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'JavaScript variables',
        level: 'beginner',
        language: 'javascript'
      })
    });
    
    if (learnResponse.ok) {
      const learnData = await learnResponse.json();
      console.log('✅ Learning API working');
      console.log('Response keys:', Object.keys(learnData));
    } else {
      console.log('❌ Learning API failed:', learnResponse.status);
    }
  } catch (error) {
    console.log('❌ Learning API error:', error.message);
  }

  // Test 2: AI Tools API
  console.log('\n2. Testing AI Tools API...');
  try {
    const toolsResponse = await fetch('http://localhost:5000/api/ai-tools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool: 'explainer',
        input: 'const x = 5;',
        language: 'javascript'
      })
    });
    
    if (toolsResponse.ok) {
      const toolsData = await toolsResponse.json();
      console.log('✅ AI Tools API working');
      console.log('Response has result:', !!toolsData.result);
    } else {
      console.log('❌ AI Tools API failed:', toolsResponse.status);
    }
  } catch (error) {
    console.log('❌ AI Tools API error:', error.message);
  }

  // Test 3: Code Explanation API
  console.log('\n3. Testing Code Explanation API...');
  try {
    const explainResponse = await fetch('http://localhost:5000/api/explain-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: 'function greet(name) { return "Hello " + name; }',
        language: 'javascript'
      })
    });
    
    if (explainResponse.ok) {
      const explainData = await explainResponse.json();
      console.log('✅ Code Explanation API working');
      console.log('Response has explanation:', !!explainData.explanation);
    } else {
      console.log('❌ Code Explanation API failed:', explainResponse.status);
    }
  } catch (error) {
    console.log('❌ Code Explanation API error:', error.message);
  }

  console.log('\n✅ AI functionality test completed!');
};

// Run the test
testAIFunctionality().catch(console.error);