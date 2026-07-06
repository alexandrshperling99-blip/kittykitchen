'use client';
import { useState } from 'react';

export default function KittyKitchen() {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecipe = async (ingredient: string) => {
    setLoading(true);
    const res = await fetch('/api/recipe', {
      method: 'POST',
      body: JSON.stringify({ ingredient }),
    });
    const data = await res.json();
    setRecipe(data.text);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#E2E8E6] p-8 font-sans text-[#2D3436]">
      <div className="max-w-xl mx-auto bg-[#F4F7F6] p-10 rounded-xl shadow-lg border border-[#D1D9D7]">
        <h1 className="text-3xl font-light text-[#5F7A76] mb-6 text-center">🐾 Китти Кичен</h1>
        <input 
          type="text" 
          placeholder="Что в холодильнике?"
          className="w-full p-3 border border-[#BDC3C7] rounded-lg mb-4 bg-white"
          onKeyDown={(e) => e.key === 'Enter' && fetchRecipe(e.currentTarget.value)}
        />
        <div className="min-h-[200px] bg-white p-6 rounded-lg border border-[#D1D9D7] italic">
          {loading ? "Котик ищет рецепт..." : (recipe || "Введите ингредиент и нажмите Enter")}
        </div>
      </div>
    </main>
  );
}
