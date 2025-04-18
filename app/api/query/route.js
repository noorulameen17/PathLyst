
import { NextResponse } from 'next/server';
import { querySonar } from '@/lib/sonar';
import { generatePrompt } from '@/utils/generatePrompt';

export async function POST(request) {
  try {
    const { formData } = await request.json();
    
    // Generate research-grade prompt from form data
    const prompt = generatePrompt(formData);
    
    // Query Perplexity API
    const response = await querySonar(prompt);
    
    // Process and return the response
    return NextResponse.json({
      text: response.text || response.answer,
      citations: response.citations || []
    });
  } catch (error) {
    console.error('Error processing query:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}