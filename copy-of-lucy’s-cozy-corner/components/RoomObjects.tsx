
import React, { useState } from 'react';
import { Music, Lock, Unlock, Gift, CloudRain, Sun, Leaf, Heart, Play, Pause } from 'lucide-react';
import { GameState } from '../types';

interface ObjectProps {
  gameState: GameState;
  onInteract: (action: string, payload?: any) => void;
  className?: string;
}

// 1. BED
export const Bed: React.FC<ObjectProps> = ({ gameState, onInteract }) => {
  const [quiltOpen, setQuiltOpen] = useState(false);
  const [pillowLift, setPillowLift] = useState(false);

  return (
    <div className="relative w-full h-[88%] flex items-end justify-start perspective-500 group">
      {/* Shadow under bed */}
      <div className="absolute bottom-1 left-2 w-[95%] h-4 bg-black/40 blur-md rounded-full"></div>

      {/* Bed Legs */}
      <div className="absolute bottom-0 left-3 w-4 h-6 bg-wood-mahogany rounded-b-sm shadow-sm z-0"></div>
      <div className="absolute bottom-0 right-3 w-4 h-6 bg-wood-mahogany rounded-b-sm shadow-sm z-0"></div>

      {/* Bed Frame & Headboard */}
      <div className="absolute bottom-5 left-0 w-full h-10 bg-wood-dark wood-pattern rounded-md shadow-lg z-10 border-t border-white/10"></div>
      
      {/* Headboard with Paneling */}
      <div className="absolute bottom-5 left-0 w-5 h-[80%] bg-wood-dark wood-pattern rounded-t-md shadow-2xl border-r border-black/20 z-0 flex flex-col gap-1 py-2 px-0.5">
          <div className="flex-1 bg-black/10 rounded-sm shadow-inner"></div>
          <div className="flex-1 bg-black/10 rounded-sm shadow-inner"></div>
          <div className="flex-1 bg-black/10 rounded-sm shadow-inner"></div>
      </div>

      {/* Mattress */}
      <div className="absolute bottom-9 left-2 w-[95%] h-[28%] bg-[#f5f5f5] rounded-md shadow-md border-l-4 border-gray-200 overflow-visible">
          <div className="w-full h-full fabric-texture opacity-30"></div>
          {/* Mattress Seam */}
          <div className="absolute inset-x-0 bottom-2 h-[1px] bg-gray-300"></div>
          
          {/* Pillow */}
          <div 
            className={`absolute top-[-15px] left-3 w-[38%] h-[90%] bg-white rounded-lg cursor-pointer transition-transform duration-500 flex items-center justify-center hover:shadow-xl border border-gray-100 ${pillowLift ? '-translate-y-12 rotate-6 z-30' : 'shadow-md z-10'}`}
            onClick={() => {
              setPillowLift(true);
              onInteract('OPEN_LETTER', 'LETTER_1');
              setTimeout(() => setPillowLift(false), 2000);
            }}
            style={{ background: 'radial-gradient(circle at 30% 30%, #fff, #e5e7eb)' }}
          >
             {/* Pillow seam / detail */}
             <div className="absolute inset-2 border border-dotted border-gray-300 rounded-md opacity-60"></div>
             <div className="absolute bottom-1 right-2 text-[8px] text-gray-300 font-hand">zzz</div>
          </div>

          {/* Quilt */}
          <div 
            className={`absolute bottom-0 w-full bg-orange-200 rounded-b-md cursor-pointer transition-all duration-700 ease-in-out shadow-[0_-4px_10px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden z-20 ${quiltOpen ? 'h-[30%]' : 'h-[90%] top-[10%]'}`}
            onClick={() => {
              setQuiltOpen(!quiltOpen);
              if (!quiltOpen) onInteract('OPEN_LETTER', 'DOODLE');
            }}
            style={{
                background: 'linear-gradient(105deg, #fdba74 0%, #fb923c 45%, #f97316 50%, #fdba74 55%, #fb923c 100%)'
            }}
          >
             {/* Fabric Texture Overlay */}
             <div className="absolute inset-0 fabric-texture opacity-20 mix-blend-multiply"></div>
             
             {/* Realistic Folds */}
             <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5"></div>
             <div className="absolute w-full h-full bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.1)_100%)]"></div>
             
             <div className="opacity-60 text-orange-900 text-xs font-hand drop-shadow-sm transform rotate-1">
               {quiltOpen ? "" : "///   ///   ///"}
             </div>
          </div>
      </div>

      {/* Wall Lamp */}
      <div 
         onClick={() => onInteract('TOGGLE_BED_LAMP')}
         className="absolute top-[-40px] left-[10px] w-10 flex flex-col items-center cursor-pointer z-0 group"
      >
         {/* Wall Mount */}
         <div className="w-2 h-4 bg-[#b45309] rounded-sm shadow-sm z-10"></div>
         {/* Arm */}
         <div className="w-6 h-1 bg-[#b45309] relative top-[-10px] left-2 rotate-12"></div>
         {/* Shade */}
         <div className={`relative top-[-8px] left-5 w-8 h-6 bg-orange-100 border-b-2 border-orange-200 rounded-t-full shadow-md z-20 flex justify-center overflow-visible transition-colors duration-500 ${gameState.isBedLampOn ? 'bg-orange-50 shadow-[0_0_15px_rgba(255,237,213,0.6)]' : ''}`}>
             {/* Bulb */}
             <div className={`absolute -bottom-1 w-3 h-3 bg-white rounded-full transition-opacity duration-300 ${gameState.isBedLampOn ? 'opacity-100 shadow-[0_0_8px_white]' : 'opacity-0'}`}></div>
             
             {/* Light Cone */}
             {gameState.isBedLampOn && (
               <div className="absolute top-4 w-40 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,247,237,0.4)_0%,transparent_70%)] pointer-events-none mix-blend-screen"></div>
             )}
         </div>
      </div>
    </div>
  );
};

// 2. WINDOW
export const Window: React.FC<ObjectProps> = ({ gameState, onInteract }) => {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    onInteract('WINDOW_CLICK');
    
    if (newClicks === 5) {
      onInteract('OPEN_LETTER', 'LETTER_2');
    }
  };

  return (
    <div 
      className="relative w-full h-full bg-[#1e293b] rounded-t-full border-4 border-[#e2e8f0] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer group box-border ring-4 ring-[#cbd5e1] shadow-2xl"
      onClick={handleClick}
    >
      {/* Night Sky Gradient with distant glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] z-0"></div>
      
      {/* Distant City Lights / Stars */}
      <div className="absolute bottom-0 w-full h-1/3 bg-black/20 blur-sm transform scale-110 z-0"></div>
      <div className="absolute top-10 left-10 w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_4px_white] opacity-60 z-0"></div>
      <div className="absolute top-4 right-16 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_white] opacity-40 z-0"></div>

      {/* Rain Effect (Outside) */}
      <div className="absolute inset-0 opacity-50 pointer-events-none z-10">
        <div className="rain-drop left-[15%] animation-delay-100" style={{ animationDuration: '1.5s' }}></div>
        <div className="rain-drop left-[45%] animation-delay-300" style={{ animationDuration: '1.1s' }}></div>
        <div className="rain-drop left-[75%] animation-delay-500" style={{ animationDuration: '1.6s' }}></div>
        <div className="rain-drop left-[30%] top-[-50px]" style={{ animationDuration: '1.8s', animationDelay: '0.2s' }}></div>
      </div>

      {/* Glass Reflections */}
      {/* 1. Static base gloss */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-40 pointer-events-none z-20"></div>
      
      {/* 2. Animated passing light/sheen */}
      <div className="absolute inset-0 night-glass-reflection pointer-events-none z-20 mix-blend-overlay"></div>

      {/* 3. Subtle inner glow from room lights reflecting */}
      <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(255,255,255,0.05)] pointer-events-none z-20"></div>

      {/* Window Pane Bars (3D Wood) */}
      <div className="absolute inset-0 flex z-30 pointer-events-none">
        <div className="w-1/2 h-full border-r-[8px] border-[#cbd5e1] shadow-[4px_0_5px_rgba(0,0,0,0.3)]"></div>
      </div>
      <div className="absolute inset-0 flex flex-col z-30 pointer-events-none">
        <div className="h-1/2 w-full border-b-[8px] border-[#cbd5e1] shadow-[0_4px_5px_rgba(0,0,0,0.3)]"></div>
      </div>

      {/* Windowsill */}
      <div className="absolute -bottom-1 -left-4 -right-4 h-5 bg-[#e2e8f0] shadow-md z-40 border-t border-white rounded-sm">
         <div className="w-full h-full bg-gradient-to-b from-white to-gray-200"></div>
      </div>
      
      {clicks >= 5 && (
        <div className="absolute bottom-6 right-6 text-white/90 animate-pulse z-30 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
           <Heart size={22} fill="white" />
        </div>
      )}
    </div>
  );
};

// 3. BOOKSHELF
export const Bookshelf: React.FC<ObjectProps> = ({ gameState, onInteract }) => {
  return (
    <div className="w-full h-[95%] flex flex-col justify-end gap-0 bg-wood-light wood-pattern-light rounded-sm shadow-[5px_5px_15px_rgba(0,0,0,0.3)] border-l-8 border-wood-dark overflow-hidden relative group perspective-500">
      
      {/* Shadow Overlay for Depth */}
      <div className="absolute inset-0 shadow-inner-lg pointer-events-none z-20"></div>

      {/* Wood Texture Detail */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

      {/* Top Shelf */}
      <div className="relative h-[48%] w-full border-b-[10px] border-wood-dark flex items-end gap-1 px-3 shadow-inner bg-black/20">
         {/* Inner Shadow for shelf depth */}
         <div className="absolute inset-0 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.4)] pointer-events-none"></div>

         {/* Books */}
         <div onClick={() => onInteract('OPEN_LETTER', 'BOOK_BLUE')} className="h-[85%] w-[16%] bg-blue-700 rounded-sm cursor-pointer hover:-translate-y-2 transition-transform shadow-lg border-l border-white/10 bg-gradient-to-r from-blue-900 to-blue-600 relative">
             <div className="absolute top-4 left-1 w-full h-[1px] bg-white/20"></div>
         </div>
         <div onClick={() => onInteract('OPEN_LETTER', 'BOOK_GREEN')} className="h-[95%] w-[13%] bg-emerald-700 rounded-sm cursor-pointer hover:-translate-y-2 transition-transform shadow-lg border-l border-white/10 bg-gradient-to-r from-emerald-900 to-emerald-600 relative">
             <div className="absolute bottom-4 left-1 w-full h-[2px] bg-yellow-400/30"></div>
         </div>
         <div className="h-[80%] w-[10%] bg-amber-700 rounded-sm shadow-md border-l border-white/10 bg-gradient-to-r from-amber-900 to-amber-600"></div>
         <div onClick={() => onInteract('OPEN_LETTER', 'BOOK_PURPLE')} className="h-[90%] w-[19%] bg-purple-600 rounded-sm cursor-pointer hover:-translate-y-2 transition-transform shadow-lg rotate-2 border-l border-white/10 bg-gradient-to-r from-purple-800 to-purple-500 ml-1 origin-bottom-left relative">
              <div className="absolute top-2 left-0 w-full h-full bg-gradient-to-l from-black/10 to-transparent"></div>
         </div>
      </div>
      
      {/* Bottom Shelf */}
      <div className="relative h-[48%] w-full flex items-end gap-3 px-4 bg-black/20">
         {/* Inner Shadow */}
         <div className="absolute inset-0 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.4)] pointer-events-none"></div>

        <div onClick={() => onInteract('OPEN_LETTER', 'BOOK_PINK')} className="h-[88%] w-[15%] bg-pink-600 rounded-sm cursor-pointer hover:-translate-y-2 transition-transform shadow-lg -rotate-3 border-l border-white/10 bg-gradient-to-r from-pink-800 to-pink-500 origin-bottom-right"></div>
        
        {/* Decor Box */}
        <div className="h-[65%] w-[45%] bg-[#d6d3d1] rounded-sm flex items-center justify-center text-[10px] text-stone-600 shadow-md border border-stone-400 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-black/5"></div>
           <div className="w-[80%] h-[1px] bg-stone-400/50 absolute top-2"></div>
           <span className="opacity-40 font-bold tracking-widest">MEMORIES</span>
        </div>

        {/* Small Table Lamp */}
        <div 
           onClick={() => onInteract('TOGGLE_BOOKSHELF_LAMP')}
           className="h-[55%] w-[25%] relative flex flex-col items-center justify-end cursor-pointer group z-10 hover:scale-105 transition-transform origin-bottom"
        >
           {/* Glow Effect */}
           <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-300 blur-xl rounded-full transition-opacity duration-700 pointer-events-none ${gameState.isBookshelfLampOn ? 'opacity-50' : 'opacity-0'}`}></div>
           
           {/* Shade */}
           <div className={`w-8 h-6 rounded-t-full rounded-b-sm shadow-md transition-colors duration-500 z-10 border-b border-black/10 ${gameState.isBookshelfLampOn ? 'bg-[#fef9c3] shadow-[0_0_10px_rgba(253,224,71,0.6)]' : 'bg-gray-300'}`}>
              <div className={`absolute inset-0 rounded-t-full opacity-0 transition-opacity duration-300 ${gameState.isBookshelfLampOn ? 'opacity-100 bg-yellow-200/50' : ''}`}></div>
           </div>
           
           {/* Neck */}
           <div className="w-1 h-3 bg-stone-600"></div>
           
           {/* Base */}
           <div className="w-5 h-2 bg-stone-700 rounded-sm shadow-sm"></div>
           
           {/* Pull string (tiny detail) */}
           <div className="absolute top-5 right-1 w-[1px] h-3 bg-gray-400 opacity-80 group-hover:h-4 transition-all"></div>
        </div>
      </div>
    </div>
  );
};

// 4. NOTICE BOARD
export const NoticeBoard: React.FC<ObjectProps> = ({ onInteract }) => {
  return (
    <div className="w-full h-full bg-[#c19a6b] wood-pattern border-[8px] border-[#5d4037] rounded-sm relative shadow-2xl p-2 overflow-visible box-border">
      {/* Cork Texture */}
      <div className="absolute inset-0 bg-[#d2b48c] opacity-90" style={{ backgroundImage: 'radial-gradient(#8b4513 1px, transparent 0)', backgroundSize: '4px 4px' }}></div>
      <div className="absolute inset-0 shadow-inner-lg pointer-events-none"></div>

      {/* Frame Highlight */}
      <div className="absolute inset-0 border border-white/10 pointer-events-none z-20"></div>

      {/* Yellow Post-it */}
      <div 
        onClick={() => onInteract('OPEN_LETTER', 'NOTICE_YELLOW')}
        className="absolute top-4 left-4 w-12 h-12 bg-yellow-200 shadow-md rotate-[-6deg] cursor-pointer hover:scale-110 transition-transform flex items-center justify-center paper-shadow"
      >
        <div className="w-2 h-2 bg-red-800 rounded-full absolute -top-1 shadow-[1px_1px_2px_rgba(0,0,0,0.3)] z-10"></div>
        <div className="w-full h-full bg-gradient-to-br from-white/40 to-transparent"></div>
        {/* Tape residue look */}
        <div className="absolute -top-1 w-4 h-1 bg-white/30 rotate-3"></div>
      </div>

      {/* Polaroid */}
      <div 
        onClick={() => onInteract('OPEN_LETTER', 'NOTICE_POLAROID')}
        className="absolute top-6 right-6 w-14 h-16 bg-white p-1.5 shadow-md rotate-[4deg] cursor-pointer hover:scale-110 transition-transform transform origin-top"
      >
        <div className="w-2 h-2 bg-red-800 rounded-full absolute -top-1.5 left-1/2 shadow-sm z-10"></div>
        
        {/* Replace gradient with an image */}
        <div className="w-full h-[75%] bg-[#292524] shadow-inner overflow-hidden relative">
            {/* You can change this src to any image URL you like */}
            <img 
              src="https://i.pinimg.com/1200x/36/a9/56/36a9565452a8429d20155fde2dafff0c.jpg" 
              alt="BTS Polaroid" 
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
            />
            {/* Overlay for vintage feel */}
            <div className="absolute inset-0 bg-yellow-900/10 mix-blend-multiply pointer-events-none"></div>
        </div>

        <div className="text-[5px] text-center mt-1 text-gray-400 font-hand">us</div>
      </div>

      {/* String Art Heart */}
      <div 
        onClick={() => onInteract('OPEN_LETTER', 'LETTER_4')}
        className="absolute bottom-10 left-6 w-12 h-10 border-2 border-dashed border-red-400/60 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-50/30 transition-colors group"
      >
        <Heart size={20} className="text-red-500 drop-shadow-sm group-hover:scale-110 transition-transform" />
        {/* String pins */}
        <div className="absolute -top-1 left-1/2 w-1 h-1 bg-gray-600 rounded-full"></div>
        <div className="absolute top-1/2 -right-1 w-1 h-1 bg-gray-600 rounded-full"></div>
        <div className="absolute bottom-[-1px] left-1/2 w-1 h-1 bg-gray-600 rounded-full"></div>
        <div className="absolute top-1/2 -left-1 w-1 h-1 bg-gray-600 rounded-full"></div>
      </div>

      {/* Ticket */}
      <div 
        onClick={() => onInteract('OPEN_LETTER', 'NOTICE_TICKET')}
        className="absolute bottom-5 left-5 w-14 h-7 bg-blue-300 rotate-12 cursor-pointer hover:scale-110 shadow-sm border-l-2 border-r-2 border-dashed border-white/50 opacity-90"
      >
          <div className="w-full h-full flex items-center justify-center">
              <span className="text-[6px] text-blue-900 font-mono tracking-tighter">ADMIT ONE</span>
          </div>
      </div>

      {/* Envelope */}
      <div 
        onClick={() => onInteract('OPEN_LETTER', 'NOTICE_ENVELOPE')}
        className="absolute bottom-4 right-4 w-16 h-10 bg-[#fdfbf7] border border-gray-200 shadow-md rotate-[-3deg] cursor-pointer hover:scale-110 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute top-0 w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-t-[20px] border-t-gray-100 shadow-sm"></div>
        <div className="text-[7px] text-gray-400 mt-4 font-hand tracking-widest z-10">FOR YOU</div>
      </div>
    </div>
  );
};

// 5. DESK
export const Desk: React.FC<ObjectProps> = ({ gameState, onInteract }) => {
  const [plantClicks, setPlantClicks] = useState(0);

  const handlePlantClick = () => {
    const newClicks = plantClicks + 1;
    setPlantClicks(newClicks);
    if (newClicks === 3) {
      onInteract('OPEN_LETTER', 'PLANT_NOTE');
    }
  };

  return (
    <div className="relative w-full h-[90%] flex items-end perspective-500 group">
      
      {/* Desk Shadow */}
       <div className="absolute bottom-0 w-full h-6 bg-black/30 blur-lg rounded-full transform scale-x-90"></div>

      {/* Desk Legs */}
      <div className="absolute bottom-0 left-3 w-4 h-[45%] bg-wood-mahogany shadow-inner z-0"></div>
      <div className="absolute bottom-0 right-3 w-4 h-[45%] bg-wood-mahogany shadow-inner z-0"></div>

      {/* Desk Body */}
      <div className="w-full h-[65%] bg-wood-dark wood-pattern rounded-sm relative shadow-xl flex items-end justify-between px-6 pb-6 border-t-[8px] border-[#3e2723] z-10">
         {/* Side shading */}
         <div className="absolute left-0 top-0 h-full w-2 bg-black/20"></div>
         <div className="absolute right-0 top-0 h-full w-2 bg-black/20"></div>

        {/* MONITOR / LAPTOP (Z-INDEX 30 TO SIT ON TOP) */}
        <div className="absolute bottom-[20%] right-[10%] w-[600px] flex flex-col items-center group z-30 perspective-500 origin-bottom-right transform scale-[0.5] md:scale-[0.6] lg:scale-[0.75]">
            {/* Screen */}
            <div className="w-[560px] h-[315px] bg-black rounded-md border-[12px] border-gray-800 relative overflow-hidden shadow-2xl z-20 ring-1 ring-white/10">
                {gameState.isLaptopPlaying ? (
                   <iframe 
                   width="560"
                    height="315" 
                    src="https://www.youtube.com/embed/7ytGFxD-FcI?si=7-qzVIRsGqiRDWFL&autoplay=1" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                     referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="pointer-events-auto"
                      >
                   </iframe>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
                        {/* Wallpaper / Screen saver */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black opacity-80"></div>
                        
                        {/* Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                        
                        {/* Floating Icon */}
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-pulse">
                            <Play size={16} className="text-white/70 ml-0.5" fill="currentColor" />
                        </div>
                    </div>
                )}
            </div>
            
            {/* Monitor Stand Neck */}
            <div className="w-16 h-12 bg-gray-700 shadow-[inset_0_0_5px_rgba(0,0,0,0.5)] z-10 relative">
               <div className="absolute top-0 w-full h-1 bg-black/20"></div>
            </div>
            
            {/* Monitor Stand Base */}
            <div className="w-40 h-5 bg-gray-700 rounded-t-sm shadow-md z-10 border-t border-gray-600 relative">
               {/* Power/Toggle Button (On Base) */}
               <div 
                 onClick={(e) => {
                   e.stopPropagation();
                   onInteract('TOGGLE_LAPTOP');
                 }}
                 className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-stone-800 rounded-full cursor-pointer hover:bg-stone-700 shadow-lg border border-stone-500 flex items-center justify-center group-hover:scale-110 transition-transform z-30 pointer-events-auto"
                 title={gameState.isLaptopPlaying ? "Turn Off" : "Turn On"}
               >
                  <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${gameState.isLaptopPlaying ? 'bg-green-500 shadow-[0_0_8px_lime]' : 'bg-red-500/80'}`}></div>
               </div>
            </div>
            
            {/* Reflection on Desk */}
            <div className="absolute bottom-0 w-60 h-6 bg-black/40 blur-md rounded-full transform scale-x-110"></div>
        </div>

        {/* Lamp */}
        <div 
          className="relative -top-[45%] -left-2 cursor-pointer group w-20 h-32 flex flex-col items-center z-20"
          onClick={() => onInteract('TOGGLE_LAMP')}
        >
          {/* Shade */}
          <div className="w-12 h-10 bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 rounded-t-full shadow-lg z-10 relative overflow-hidden border-b-2 border-yellow-200">
             {/* Glow inside shade */}
             <div className={`absolute inset-0 bg-yellow-300 opacity-0 transition-opacity duration-300 ${gameState.isLampOn ? 'opacity-60' : ''}`}></div>
          </div>
          {/* Bulb simulated */}
          <div className={`absolute top-9 w-4 h-4 rounded-full bg-white blur-sm transition-opacity duration-300 ${gameState.isLampOn ? 'opacity-100' : 'opacity-0'}`}></div>

          {/* Stand */}
          <div className="w-1.5 h-14 bg-gradient-to-r from-stone-600 to-stone-800"></div>
          <div className="w-10 h-2 bg-stone-800 rounded-full shadow-md border-t border-stone-600"></div>
          
          {/* Volumetric Light Cone */}
          {gameState.isLampOn && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(253,224,71,0.3)_0%,rgba(253,224,71,0.05)_50%,transparent_70%)] pointer-events-none -z-10 mix-blend-plus-lighter transform origin-top rotate-12"></div>
          )}
        </div>

        {/* Plant */}
        <div 
          onClick={handlePlantClick}
          className="relative w-14 h-24 flex flex-col items-center cursor-pointer mb-2 z-20 ml-auto"
        >
           {/* Leaves */}
           <Leaf className="text-emerald-700 absolute -top-4 left-0 rotate-[-15deg] drop-shadow-sm filter brightness-90" size={20} fill="currentColor" />
           <Leaf className="text-emerald-500 absolute -top-7 left-3 drop-shadow-md z-10" size={28} fill="currentColor" />
           <Leaf className="text-emerald-800 absolute -top-4 right-0 rotate-[15deg] drop-shadow-sm filter brightness-75" size={20} fill="currentColor" />
           
           {/* Pot */}
           <div className="w-12 h-12 bg-[#c2410c] rounded-b-xl rounded-t-sm mt-auto shadow-lg relative overflow-hidden border-t-4 border-[#9a3412]">
             <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#9a3412] to-black/30"></div>
             {/* Rim highlight */}
             <div className="absolute top-0 w-full h-1 bg-white/20"></div>
           </div>
        </div>

      </div>

      {/* Hidden Shadow Message */}
      {gameState.isLampOn && (
        <div 
          onClick={() => onInteract('OPEN_LETTER', 'LAMP_SHADOW')}
          className="absolute top-[20%] left-[25%] text-black/50 font-hand text-xl -rotate-6 cursor-pointer hover:text-black/80 transition-colors select-none z-0 mix-blend-overlay filter blur-[0.5px]"
        >
          You light up my life
        </div>
      )}
    </div>
  );
};

// 6. DRESSER
export const Dresser: React.FC<ObjectProps> = ({ gameState, onInteract }) => {
  const lettersFoundCount = gameState.foundLetters.filter(id => id.startsWith('LETTER_')).length;
  const isUnlocked = lettersFoundCount >= 3;

  return (
    <div className="w-full h-full bg-[#cbd5e1] rounded-md border-t border-white/60 shadow-depth-lg flex flex-col p-3 gap-3 relative perspective-500">
       {/* 3D Side Panel */}
       <div className="absolute -right-3 top-2 h-full w-3 bg-[#94a3b8] skew-y-[45deg] origin-top-left rounded-br-sm shadow-md"></div>

       {/* Drawers */}
       {[
          { id: 'DRAWER_TOP', locked: false },
          { id: 'GIFT', locked: !isUnlocked, isGift: true },
          { id: 'DRAWER_BOTTOM', locked: false }
       ].map((drawer, i) => (
         <div 
           key={i}
           onClick={() => {
             if (!drawer.locked) onInteract('OPEN_LETTER', drawer.id);
           }}
           className={`flex-1 bg-[#f8fafc] rounded-sm border-t border-white border-l border-white border-b-2 border-gray-300 border-r-2 border-gray-300 cursor-pointer hover:bg-white transition-all hover:translate-x-1 active:translate-x-0 active:translate-y-0.5 flex items-center justify-center shadow-sm relative group`}
         >
            {/* Drawer Handle (Brass) */}
            <div className="w-16 h-3 bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-600 rounded-full shadow-sm flex items-center justify-center border border-yellow-700/30">
                <div className="w-[80%] h-[1px] bg-yellow-200/50"></div>
            </div>
            
            {drawer.isGift && (
              <div className="absolute right-4 text-purple-400 drop-shadow-sm">
                {drawer.locked ? <Lock size={16} /> : <Gift size={18} className="animate-bounce" />}
              </div>
            )}
         </div>
       ))}
    </div>
  );
};

// 7. RECORD PLAYER
export const RecordPlayer: React.FC<ObjectProps> = ({ gameState, onInteract }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-end">
       {/* Cabinet */}
       <div className="w-[95%] h-[75%] bg-[#451a03] wood-pattern rounded-sm shadow-2xl border-t border-[#78350f] relative flex items-center justify-center transform hover:-translate-y-1 transition-transform duration-300 group">
         
         {/* Wood grain detail overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/30 pointer-events-none rounded-sm"></div>

         {/* Metallic control panel strip */}
         <div className="absolute bottom-0 w-full h-[22%] bg-gradient-to-b from-[#292524] to-[#1c1917] flex items-center gap-2 px-3 border-t border-white/10 rounded-b-sm">
            <div className={`w-2.5 h-2.5 rounded-full shadow-[0_0_5px_lime] transition-colors ${gameState.isMusicPlaying ? 'bg-green-500' : 'bg-red-900 shadow-none'}`}></div>
            {/* Knobs */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-sm border border-gray-700"></div>
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-sm border border-gray-700"></div>
         </div>

         {/* The Record */}
         <div 
            onClick={() => onInteract('TOGGLE_MUSIC')}
            className={`w-[85%] aspect-square bg-black rounded-full cursor-pointer flex items-center justify-center shadow-xl relative z-10 border-[6px] border-[#1c1917] overflow-hidden ${gameState.isMusicPlaying ? 'record-spin' : ''}`}
            style={{ 
                background: 'conic-gradient(from 0deg, #111 0%, #222 10%, #111 20%, #222 30%, #111 40%, #222 50%, #111 60%, #222 70%, #111 80%, #222 90%, #111 100%)'
            }}
         >
           {/* Vinyl Grooves reflection */}
           <div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'repeating-radial-gradient(transparent 0, transparent 2px, rgba(255,255,255,0.1) 3px)' }}></div>
           
           {/* Label */}
           <div className="w-[38%] h-[38%] bg-red-700 rounded-full flex items-center justify-center border-4 border-red-900 shadow-inner relative">
              <div className="w-2 h-2 bg-gray-300 rounded-full bg-white shadow-sm z-20"></div>
              <div className="absolute inset-0 text-[4px] text-red-200 flex items-center justify-center font-mono opacity-60 rotate-45">MIX TAPE</div>
           </div>
           
           {/* Tone arm */}
           <div className={`absolute -right-5 top-2 w-20 h-2 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 border border-gray-400 origin-right transition-transform duration-700 z-30 shadow-lg rounded-full ${gameState.isMusicPlaying ? 'rotate-[-25deg]' : 'rotate-[15deg]'}`}>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-6 bg-black rounded-sm shadow-md"></div>
           </div>
         </div>

         {/* Hidden Letter behind record */}
         {gameState.isMusicPlaying && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onInteract('OPEN_LETTER', 'LETTER_6');
              }}
              className="absolute top-[-10%] right-[-10%] bg-white p-2 shadow-xl rotate-12 cursor-pointer z-0 hover:scale-110 transition-transform border border-gray-200"
            >
              <Music size={14} className="text-pink-500" />
            </div>
         )}
       </div>
       
       {/* Legs */}
       <div className="w-[85%] flex justify-between mt-1 px-1">
          <div className="w-3 h-5 bg-[#292524] rounded-b-md shadow-sm"></div>
          <div className="w-3 h-5 bg-[#292524] rounded-b-md shadow-sm"></div>
       </div>
    </div>
  );
};

// 8. RUG
export const Rug: React.FC<ObjectProps> = ({ gameState, onInteract }) => {
  const [wiggle, setWiggle] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setWiggle(true);
    setTimeout(() => setWiggle(false), 500);
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks >= 3) {
      onInteract('OPEN_LETTER', 'FINAL_LETTER');
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative perspective-500 z-0">
       <div 
         onClick={handleClick}
         className={`w-[100%] h-[70%] bg-[#7f1d1d] rounded-full border-[6px] border-dashed border-[#991b1b] cursor-pointer shadow-soft-xl ${wiggle ? 'wiggle' : ''} flex items-center justify-center relative overflow-hidden group transform rotate-x-12`}
         style={{ transform: 'rotateX(40deg) scale(1.1)' }}
       >
         {/* Rug Texture */}
         <div className="absolute inset-0 fabric-texture opacity-40"></div>
         <div className="w-[85%] h-[85%] border-2 border-[#991b1b]/50 rounded-full opacity-60"></div>
         
         {/* Hidden Trapdoor Outline */}
         {clicks > 0 && (
           <div className="absolute w-20 h-20 border-2 border-black/10 bg-black/10 rounded-sm shadow-inner transform rotate-45"></div>
         )}
       </div>
       
       {clicks >= 3 && (
         <div className="absolute top-[-10px] right-0 pointer-events-none text-white font-bold text-xs animate-bounce bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
           Look here!
         </div>
       )}
    </div>
  );
};
