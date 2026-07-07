"use client";

import React, { useState } from 'react';
import { 
  ChevronRight,
  RefreshCw,
  Cat,
  Coffee,
  ChefHat
} from 'lucide-react';

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  const handleFetchRecipe = async (e) => {
    if (e) e.preventDefault();
    if (!ingredient.trim()) return;

    setLoading(true);
    setRecipe(null);
    setError("");
    
    try {
      const res = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredient }),
      });

      if (!res.ok) throw new Error("Ошибка сети");
      
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setRecipe(data);
      }
    } catch (err) {
      setError("Что-то пошло не так. Возможно, ИИ заигрался с клубком.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F7F6] text-[#2D3436] flex flex-col items-center py-12 px-4 font-sans selection:bg-[#B2C7C4]">
      <div className="max-w-2xl w-full">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4 text-[#5F7A76]">
            <Cat size={48} strokeWidth={1} />
          </div>
          <h1 className="text-4xl font-light tracking-tight text-[#5F7A76] mb-3">
            Китти Кичен
          </h1>
          <p className="text-[#7D8B89] text-sm uppercase tracking-[0.2em] font-medium">
            Скандинавский уют и рецепты
          </p>
        </header>

        <div className="bg-white border border-[#E0E7E6] rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-8">
          <form onSubmit={handleFetchRecipe} className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                placeholder="Что сегодня в холодильнике? (например: лазанья, лосось)..."
                className="w-full py-4 px-5 bg-[#F9FAFB] border border-[#EBECEC] rounded-xl text-[#2D3436] placeholder-[#AAB8B6] focus:outline-none focus:ring-2 focus:ring-[#B2C7C4]/50 transition-all"
              />
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 px-6 bg-[#5F7A76] text-white rounded-lg hover:bg-[#4D6461] transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <span>Найти</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </form>
        </div>

        <div className="min-h-[200px]">
          {loading ? (
            <div className="flex justify-center py-10 text-[#5F7A76] animate-pulse">
              <Coffee size={32} />
            </div>
          ) : error ? (
            <div className="text-center text-red-400 py-10">
              <p>{error}</p>
            </div>
          ) : recipe ? (
            <div className="bg-white border border-[#E0E7E6] rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-light text-[#5F7A76] mb-4 flex items-center gap-2">
                <ChefHat size={24} /> {recipe.title}
              </h2>
              <div className="prose prose-slate max-w-none text-[#2D3436]">
                <p className="italic text-[#7D8B89] mb-4">{recipe.desc}</p>
                
                <div className="flex gap-4 mb-6 text-sm text-[#5F7A76]">
                  <span className="bg-[#F4F7F6] px-3 py-1 rounded-full">⏱ {recipe.time}</span>
                  <span className="bg-[#F4F7F6] px-3 py-1 rounded-full">🐾 {recipe.difficulty}</span>
                </div>

                <h4 className="font-semibold mt-4">Что понадобится:</h4>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  {recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
                <h4 className="font-semibold">Пошагово:</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  {recipe.steps.map((step, i) => <li key={i} className="mb-2">{step}</li>)}
                </ol>
              </div>
              <button 
                onClick={() => { setRecipe(null); setIngredient(""); }}
                className="mt-8 text-sm text-[#7D8B89] hover:text-[#5F7A76] flex items-center gap-2 transition-colors"
              >
                <RefreshCw size={14} /> Начать заново
              </button>
            </div>
          ) : (
            <div className="text-center text-[#AAB8B6] py-10">
              <p>Ваша киса ждет ингредиентов для создания шедевра...</p>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-auto pt-12 pb-6 text-[#AAB8B6] text-xs">
        © 2026 Китти Кичен // Скандинавское вдохновение
      </footer>
    </main>
  );
}
