'use client';
import { useState } from 'react';

export default function Page() {
  const [recipe, setRecipe] = useState<any>(null);
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
    <div className={styles.container}>
      <h1>🐾 Китти Кичен</h1>
      <p>Скандинавский уют и рецепты</p>
      
      <div className={styles.card}>
        {!recipe ? (
          <div className={styles.inputGroup}>
            <input placeholder="Что сегодня в холодильнике?.." onKeyDown={(e) => {
              if (e.key === 'Enter') getRecipe(e.currentTarget.value);
            }} />
          </div>
        ) : (
          <div>
            <h3>Скандинавский рецепт</h3>
            <div style={{ whiteSpace: 'pre-wrap' }}>{recipe}</div>
            <button onClick={() => setRecipe(null)} className={styles.button} style={{marginTop: '20px'}}>Начать заново</button>
          </div>
        )}
      </div>
    </div>
  );
}
