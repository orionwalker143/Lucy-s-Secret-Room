import React from 'react';

export interface Letter {
  id: string;
  title: string;
  content: string;
  isSpecial?: boolean; // For the final letter or doodle
  type: 'letter' | 'note' | 'doodle' | 'poem' | 'affirmation';
}

export interface GameState {
  foundLetters: string[]; // IDs of found letters
  activeModal: Letter | null; // Currently reading content
  isMusicPlaying: boolean;
  isLaptopPlaying: boolean;
  isLampOn: boolean;
  isBedLampOn: boolean;
  isBookshelfLampOn: boolean;
  interactions: {
    windowClicks: number;
    plantClicks: number;
    rugClicks: number;
    dresserUnlocked: boolean;
  };
}

export type InteractableProps = {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};