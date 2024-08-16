import { createResource } from '@/lib/actions/resources';
import { findRelevantContent } from '@/lib/ai/embedding';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText, streamUI, tool } from 'ai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();



    const result = await streamText({
        model: openai('gpt-4o'),
        system: `You are a helpful assistant. Check your knowledge base before answering any questions.
        Only respond to questions using information from tool calls.
        if no relevant information is found in the tool calls, respond, "Sorry, I don't know the answer to that."`,
        tools: {
            addResource: tool({
                description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
                parameters: z.object({
                    content: z
                        .string()
                        .describe('the content or resource to add to the knowledge base'),
                }),
                execute: async ({ content }) => createResource({ content }),
            }),
            //todo get the getInformation tool to work (seems to work without it)
            // getInformation: tool({
            //     description: `get information from your knowledge base to answer questions.`,
            //     parameters: z.object({
            //         question: z.string().describe('the users question'),
            //     }),
            //     execute: async ({ question }) => findRelevantContent(question),
            // }),
        },
        messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
}