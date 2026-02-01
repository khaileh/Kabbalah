export interface Name72 {
  id: number;
  hebrew: string;
  transliteration: string;
  meaning: string;
  description: string;
  affirmation: string;
  colorClass: string;
}

export interface Angel {
  id: number;
  name: string;
  degrees: string;
  dates: string;
  invocationTime: string;
  attributes: string;
  prayer: string;
  exhortation: string;
  sign: string;
}

export interface Sefira {
  id: string;
  name: string;
  hebrew: string;
  meaning: string;
  description: string;
  color: string;
  divineName?: string;
  archangel?: string;
}

export interface HebrewLetter {
  name: string;
  letter: string;
  value: number;
  meaning: string;
  path?: string;
  pathKey?: [string, string];
  latin: string;
  description: string;
  planet_element: string;
}

export enum View {
  Home = 'HOME',
  Names72 = 'NAMES72',
  Angels = 'ANGELS',
  Tree = 'TREE',
  Letters = 'LETTERS',
  Guide = 'GUIDE',
  Meditation = 'MEDITATION'
}