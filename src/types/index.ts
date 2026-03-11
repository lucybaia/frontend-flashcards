export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: Difficulty;
  isFlipped: boolean;
}

export interface Deck {
  id: string;
  name: string;
  cards: Flashcard[];
}