import React from 'react';
import { Letter } from '../types';
import { X, Heart } from 'lucide-react';

interface ModalProps {
  letter: Letter;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ letter, onClose }) => {
  const isLetter = letter.type === 'letter';
  const isPoem = letter.type === 'poem';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div 
        className={`relative max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ${
          isLetter ? 'bg-[#fffdf5]' : 'bg-white'
        } ${isPoem ? 'bg-pink-50' : ''}`}
        style={{ borderRadius: '12px' }}
      >
        {/* Header decoration */}
        <div className="h-2 w-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-hand text-gray-700 font-bold">{letter.title}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className={`prose prose-stone prose-lg max-w-none ${isPoem ? 'italic text-center' : ''}`}>
             <p className="font-hand text-xl leading-relaxed whitespace-pre-wrap text-gray-800">
               {letter.content}
             </p>
          </div>

          <div className="mt-8 flex justify-center">
             <Heart className="text-pink-300 fill-pink-100 animate-pulse" size={24} />
          </div>
        </div>

        {/* Paper texture overlay (subtle) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
      </div>
    </div>
  );
};