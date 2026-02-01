import React, { useState, useEffect } from 'react';
import { hebrewLetters } from '../data';
import { HebrewLetter } from '../types';
import { X, Star, MapPin } from 'lucide-react';

interface LetterTableProps {
  initialSelectedLetter?: string | null;
}

const LetterTable: React.FC<LetterTableProps> = ({ initialSelectedLetter }) => {
  const [selectedLetter, setSelectedLetter] = useState<HebrewLetter | null>(null);

  useEffect(() => {
    if (initialSelectedLetter) {
      const found = hebrewLetters.find(l => l.name === initialSelectedLetter);
      if (found) setSelectedLetter(found);
    }
  }, [initialSelectedLetter]);

  return (
    <div className="p-4 pb-24 md:pb-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Las 22 Letras Hebreas</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600 text-center">Letra</th>
                <th className="p-4 font-semibold text-gray-600">Nombre</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Latín</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Valor</th>
                <th className="p-4 font-semibold text-gray-600 hidden sm:table-cell">Significado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hebrewLetters.map((letter) => (
                <tr 
                  key={letter.name} 
                  onClick={() => setSelectedLetter(letter)}
                  className="hover:bg-purple-50 transition-colors cursor-pointer group"
                >
                  <td className="p-4 text-center">
                    <span className="font-hebrew text-3xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors">{letter.letter}</span>
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    {letter.name}
                    <div className="sm:hidden text-xs text-gray-500 mt-1 font-normal">{letter.meaning}</div>
                  </td>
                  <td className="p-4 text-center text-gray-600">{letter.latin}</td>
                  <td className="p-4 text-center font-mono text-gray-600">{letter.value}</td>
                  <td className="p-4 text-gray-600 hidden sm:table-cell">{letter.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLetter && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="bg-gray-900 p-6 text-white relative">
              <button 
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 rounded-full p-1"
              >
                <X size={24} />
              </button>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-purple-300 font-bold uppercase tracking-widest text-xs mb-1">Letra Hebrea</div>
                  <h3 className="text-3xl font-bold">{selectedLetter.name}</h3>
                </div>
                <div className="font-hebrew text-6xl leading-none">{selectedLetter.letter}</div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">Gematría</div>
                    <div className="text-xl font-bold text-gray-800">{selectedLetter.value}</div>
                 </div>
                 <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="text-xs text-gray-500 uppercase font-bold mb-1">Latín</div>
                    <div className="text-xl font-bold text-gray-800">{selectedLetter.latin}</div>
                 </div>
              </div>

              <div className="space-y-6">
                <div>
                   <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                     <Star size={16} className="text-purple-600"/> Correspondencia
                   </h4>
                   <p className="text-gray-700 bg-purple-50 p-3 rounded-lg text-sm">{selectedLetter.planet_element}</p>
                </div>

                <div>
                   <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                     <MapPin size={16} className="text-purple-600"/> Sendero
                   </h4>
                   <p className="text-gray-700 text-sm">{selectedLetter.path || "N/A"}</p>
                </div>

                <div>
                   <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Significado Profundo</h4>
                   <div className="text-gray-600 leading-relaxed space-y-2 text-sm md:text-base">
                     <p>{selectedLetter.description}</p>
                     <p>Significado literal: <strong>{selectedLetter.meaning}</strong></p>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
              <button 
                onClick={() => setSelectedLetter(null)}
                className="text-purple-600 font-medium hover:text-purple-800 text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LetterTable;