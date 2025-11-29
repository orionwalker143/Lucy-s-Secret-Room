import React from 'react';
import { Letter } from '../types';
import { LETTERS, TOTAL_LETTERS } from '../constants';
import { X, BookOpen, Lock } from 'lucide-react';

interface ScrapbookProps {
  foundLetters: string[];
  isOpen: boolean;
  onClose: () => void;
  onOpenLetter: (letterId: string) => void;
}

export const Scrapbook: React.FC<ScrapbookProps> = ({ foundLetters, isOpen, onClose, onOpenLetter }) => {
  // Only count main letters for the "7/7" progress, but show all found items
  const mainLettersFound = foundLetters.filter(id => LETTERS[id]?.type === 'letter').length;
  
  // Sort found items to show them in a nice order if desired, or just list them
  const foundItems = foundLetters.map(id => LETTERS[id]).filter(Boolean);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 left-0 w-full sm:w-96 bg-[#fdfbf7] shadow-2xl z-40 transform transition-transform duration-300 ease-in-out border-r-8 border-[#e6dccf] flex flex-col animate-in slide-in-from-left duration-300">
       <div className="p-6 bg-[#f5efe6] border-b border-[#e6dccf] flex justify-between items-center">
         <div>
           <h2 className="font-serif text-2xl text-[#8d6e63]">My Scrapbook</h2>
           <p className="text-sm text-[#8d6e63]/70 mt-1 font-hand">
             {mainLettersFound}/{TOTAL_LETTERS} Letters Found
           </p>
         </div>
         <button onClick={onClose} className="text-[#8d6e63] hover:bg-[#e6dccf] p-2 rounded-full transition-colors">
           <X size={24} />
         </button>
       </div>

       <div className="flex-1 overflow-y-auto p-6 space-y-4">
         {foundItems.length === 0 ? (
           <div className="text-center text-gray-400 mt-10 font-hand text-xl">
             You haven't found anything yet.<br/>Look around...
           </div>
         ) : (
           foundItems.map((item) => (
             <div 
               key={item.id}
               onClick={() => onOpenLetter(item.id)}
               className="group bg-white p-4 rounded-lg shadow-sm border border-stone-200 cursor-pointer hover:shadow-md hover:border-stone-300 transition-all transform hover:-translate-y-1 relative overflow-hidden"
             >
               <div className="absolute top-0 left-0 w-1 h-full bg-pastel-pink opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="font-hand text-lg font-bold text-gray-700">{item.title}</h3>
               <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{item.type}</p>
               <BookOpen size={16} className="absolute bottom-4 right-4 text-gray-300 group-hover:text-pastel-pink transition-colors" />
             </div>
           ))
         )}
         
         {/* Hint for progress */}
         <div className="mt-8 p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
           <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
             <div 
               className="bg-green-400 h-2 rounded-full transition-all duration-1000" 
               style={{ width: `${(mainLettersFound / TOTAL_LETTERS) * 100}%` }}
             ></div>
           </div>
           <p className="text-xs text-gray-400 font-hand">Collection Progress</p>
         </div>
       </div>
    </div>
  );
};