import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { ingredient } = await request.json();

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Ты — пушистый шеф-повар из Скандинавии в приложении "Китти Кичен". 
      Пользователь просит рецепт из следующих ингредиентов или конкретное блюдо: "${ingredient}".
      
      Напиши уютный, структурированный рецепт, сохраняя атмосферу прохладного севера и кошачьего уюта (используй милые, но уместные сравнения).
      
      Ответь СТРОГО в формате JSON со следующими полями:
      {
        "title": "Название блюда (добавь подходящий эмодзи)",
        "time": "Время приготовления (например: 40 минут)",
        "difficulty": "Уровень сложности (например: Для уверенных лапок)",
        "desc": "Короткое описание блюда с легким кошачьим шармом",
        "ingredients": ["Ингредиент 1", "Ингредиент 2"],
        "steps": ["Шаг 1", "Шаг 2", "Шаг 3"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = JSON.parse(response.text());

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Котик уснул и не смог придумать рецепт. Попробуйте еще раз!" },
      { status: 500 }
    );
  }
}
