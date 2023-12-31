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
      'anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351',
      {
        input: {
          prompt: input,
        },
      }
    );

    return NextResponse.json(res);
  } catch (error) {
    console.log('[VIDEO_ERROR]: ', error);
    return new NextResponse('Internal Error ', { status: 500 });
  }
}
