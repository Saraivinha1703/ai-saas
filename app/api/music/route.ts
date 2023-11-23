import Replicate from 'replicate';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_KEY });

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { input } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!input) {
      return new NextResponse('A input is required', { status: 400 });
    }

    const res = await replicate.run(
      'riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05',
      {
        input: {
          prompt_a: input,
        },
      }
    );

    return NextResponse.json(res);
  } catch (error) {
    console.log('[MUSIC_ERROR]: ', error);
    return new NextResponse('Internal Error ', { status: 500 });
  }
}
