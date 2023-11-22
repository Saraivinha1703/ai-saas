import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { ChatCompletionSystemMessageParam } from 'openai/resources/index.mjs';

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const instructionMessage: ChatCompletionSystemMessageParam = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanation.',
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openAI.apiKey) {
      return new NextResponse('Open AI key not configured', { status: 500 });
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const completion = await openAI.chat.completions.create({
      messages: [instructionMessage, ...messages],
      model: 'gpt-3.5-turbo',
    });

    console.log('OpenAI choices: ', completion.choices[0]);
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log('[CODE_ERROR]: ', error);
    return new NextResponse('Internal Error ', { status: 500 });
  }
}
