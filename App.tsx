import React, { useState } from 'react';
import { GameState } from './types';
import { LETTERS } from './constants';
import { Bed, Window, Bookshelf, NoticeBoard, Desk, Dresser, RecordPlayer, Rug } from './components/RoomObjects';
import { Modal } from './components/Modal';
import { Scrapbook } from './components/Scrapbook';
import { Heart } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    foundLetters: [],
    activeModal: null,
    isMusicPlaying: false,
    isLaptopPlaying: false,
    isLampOn: false,
    isBedLampOn: false,
    isBookshelfLampOn: false,
    interactions: {
      windowClicks: 0,
      plantClicks: 0,
      rugClicks: 0,
      dresserUnlocked: false,
    }
  });

  const [scrapbookOpen, setScrapbookOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleInteract = (action: string, payload?: any) => {
    switch (action) {
      case 'OPEN_LETTER':
        const letterId = payload as string;
        const letter = LETTERS[letterId];
        if (letter) {
          setGameState(prev => {
            const isNew = !prev.foundLetters.includes(letterId);
            if (isNew) {
              // Trigger notification
              setShowNotification(true);
              setTimeout(() => setShowNotification(false), 3000);
            }
            return {
              ...prev,
              foundLetters: isNew ? [...prev.foundLetters, letterId] : prev.foundLetters,
              activeModal: letter
            };
          });
        }
        break;
      
      case 'TOGGLE_MUSIC':
        setGameState(prev => ({ ...prev, isMusicPlaying: !prev.isMusicPlaying }));
        break;

      case 'TOGGLE_LAPTOP':
        setGameState(prev => ({ ...prev, isLaptopPlaying: !prev.isLaptopPlaying }));
        break;

      case 'TOGGLE_LAMP':
        setGameState(prev => ({ ...prev, isLampOn: !prev.isLampOn }));
        break;

      case 'TOGGLE_BED_LAMP':
        setGameState(prev => ({ ...prev, isBedLampOn: !prev.isBedLampOn }));
        break;

      case 'TOGGLE_BOOKSHELF_LAMP':
        setGameState(prev => ({ ...prev, isBookshelfLampOn: !prev.isBookshelfLampOn }));
        break;
      
      case 'WINDOW_CLICK':
        // State update handled inside component for clicks
        break;
    }
  };

  const closeModal = () => {
    setGameState(prev => ({ ...prev, activeModal: null }));
  };

  return (
    <div className="min-h-screen w-full bg-[#111] flex items-center justify-center p-4 lg:p-8 font-sans overflow-hidden select-none">
      
      {/* Main Room Container */}
      <div className="relative w-full max-w-5xl aspect-[4/3] bg-stone-900 rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden ring-8 ring-[#2a2a2a]">
        
        {/* Film Grain / Noise Overlay */}
        <div className="noise-overlay"></div>
        
        {/* Vignette */}
        <div className="absolute inset-0 vignette pointer-events-none z-40"></div>

        {/* Wall Background with Texture and Ambient Light */}
        <div className="absolute inset-0 h-[80%] wall-texture shadow-inner">
           {/* Corner Ambient Shadow */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5 pointer-events-none"></div>
        </div>

        {/* Floor Background */}
        <div className="absolute bottom-0 w-full h-[20%] wood-floor border-t-[12px] border-[#3e2723] shadow-[inset_0_10px_20px_rgba(0,0,0,0.3)] flex items-center justify-center z-0">
             {/* Floor perspective sheen */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>
        </div>

        {/* Skirting Board */}
        <div className="absolute bottom-[20%] w-full h-5 bg-stone-100 border-t border-b border-stone-300 shadow-md z-0 flex items-center px-4">
          <div className="w-full h-[1px] bg-stone-200"></div>
        </div>

        {/* Fairy Lights (Top) */}
        <div className="absolute top-0 left-0 w-full h-24 flex justify-around z-30 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
             <div 
               key={i} 
               className={`relative mt-${i % 2 === 0 ? '4' : '8'} transition-transform duration-1000 ease-in-out`}
             >
               {/* Bulb Glow */}
               <div 
                  className="w-4 h-4 rounded-full bg-yellow-100 shadow-[0_0_25px_4px_rgba(253,224,71,0.6)] twinkle opacity-90 border border-yellow-200/50"
                  style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${3 + (i % 2) * 1.5}s` }}
               ></div>
               {/* Socket */}
               <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2.5 bg-gray-700 rounded-sm shadow-sm"></div>
             </div>
          ))}
          {/* Wire */}
          <svg className="absolute top-0 left-0 w-full h-24 stroke-[#444] stroke-2 fill-none drop-shadow-md opacity-80">
             <path d="M0,-10 Q50,40 100,10 T200,10 T300,10 T400,10 T500,10 T600,10 T700,10 T800,10 T900,10 T1000,10" />
          </svg>
        </div>

        {/* Global Lighting Overlay */}
        <div 
          className={`absolute inset-0 pointer-events-none transition-all duration-1000 z-20 mix-blend-multiply ${
            gameState.isLampOn || gameState.isBookshelfLampOn || gameState.isBedLampOn ? 'bg-[#4a3b2a]/20' : 'bg-[#1a2333]/50'
          }`}
        ></div>
        
        {/* Dynamic Warmth Overlay when Lamp is On */}
         <div 
          className={`absolute inset-0 pointer-events-none transition-all duration-1000 z-20 mix-blend-soft-light ${
            gameState.isLampOn || gameState.isBookshelfLampOn || gameState.isBedLampOn ? 'opacity-30 bg-orange-500' : 'opacity-0 bg-transparent'
          }`}
        ></div>

        
        {/* Room Grid Layout */}
        <div className="grid grid-cols-12 grid-rows-12 w-full h-full relative z-10">
          
          {/* Row 1-4 (Top) */}
          {/* Bookshelf: Top Left */}
          <div className="col-start-1 col-end-4 row-start-2 row-end-6 p-4 z-10 flex items-end">
            <Bookshelf gameState={gameState} onInteract={handleInteract} />
          </div>

          {/* Window: Top Center */}
          <div className="col-start-5 col-end-9 row-start-1 row-end-5 pt-8 px-6 z-0">
             <Window gameState={gameState} onInteract={handleInteract} />
          </div>

          {/* Notice Board: Top Right */}
          <div className="col-start-10 col-end-13 row-start-2 row-end-5 p-6 z-0">
            <NoticeBoard gameState={gameState} onInteract={handleInteract} />
          </div>

          {/* Row 5-9 (Middle) */}
          {/* Bed: Center Left */}
          <div className="col-start-1 col-end-6 row-start-6 row-end-10 p-2 z-20 flex items-end">
            <Bed gameState={gameState} onInteract={handleInteract} />
          </div>

          {/* Desk: Center Right */}
          <div className="col-start-7 col-end-13 row-start-6 row-end-10 p-2 z-20 flex items-end pl-8">
            <Desk gameState={gameState} onInteract={handleInteract} />
          </div>

          {/* Row 9-12 (Bottom) */}
          {/* Dresser: Bottom Left */}
          <div className="col-start-1 col-end-4 row-start-10 row-end-13 p-4 z-30 flex items-end">
            <Dresser gameState={gameState} onInteract={handleInteract} />
          </div>

          {/* Rug: Bottom Center */}
          <div className="col-start-5 col-end-9 row-start-11 row-end-13 p-2 z-10 flex items-center justify-center">
            <Rug gameState={gameState} onInteract={handleInteract} />
          </div>

          {/* Record Player: Bottom Right */}
          <div className="col-start-10 col-end-13 row-start-11 row-end-13 p-4 z-30 flex items-end">
             <RecordPlayer gameState={gameState} onInteract={handleInteract} />
          </div>

        </div>

      </div>

      {/* Floating UI Controls */}
      <div className="fixed bottom-6 left-6 flex flex-col gap-4 z-50">
        
        {/* Scrapbook Button */}
        <button 
          onClick={() => setScrapbookOpen(true)}
          className="bg-white/90 p-3 rounded-full shadow-lg border border-white hover:bg-rose-50 hover:scale-110 transition-all text-rose-500 relative"
        >
          <Heart fill="currentColor" size={24} />
          {gameState.foundLetters.length > 0 && (
             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
               {gameState.foundLetters.length}
             </span>
          )}
        </button>
      </div>

      {/* New Item Notification */}
      {showNotification && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce flex items-center gap-3 border border-pink-100">
           <Heart className="text-pink-500 drop-shadow-sm" size={18} fill="currentColor" />
           <span className="text-gray-800 font-hand font-bold text-lg tracking-wide">New memory found!</span>
        </div>
      )}

      {/* Modals */}
      {gameState.activeModal && (
        <Modal letter={gameState.activeModal} onClose={closeModal} />
      )}

      <Scrapbook 
        isOpen={scrapbookOpen} 
        onClose={() => setScrapbookOpen(false)} 
        foundLetters={gameState.foundLetters}
        onOpenLetter={(id) => handleInteract('OPEN_LETTER', id)}
      />

    </div>
  );
}