import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, code, language, prompt, level, messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "analyze":
        systemPrompt = `You are an expert code analyzer. Analyze the provided code and return a JSON response with the following structure:
{
  "language": "detected programming language",
  "description": "what the code does (2-3 sentences)",
  "strengths": ["list of 3-5 strengths"],
  "problems": ["list of problems found, empty if none"],
  "suggestions": ["list of 3-5 improvement suggestions"],
  "securityIssues": ["list of security issues if any"],
  "performanceNotes": ["list of performance considerations"],
  "cleanCode": "optimized version of the code"
}
Return ONLY valid JSON, no markdown or explanation.`;
        userPrompt = `Analyze this code:\n\n${code}`;
        break;

      case "explain":
        const levelDesc = level === "beginner" 
          ? "Use simple, beginner-friendly language. Explain concepts as if teaching someone new to programming."
          : "Use technical language appropriate for experienced developers.";
        systemPrompt = `You are an expert code educator. ${levelDesc} Return a JSON response with:
{
  "overview": "brief overview of what the code does",
  "sections": [
    {
      "lineRange": "1-5",
      "code": "the code snippet for these lines",
      "explanation": "detailed explanation"
    }
  ],
  "summary": "key takeaways and summary"
}
Return ONLY valid JSON, no markdown or explanation.`;
        userPrompt = `Explain this code:\n\n${code}`;
        break;

      case "fix":
        systemPrompt = `You are an expert bug detector and code fixer. Analyze the code for bugs, security issues, deprecated methods, and performance problems. Return a JSON response with:
{
  "language": "detected language",
  "bugs": [
    {
      "type": "syntax|logic|security|performance|deprecated",
      "severity": "low|medium|high|critical",
      "line": "line number if applicable",
      "description": "what the bug is",
      "fix": "how to fix it"
    }
  ],
  "fixedCode": "the corrected and optimized code",
  "changesSummary": ["list of changes made"]
}
Return ONLY valid JSON, no markdown or explanation.`;
        userPrompt = `Find and fix bugs in this code:\n\n${code}`;
        break;

      case "generate":
        systemPrompt = `You are an expert code generator. Generate clean, well-commented, production-ready code following best practices. Include proper error handling and comments. Return ONLY the code, no markdown code blocks or explanations.`;
        userPrompt = `Generate ${language} code for: ${prompt}`;
        break;

      case "chat":
        systemPrompt = `You are VisionCode AI, a helpful coding assistant. You help with:
- Coding questions and doubts
- Error explanations and debugging
- Framework and library questions
- Best practices and optimization tips
- Code snippets and examples

Be accurate, helpful, and include code examples when relevant. Use markdown for code blocks.`;
        
        const chatMessages = [
          { role: "system", content: systemPrompt },
          ...(messages || [{ role: "user", content: prompt }])
        ];

        const chatResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: chatMessages,
          }),
        });

        if (!chatResponse.ok) {
          const errorText = await chatResponse.text();
          console.error("AI gateway error:", chatResponse.status, errorText);
          
          if (chatResponse.status === 429) {
            return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
              status: 429,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          if (chatResponse.status === 402) {
            return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits." }), {
              status: 402,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          throw new Error("AI gateway error");
        }

        const chatData = await chatResponse.json();
        return new Response(JSON.stringify({ 
          result: chatData.choices[0].message.content 
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

      default:
        throw new Error("Invalid action");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    let result = data.choices[0].message.content;

    // For non-chat actions, try to parse JSON
    if (action !== "generate") {
      try {
        // Clean up potential markdown code blocks
        result = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        result = JSON.parse(result);
      } catch (e) {
        console.error("Failed to parse AI response as JSON:", e);
        // Return as-is if not valid JSON
      }
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in code-ai function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
