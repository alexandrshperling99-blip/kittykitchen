'use client';
import { useState } from 'react';

export default function Page() {
  const [ingredient, setIngredient] = useState("");
  const [recipe, setRecipe] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!ingredient.trim()) return;
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
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#5F7A76' }}>Китти Кичен</h1>
      </header>
      
      <div className="card">
        {!recipe ? (
          <>
            <input 
              className="inputField" 
              placeholder="Что сегодня в холодильнике?.." 
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="button" onClick={handleSearch}>Найти</button>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              {loading ? "Котик ищет..." : "Введите ингредиент"}
            </p>
          </>
        ) : (
          <div>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{recipe}</div>
            <button className="button" onClick={() => setRecipe(null)}>Начать заново</button>
          </div>
        )}
      </div>
    </div>
  );
}
