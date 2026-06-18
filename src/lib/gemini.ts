import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

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
    const result = await model.generateContent(instruction);
    const text = result.response.text();
    if (!text) throw new Error("Empty response from Gemini");
    return text;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    throw new Error(`Gemini API error: ${message}`);
  }
}
