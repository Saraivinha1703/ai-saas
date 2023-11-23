import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { input, amount = 1, resolution = '512x512' } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openAI.apiKey) {
      return new NextResponse('Open AI key not configured', { status: 500 });
    }

    if (!input) {
      return new NextResponse('A input is required', { status: 400 });
    }

    const imagesGenerated = await openAI.images.generate({
      prompt: input,
      n: parseInt(amount, 10),
      size: resolution,
    });

    return NextResponse.json(imagesGenerated.data);
  } catch (error) {
    console.log('[IMAGE_ERROR]: ', error);
    return new NextResponse('Internal Error ', { status: 500 });
  }
}
