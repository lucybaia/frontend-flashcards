'use client'
import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import { Flashcard, Difficulty } from '@/types';

const difficulties: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'trainee', label: 'Trainee' },
  { value: 'junior', label: 'Junior' },
  { value: 'pleno', label: 'Pleno' },
  { value: 'senior', label: 'Senior' },
];

export default function Home() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  // 1. Aplica a classe .dark no HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 2. Embaralhar cards (Fisher-Yates)
  const shuffleCards = (array: Flashcard[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // 3. Busca os cards na API
  useEffect(() => {
    async function loadCards() {
      setLoading(true);
      try {
        const url = selectedDifficulty === 'all' 
          ? '/api/flashcards' 
          : `/api/flashcards?difficulty=${selectedDifficulty}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Falha na API");
        const text = await response.text();
        if (!text) throw new Error("Resposta vazia");
        const data = JSON.parse(text);
        
        const shuffled = shuffleCards(data);
        setCards(shuffled);
        setCurrentIndex(0);
        localStorage.removeItem('flashcards-progress');
      } catch (error) {
        console.error("Erro detalhado:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCards();
  }, [selectedDifficulty]);

  // 4. Salva o progresso no LocalStorage sempre que o index mudar
  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem('flashcards-progress', currentIndex.toString());
    }
  }, [currentIndex, cards]);

  const flipCard = () => {
    const newCards = [...cards];
    newCards[currentIndex].isFlipped = !newCards[currentIndex].isFlipped;
    setCards(newCards);
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevCard = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const progressPercentage = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-brand-pink dark:bg-brand-black font-black italic text-black dark:text-brand-pink">
      [.LOGGING_DATA...]
    </div>
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--app-bg)] text-[var(--app-text)] transition-colors duration-500 p-8 md:p-24 overflow-hidden crt-glow">

      {/* Botão de Toggle Dark/Light */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-16 right-8 z-50 border-4 border-black bg-white p-2 text-[10px] font-black uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-brand-red-violet dark:text-white dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,181,198,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
      >
        {darkMode ? '[ light_mode ]' : '[ dark_mode ]'}
      </button>

      {/* Barra de Progresso de Alto Contraste */}
      <div className="fixed top-0 left-0 w-full h-8 bg-[var(--progress-bg)] border-b-4 border-[var(--border-color)] z-50 overflow-hidden">
        <div
          className="h-full bg-[var(--progress-fill)] transition-all duration-500 ease-out border-r-4 border-[var(--border-color)]"
          style={{ width: `${progressPercentage}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase mix-blend-difference text-white tracking-widest">
          System_Progress: {Math.round(progressPercentage)}%
        </span>
      </div>

      <header className="mb-8 text-center">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter sm:text-6xl">
          FRONTEND FLASHCARDS
        </h1>
        
        {/* Seletor de Dificuldade */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() => setSelectedDifficulty(diff.value)}
              className={`px-4 py-2 text-xs font-black uppercase border-4 transition-all cursor-pointer
                ${selectedDifficulty === diff.value 
                  ? 'bg-brand-red-violet text-white border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,181,198,1)]' 
                  : 'bg-white text-black border-black dark:bg-brand-black dark:text-white dark:border-white hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
            >
              {diff.label}
            </button>
          ))}
        </div>

        <p className="font-mono text-[10px] font-bold uppercase opacity-80 mt-4">
          {currentIndex + 1} OF {cards.length} CARDS_LOADED
        </p>
      </header>

      <Card card={cards[currentIndex]} onFlip={flipCard} />

      {/* Navegação */}
      <div className="mt-12 flex items-center gap-6">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="bg-white text-black px-8 py-3 font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-brand-red-violet hover:text-white transition-all disabled:opacity-30 cursor-pointer"
        >
          {"<"} Voltar
        </button>

        <button
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
          className="bg-black text-white px-8 py-3 font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,181,198,1)] dark:border-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-30 cursor-pointer"
        >
          Próximo {">"}
        </button>
      </div>

      <button
        onClick={() => {
          setCards(shuffleCards(cards));
          setCurrentIndex(0);
          localStorage.removeItem('flashcards-progress'); // Reseta o progresso salvo
        }}
        className="glitch-hover mt-12 text-[10px] font-black uppercase underline decoration-4 underline-offset-8 transition-colors cursor-pointer"
      >
        [ Re-shuffle_Memory_Bank ]
      </button>

    </main>
  );
}