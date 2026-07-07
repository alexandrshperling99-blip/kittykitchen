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
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9F9', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', fontFamily: 'Segoe UI, sans-serif', color: '#4A5568' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#5F7A76', fontWeight: '300', fontSize: '2.5rem', margin: '0' }}>Китти Кичен</h1>
        <p style={{ color: '#7D8B89', letterSpacing: '0.2em', fontSize: '0.85rem', textTransform: 'uppercase', marginTop: '5px' }}>Скандинавский уют и рецепты</p>
      </header>
      
      <div style={{ background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '600px', border: '1px solid #E2E8F0' }}>
        {!recipe ? (
          <>
            <input 
              style={{ width: '100%', padding: '15px', border: '1px solid #CBD5E0', borderRadius: '12px', fontSize: '1rem', marginBottom: '15px', boxSizing: 'border-box' }}
              placeholder="Что сегодня в холодильнике?.." 
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button style={{ width: '100%', background: '#5F7A76', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', fontSize: '1rem', cursor: 'pointer' }} onClick={handleSearch}>Найти</button>
          </>
        ) : (
          <div>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7', color: '#2D3748' }}>{recipe}</div>
            <button style={{ marginTop: '20px', width: '100%', background: '#7D8B89', color: 'white', padding: '15px', borderRadius: '12px', border: 'none', cursor: 'pointer' }} onClick={() => setRecipe(null)}>Начать заново</button>
          </div>
        )}
      </div>
    </div>
  );
}
