import { supabase } from "@/integrations/supabase/client";

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
  const { data, error } = await supabase.functions.invoke('code-ai', {
    body: { action: 'analyze', code }
  });

  if (error) {
    console.error('Analysis error:', error);
    throw new Error(error.message || 'Failed to analyze code');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result;
};

export const explainCode = async (
  code: string, 
  level: 'beginner' | 'advanced'
): Promise<{
  overview: string;
  sections: { lineRange: string; code: string; explanation: string }[];
  summary: string;
}> => {
  const { data, error } = await supabase.functions.invoke('code-ai', {
    body: { action: 'explain', code, level }
  });

  if (error) {
    console.error('Explain error:', error);
    throw new Error(error.message || 'Failed to explain code');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result;
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
  const { data, error } = await supabase.functions.invoke('code-ai', {
    body: { action: 'fix', code }
  });

  if (error) {
    console.error('Fix error:', error);
    throw new Error(error.message || 'Failed to fix bugs');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result;
};

export const generateCode = async (prompt: string, language: string): Promise<string> => {
  const { data, error } = await supabase.functions.invoke('code-ai', {
    body: { action: 'generate', prompt, language }
  });

  if (error) {
    console.error('Generate error:', error);
    throw new Error(error.message || 'Failed to generate code');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result;
};

export const chatWithAI = async (message: string): Promise<string> => {
  const { data, error } = await supabase.functions.invoke('code-ai', {
    body: { action: 'chat', prompt: message }
  });

  if (error) {
    console.error('Chat error:', error);
    throw new Error(error.message || 'Failed to chat with AI');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.result;
};
