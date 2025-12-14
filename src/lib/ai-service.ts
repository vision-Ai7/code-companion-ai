// AI service for code analysis, explanation, bug fixing, and generation
// This is a mock implementation - in production, connect to Lovable Cloud

import { detectLanguage } from './ocr';

// Mock AI responses for demo purposes
export const analyzeCode = async (code: string): Promise<{
  language: string;
  description: string;
  strengths: string[];
  problems: string[];
  suggestions: string[];
  securityIssues?: string[];
  performanceNotes?: string[];
  cleanCode?: string;
}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const language = detectLanguage(code);
  const lines = code.split('\n').length;
  
  return {
    language: language.charAt(0).toUpperCase() + language.slice(1),
    description: `This ${language} code appears to define a function or module with approximately ${lines} lines. It processes data and returns results based on the implementation logic.`,
    strengths: [
      'Clean code structure with proper indentation',
      'Uses meaningful variable names',
      'Follows common coding conventions',
      'Modular design for reusability',
    ],
    problems: code.length > 500 ? [
      'Some functions may be too long',
      'Consider breaking down complex logic',
      'Missing error handling in some areas',
    ] : [
      'Code is relatively simple and well-structured',
    ],
    suggestions: [
      'Add comments to explain complex logic',
      'Consider adding input validation',
      'Implement proper error handling',
      'Add unit tests for critical functions',
      'Consider using TypeScript for type safety',
    ],
    securityIssues: code.includes('eval') || code.includes('innerHTML') ? [
      'Avoid using eval() - it can execute arbitrary code',
      'Be careful with innerHTML - use textContent when possible',
    ] : undefined,
    performanceNotes: [
      'Consider memoization for expensive computations',
      'Use appropriate data structures for lookups',
    ],
    cleanCode: code, // In production, this would be the optimized version
  };
};

export const explainCode = async (
  code: string, 
  level: 'beginner' | 'advanced'
): Promise<{
  overview: string;
  sections: { lineRange: string; code: string; explanation: string }[];
  summary: string;
}> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const lines = code.split('\n');
  const language = detectLanguage(code);
  
  const sections = [];
  const chunkSize = Math.max(1, Math.ceil(lines.length / 4));
  
  for (let i = 0; i < lines.length; i += chunkSize) {
    const chunk = lines.slice(i, i + chunkSize);
    sections.push({
      lineRange: `${i + 1}-${Math.min(i + chunkSize, lines.length)}`,
      code: chunk.join('\n'),
      explanation: level === 'beginner' 
        ? `This section of ${language} code performs a specific operation. Each line builds upon the previous to create the desired functionality.`
        : `This code block implements core logic using ${language} patterns. It handles data transformation and processing with consideration for edge cases.`,
    });
  }
  
  return {
    overview: level === 'beginner'
      ? `This is a ${language} program that does something useful! Let's break it down step by step so you can understand exactly what's happening.`
      : `This ${language} implementation follows standard patterns for the language. The code structure demonstrates proper separation of concerns and efficient data handling.`,
    sections,
    summary: level === 'beginner'
      ? `Great job understanding this code! The main takeaway is that this ${language} code processes data in a structured way. Keep practicing and you'll master these concepts!`
      : `This codebase demonstrates solid ${language} fundamentals with room for optimization in error handling and performance. Consider implementing suggested improvements for production use.`,
  };
};

export const fixBugs = async (code: string): Promise<{
  language: string;
  bugs: {
    type: 'syntax' | 'logic' | 'security' | 'performance' | 'deprecated';
    severity: 'low' | 'medium' | 'high' | 'critical';
    line?: string;
    description: string;
    fix: string;
  }[];
  fixedCode: string;
  changesSummary: string[];
}> => {
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const language = detectLanguage(code);
  const bugs = [];
  const changes = [];
  
  // Check for common issues
  if (code.includes('==') && !code.includes('===')) {
    bugs.push({
      type: 'logic' as const,
      severity: 'medium' as const,
      description: 'Using loose equality (==) instead of strict equality (===)',
      fix: 'Replace == with === for strict comparison to avoid type coercion issues',
    });
    changes.push('Replaced loose equality with strict equality operators');
  }
  
  if (code.includes('var ')) {
    bugs.push({
      type: 'deprecated' as const,
      severity: 'low' as const,
      description: 'Using var keyword which has function scope issues',
      fix: 'Use const or let instead of var for block-scoped variables',
    });
    changes.push('Replaced var with const/let for better scoping');
  }
  
  if (code.includes('eval(')) {
    bugs.push({
      type: 'security' as const,
      severity: 'critical' as const,
      description: 'Using eval() which can execute arbitrary code',
      fix: 'Remove eval() and use safer alternatives like JSON.parse() for data parsing',
    });
    changes.push('Removed dangerous eval() usage');
  }
  
  if (!code.includes('try') && !code.includes('catch')) {
    bugs.push({
      type: 'logic' as const,
      severity: 'medium' as const,
      description: 'No error handling detected',
      fix: 'Add try-catch blocks to handle potential errors gracefully',
    });
    changes.push('Added error handling with try-catch blocks');
  }
  
  // Apply basic fixes to the code
  let fixedCode = code
    .replace(/==/g, '===')
    .replace(/!=/g, '!==')
    .replace(/var /g, 'const ');
  
  return {
    language: language.charAt(0).toUpperCase() + language.slice(1),
    bugs,
    fixedCode,
    changesSummary: changes,
  };
};

export const generateCode = async (prompt: string, language: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Demo code templates based on common prompts
  const templates: Record<string, Record<string, string>> = {
    calculator: {
      javascript: `// Simple Calculator
class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
  
  multiply(a, b) {
    return a * b;
  }
  
  divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}

// Usage
const calc = new Calculator();
console.log(calc.add(5, 3));      // 8
console.log(calc.multiply(4, 7)); // 28`,
      python: `# Simple Calculator
class Calculator:
    def add(self, a: float, b: float) -> float:
        return a + b
    
    def subtract(self, a: float, b: float) -> float:
        return a - b
    
    def multiply(self, a: float, b: float) -> float:
        return a * b
    
    def divide(self, a: float, b: float) -> float:
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

# Usage
calc = Calculator()
print(calc.add(5, 3))      # 8
print(calc.multiply(4, 7)) # 28`,
    },
    login: {
      javascript: `// Login Form Component
import { useState } from 'react';

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ email, password });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;`,
    },
    todo: {
      javascript: `// Todo List with CRUD Operations
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  // Create
  const addTodo = () => {
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input, completed: false }
      ]);
      setInput('');
    }
  };
  
  // Update
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  // Delete
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Add a new todo..."
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
    },
  };
  
  // Find matching template
  const promptLower = prompt.toLowerCase();
  let template = '';
  
  if (promptLower.includes('calculator')) {
    template = templates.calculator[language] || templates.calculator.javascript;
  } else if (promptLower.includes('login') || promptLower.includes('form')) {
    template = templates.login[language] || templates.login.javascript;
  } else if (promptLower.includes('todo')) {
    template = templates.todo[language] || templates.todo.javascript;
  } else {
    // Default template
    template = `// ${prompt}
// Generated code for ${language}

function main() {
  // TODO: Implement ${prompt}
  console.log("Implementation for: ${prompt}");
}

main();`;
  }
  
  return template;
};

export const chatWithAI = async (message: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const messageLower = message.toLowerCase();
  
  // Simple response matching
  if (messageLower.includes('hello') || messageLower.includes('hi')) {
    return "Hello! I'm VisionCode AI, your coding assistant. How can I help you today? You can ask me about:\n\n- Programming concepts and best practices\n- Debugging help and error explanations\n- Code optimization tips\n- Framework and library questions\n- Algorithm explanations\n\nWhat would you like to know?";
  }
  
  if (messageLower.includes('javascript') || messageLower.includes('js')) {
    return "JavaScript is a versatile programming language primarily used for web development. Here are some key concepts:\n\n```javascript\n// Modern JavaScript features\nconst greeting = (name) => `Hello, ${name}!`;\n\n// Async/Await\nasync function fetchData() {\n  const response = await fetch('/api/data');\n  return response.json();\n}\n\n// Destructuring\nconst { name, age } = user;\n```\n\nWould you like me to explain any specific JavaScript concept in detail?";
  }
  
  if (messageLower.includes('react')) {
    return "React is a powerful library for building user interfaces. Here's a quick overview:\n\n```jsx\n// Functional Component with Hooks\nimport { useState, useEffect } from 'react';\n\nfunction MyComponent({ title }) {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n  \n  return (\n    <div>\n      <h1>{title}</h1>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n```\n\nKey concepts: Components, Props, State, Hooks, and the Virtual DOM. What would you like to learn more about?";
  }
  
  if (messageLower.includes('python')) {
    return "Python is known for its readability and versatility. Here are some examples:\n\n```python\n# List comprehension\nsquares = [x**2 for x in range(10)]\n\n# Dictionary comprehension\nword_lengths = {word: len(word) for word in words}\n\n# Async programming\nasync def fetch_data():\n    async with aiohttp.ClientSession() as session:\n        async with session.get(url) as response:\n            return await response.json()\n\n# Type hints (Python 3.5+)\ndef greet(name: str) -> str:\n    return f\"Hello, {name}!\"\n```\n\nPython is great for web development, data science, automation, and more. What specific topic interests you?";
  }
  
  if (messageLower.includes('error') || messageLower.includes('bug') || messageLower.includes('fix')) {
    return "I'd be happy to help you debug! To assist you better, please share:\n\n1. **The error message** - Copy the exact error you're seeing\n2. **The code** - Share the relevant code snippet\n3. **What you expected** - Describe the expected behavior\n4. **What actually happened** - Describe the actual behavior\n\nYou can paste your code here, or use the **Bug Detector** tab to automatically analyze and fix issues in your code!";
  }
  
  // Default response
  return `That's a great question about "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"!\n\nI can help you with:\n\n1. **Code Analysis** - Understanding what code does\n2. **Bug Fixing** - Finding and fixing errors\n3. **Best Practices** - Writing better code\n4. **Explanations** - Learning new concepts\n\nCould you provide more details or share some code? The more context you give, the better I can assist you!`;
};
