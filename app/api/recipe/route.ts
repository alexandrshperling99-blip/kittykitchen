import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const { ingredient } = await req.json();
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  
  const result = await model.generateContent(`Дай рецепт из ${ingredient} в стиле кота.`);
  return Response.json({ text: result.response.text() });
}
