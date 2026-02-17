import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { SYSTEM_PROMPT, ERROR_MESSAGES } from '@/lib/constants';

/**
 * POST /api/ai
 * Handles AI requests by sending user input to Hugging Face via OpenAI SDK
 * 
 * Request body: { userInput: string, mode?: 'simplify' | 'template' }
 * Response: { response: string } or { error: string }
 */
export async function POST(request) {
  try {
    // Parse request body
    const { userInput, mode, messages: history } = await request.json();

    // Validate input
    if ((!userInput || userInput.trim().length === 0) && (!history || history.length === 0)) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.EMPTY_INPUT },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.HF_TOKEN;
    if (!apiKey) {
      console.error('HF_TOKEN is not set');
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_API_KEY },
        { status: 500 }
      );
    }

    // Initialize OpenAI client with Hugging Face router
    const client = new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: apiKey,
    });

    // Determine messages to send
    let apiMessages = [];
    if (history && history.length > 0) {
      apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...history
      ];
    } else {
      // Fallback for single prompt if 'messages' not provided
      let userPrompt = userInput;
      if (mode === 'simplify') {
        userPrompt = `Explique cette situation de manière encore plus simple, comme si tu parlais à quelqu'un qui n'a jamais fait de démarches administratives :\n\n${userInput}`;
      } else if (mode === 'template') {
        userPrompt = `Génère un modèle de lettre ou email détaillé et personnalisable pour cette situation :\n\n${userInput}`;
      }
      apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ];
    }

    // Call Hugging Face via OpenAI SDK
    const chatCompletion = await client.chat.completions.create({
      model: "Qwen/Qwen2.5-7B-Instruct:together",
      messages: apiMessages,
      max_tokens: 2000,
      temperature: 0.7,
    });

    // Extract the response
    const generatedText = chatCompletion.choices[0].message.content;

    // Return the AI response
    return NextResponse.json({ response: generatedText });

  } catch (error) {
    console.error('Error in AI API route:', error);
    
    // Check for rate limiting
    if (error.status === 429) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.RATE_LIMIT },
        { status: 429 }
      );
    }
    
    // Check for network errors
    if (error.message && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NETWORK_ERROR },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

// Optional: Add GET handler for health check
export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'AdminFrançais API is running'
  });
}
