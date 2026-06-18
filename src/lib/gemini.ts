import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const templates: Record<string, string> = {
  blog: "Write a detailed blog post about the following topic",
  caption: "Write an engaging social media caption about the following topic",
  email: "Write a professional email about the following topic",
  "product-description": "Write a compelling product description for the following",
};

export async function generateContent(
  templateType: string,
  prompt: string,
  tone?: string
): Promise<string> {
  const base = templates[templateType] ?? "Write content about the following topic";
  const toneClause = tone ? ` Use a ${tone} tone.` : "";
  const instruction = `${base}.${toneClause}\n\nTopic: ${prompt}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: instruction }],
    });
    const text = completion.choices[0]?.message?.content;
    if (!text) throw new Error("Empty response from Groq");
    return text;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    throw new Error(`Groq API error: ${message}`);
  }
}
