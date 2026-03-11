export type Difficulty = 'trainee' | 'junior' | 'pleno' | 'senior';

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