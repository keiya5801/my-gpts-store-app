import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// 1. Supabaseキッチンと通信するための準備
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  // 2. キッチンから持ってきたゲームリストを置くためのお皿を用意
  const [games, setGames] = useState([]);

  // 3. このページが表示された時に、一度だけ実行する魔法
  useEffect(() => {
    // キッチンにゲームを取りに行く関数を呼び出す
    getGames();
  }, []);

  // 4. キッチンからゲームデータを持ってくるための関数
  async function getGames() {
    // supabaseの'games'という棚から、全てのデータをください！とお願いする
    const { data } = await supabase.from('games').select();
    // 持ってきたデータを、用意したお皿(games)の上にセットする
    setGames(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>GPTs ゲームストア</h1>
        {/* 5. お皿に載っているゲームを一つずつ取り出して表示する */}
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <a href={game.url} target="_blank" rel="noopener noreferrer">
                {game.name}
              </a>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;