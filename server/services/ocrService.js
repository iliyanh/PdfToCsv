
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function askChatGPT(prompt) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a concise assistant." },
      { role: "user", content: prompt }
    ]
  });
  return completion.choices[0]?.message?.content ?? "";
}
