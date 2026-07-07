'use client';
import { useState } from 'react';

export default function Page() {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  async function getRecipe(ingredient: string) {
    setLoading(true);
    const res = await fetch('/api/recipe', {
      method: 'POST',
      body: JSON.stringify({ ingredient }),
    });
    const data = await res.json();
    setRecipe(data.text);
    setLoading(false);
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>🐾 Китти Кичен</h1>
      <input 
        placeholder="Что в холодильнике?" 
        onKeyDown={(e) => {
          if (e.key === 'Enter') getRecipe(e.currentTarget.value);
        }}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      <div style={{ padding: '20px', border: '1px solid #ccc' }}>
        {loading ? "Котик думает..." : (recipe || "Напиши ингредиент и нажми Enter")}
      </div>
    </div>
  );
}
