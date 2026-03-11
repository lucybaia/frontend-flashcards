import { Flashcard } from '@/types';

interface CardProps {
  card: Flashcard;
  onFlip: () => void;
}

export default function Card({ card, onFlip }: CardProps) {
  return (
    <div
      onClick={onFlip}
      className="group h-64 w-96 cursor-pointer [perspective:1000px]"
    >
      <div className={`
        relative h-full w-full transition-all duration-500 [transform-style:preserve-3d]
        border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
        ${card.isFlipped ? '[transform:rotateY(180deg)]' : ''}
      `}>

        {/* Lado da Frente (Pergunta) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 p-6 [backface-visibility:hidden] transition-colors duration-500">
          <span className="mb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-brand-red-violet">
            [ pergunta ]
          </span>
          <h2 className="text-xl font-bold text-black dark:text-white text-center">
            {card.front}
          </h2>
        </div>
        {/* Lado de Trás (Resposta) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-violet-red p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="mb-4 text-[10px] font-black uppercase tracking-widest text-brand-pink">
            [ resposta ]
          </span>
          <p className="text-lg font-bold text-white text-center">
            {card.back}
          </p>
        </div>

      </div>
    </div>
  );
}