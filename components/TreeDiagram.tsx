import React, { useState } from 'react';
import { sefirot, hebrewLetters } from '../data';
import { Sefira } from '../types';
import { X, Shield, Star, Users } from 'lucide-react';

interface TreeDiagramProps {
  onSelectLetter: (letterName: string) => void;
}

const TreeDiagram: React.FC<TreeDiagramProps> = ({ onSelectLetter }) => {
  const [selectedSefira, setSelectedSefira] = useState<Sefira | null>(null);

  const positions: Record<string, { x: number; y: number }> = {
    keter: { x: 50, y: 10 },
    binah: { x: 20, y: 25 },
    chochmah: { x: 80, y: 25 },
    gevurah: { x: 20, y: 45 },
    chesed: { x: 80, y: 45 },
    tiferet: { x: 50, y: 55 },
    hod: { x: 20, y: 75 },
    netzach: { x: 80, y: 75 },
    yesod: { x: 50, y: 85 },
    malchut: { x: 50, y: 110 }, // Malchut moved down for better aesthetics
  };

  return (
    <div className="p-4 pb-24 md:pb-4 max-w-4xl mx-auto h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">El Árbol de la Vida</h2>
      <p className="text-center text-gray-500 text-sm mb-4">Mapa interactivo de las 10 Emanaciones Divinas</p>
      
      <div className="grow flex items-center justify-center relative min-h-[550px]">
        <svg viewBox="0 0 100 125" className="h-full w-full max-w-md drop-shadow-2xl select-none">
          {hebrewLetters.map((letter) => {
             if (!letter.pathKey) return null;
             const [start, end] = letter.pathKey;
             const startPos = positions[start];
             const endPos = positions[end];
             if (!startPos || !endPos) return null;

             const midX = (startPos.x + endPos.x) / 2;
             const midY = (startPos.y + endPos.y) / 2;

             return (
               <g key={letter.name}>
                 <line x1={startPos.x} y1={startPos.y} x2={endPos.x} y2={endPos.y} stroke="#e2e8f0" strokeWidth="1.2" />
                 <g onClick={() => onSelectLetter(letter.name)} className="cursor-pointer hover:opacity-100 opacity-80 group transition-all">
                   <circle cx={midX} cy={midY} r="2.2" fill="white" stroke="#94a3b8" strokeWidth="0.4" className="group-hover:stroke-purple-500 group-hover:r-2.5 transition-all" />
                   <text x={midX} y={midY} dy=".35em" textAnchor="middle" fontSize="2.2" className="font-hebrew font-bold fill-slate-500 group-hover:fill-purple-700 pointer-events-none transition-colors">
                     {letter.letter}
                   </text>
                 </g>
               </g>
             );
          })}

          {sefirot.map((sefira) => (
            <g key={sefira.id} onClick={() => setSelectedSefira(sefira)} className="cursor-pointer hover:scale-105 transition-transform origin-center">
              <circle cx={positions[sefira.id].x} cy={positions[sefira.id].y} r="5.5" fill={sefira.color} stroke="#475569" strokeWidth="0.6" className="shadow-lg" />
              <text x={positions[sefira.id].x} y={positions[sefira.id].y} dy=".3em" textAnchor="middle" fontSize="2.4" fontWeight="bold" fill={['keter', 'binah', 'gevurah', 'hod', 'malchut'].includes(sefira.id) ? 'white' : 'black'} className="select-none pointer-events-none uppercase tracking-tighter">
                {sefira.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {selectedSefira && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white w-full md:max-w-2xl rounded-3xl p-8 shadow-2xl animate-slide-up relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedSefira(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full p-2 transition-colors">
              <X size={24} />
            </button>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 border-b border-gray-100 pb-6">
              <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl border-4 border-white shrink-0" style={{ backgroundColor: selectedSefira.color }}>
                <span className="font-hebrew font-bold text-4xl" style={{ color: ['keter', 'binah', 'gevurah', 'hod', 'malchut'].includes(selectedSefira.id) ? 'white' : 'black' }}>
                  {selectedSefira.hebrew}
                </span>
              </div>
              <div className="grow">
                <div className="flex items-center gap-3 mb-1">
                   <h3 className="text-3xl font-bold text-gray-900">{selectedSefira.name}</h3>
                   <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest">{selectedSefira.meaning}</span>
                </div>
                <p className="text-gray-400 italic font-medium">{selectedSefira.divineName} • {selectedSefira.archangel}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <h4 className="flex items-center gap-2 text-sm font-bold text-purple-600 uppercase tracking-wider"><Shield size={16}/> Concepto Metafísico</h4>
                 <p className="text-gray-700 leading-relaxed">{selectedSefira.description}</p>
              </div>
              <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                 <h4 className="flex items-center gap-2 text-sm font-bold text-indigo-600 uppercase tracking-wider"><Users size={16}/> Correspondencias</h4>
                 <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Nombre Divino:</strong> {selectedSefira.divineName}</p>
                    <p><strong>Arcángel:</strong> {selectedSefira.archangel}</p>
                    <p><strong>Cuerpo Humano:</strong> {selectedSefira.id === 'keter' ? 'Corona / Cabeza' : selectedSefira.id === 'tiferet' ? 'Corazón' : selectedSefira.id === 'malchut' ? 'Pies' : 'Órgano vital'}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeDiagram;