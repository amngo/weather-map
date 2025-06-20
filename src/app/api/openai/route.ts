import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { formatRephrasePrompt } from '@/lib/prompts';

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY!,
});

export async function POST(req: NextRequest) {
    const { alertText } = await req.json();

    const prompt = formatRephrasePrompt(alertText);

    const completion = await openai.chat.completions.create({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        response_format: {
            type: 'json_object',
        },
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');
    return NextResponse.json({ result: response });
}
