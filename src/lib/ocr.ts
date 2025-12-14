import Tesseract from 'tesseract.js';

export const extractCodeFromImage = async (file: File): Promise<string> => {
  try {
    const result = await Tesseract.recognize(
      file,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    );
    
    // Clean up the extracted text
    let text = result.data.text;
    
    // Common OCR corrections for code
    text = text
      .replace(/\|/g, 'l') // Often | is misread for l
      .replace(/0/g, (match, offset, string) => {
        // Keep 0 if it's likely a number context
        const before = string[offset - 1];
        const after = string[offset + 1];
        if (/\d/.test(before) || /\d/.test(after)) {
          return '0';
        }
        return match;
      })
      .replace(/\t/g, '  ') // Normalize tabs to spaces
      .trim();

    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract code from image');
  }
};

export const detectLanguage = (code: string): string => {
  const patterns: Record<string, RegExp[]> = {
    python: [
      /\bdef\s+\w+\s*\(/,
      /\bimport\s+\w+/,
      /\bfrom\s+\w+\s+import/,
      /\bprint\s*\(/,
      /:\s*$/m,
      /\bself\./,
    ],
    javascript: [
      /\bfunction\s+\w+\s*\(/,
      /\bconst\s+\w+\s*=/,
      /\blet\s+\w+\s*=/,
      /\bvar\s+\w+\s*=/,
      /=>\s*\{/,
      /\bconsole\.log\s*\(/,
    ],
    typescript: [
      /:\s*(string|number|boolean|any|void)\b/,
      /\binterface\s+\w+/,
      /\btype\s+\w+\s*=/,
      /<\w+>/,
    ],
    java: [
      /\bpublic\s+(static\s+)?void\s+main/,
      /\bpublic\s+class\s+\w+/,
      /\bSystem\.out\.print/,
      /\bprivate\s+\w+/,
    ],
    cpp: [
      /#include\s*<\w+>/,
      /\bstd::/,
      /\bcout\s*<</,
      /\bint\s+main\s*\(/,
    ],
    c: [
      /#include\s*<stdio\.h>/,
      /\bprintf\s*\(/,
      /\bint\s+main\s*\(/,
      /\bmalloc\s*\(/,
    ],
    csharp: [
      /\busing\s+System/,
      /\bnamespace\s+\w+/,
      /\bConsole\.Write/,
      /\bpublic\s+static\s+void\s+Main/,
    ],
    go: [
      /\bpackage\s+main/,
      /\bfunc\s+main\s*\(/,
      /\bfmt\.Print/,
      /\bimport\s*\(/,
    ],
    rust: [
      /\bfn\s+main\s*\(/,
      /\blet\s+mut\s+\w+/,
      /\bprintln!\s*\(/,
      /\bimpl\s+\w+/,
    ],
    ruby: [
      /\bdef\s+\w+$/m,
      /\bputs\s+/,
      /\brequire\s+['"]/,
      /\bend$/m,
    ],
    php: [
      /<\?php/,
      /\$\w+\s*=/,
      /\becho\s+/,
      /\bfunction\s+\w+\s*\(/,
    ],
    swift: [
      /\bfunc\s+\w+\s*\(/,
      /\bvar\s+\w+\s*:/,
      /\blet\s+\w+\s*:/,
      /\bprint\s*\(/,
    ],
    kotlin: [
      /\bfun\s+main\s*\(/,
      /\bval\s+\w+\s*=/,
      /\bvar\s+\w+\s*=/,
      /\bprintln\s*\(/,
    ],
    dart: [
      /\bvoid\s+main\s*\(/,
      /\bprint\s*\(/,
      /\bfinal\s+\w+\s*=/,
      /\bclass\s+\w+\s+extends/,
    ],
    html: [
      /<html/i,
      /<head/i,
      /<body/i,
      /<div/i,
      /<\/\w+>/,
    ],
    css: [
      /\{[^}]*:\s*[^;]+;/,
      /\.\w+\s*\{/,
      /#\w+\s*\{/,
      /@media/,
    ],
    sql: [
      /\bSELECT\s+/i,
      /\bFROM\s+/i,
      /\bWHERE\s+/i,
      /\bINSERT\s+INTO/i,
    ],
  };

  let maxScore = 0;
  let detectedLanguage = 'javascript';

  for (const [language, regexps] of Object.entries(patterns)) {
    let score = 0;
    for (const regex of regexps) {
      if (regex.test(code)) {
        score++;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      detectedLanguage = language;
    }
  }

  return detectedLanguage;
};
