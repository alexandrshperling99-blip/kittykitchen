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
      <header className="header">
        <h1 className="title">Китти Кичен</h1>
        <p className="subtitle">Скандинавский уют и рецепты</p>
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
          </>
        ) : (
          <div>
            <div className="recipeContent">{recipe}</div>
            <button className="button" style={{marginTop: '20px', background: '#7D8B89'}} onClick={() => setRecipe(null)}>Начать заново</button>
          </div>
        )}
      </div>
    </div>
  );
}
