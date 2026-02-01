import React, { useState } from 'react';
import { names72 } from '../data';
import { Name72, View } from '../types';
import { X, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

interface NamesGridProps {
  onStartMeditation: (name: Name72) => void;
}

const NamesGrid: React.FC<NamesGridProps> = ({ onStartMeditation }) => {
  const [selectedName, setSelectedName] = useState<Name72 | null>(null);

  const handleNext = () => {
    if (!selectedName) return;
    const nextId = selectedName.id === 72 ? 1 : selectedName.id + 1;
    const next = names72.find(n => n.id === nextId);
    if (next) setSelectedName(next);
  };

  const handlePrev = () => {
    if (!selectedName) return;
    const prevId = selectedName.id === 1 ? 72 : selectedName.id - 1;
    const prev = names72.find(n => n.id === prevId);
    if (prev) setSelectedName(prev);
  };

  return (
    <div className="p-4 pb-24 md:pb-4 max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Los 72 Nombres de Dios</h2>
        <p className="text-gray-500 text-sm italic">Flujo de visualización sagrada (Derecha a Izquierda)</p>
      </div>
      
      {/* Grid container with RTL direction */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4" dir="rtl">
        {names72.map((name) => (
          <button
            key={name.id}
            onClick={() => setSelectedName(name)}
            className={`${name.colorClass} hover:ring-4 hover:ring-purple-200 transition-all rounded-xl aspect-square flex flex-col items-center justify-center p-3 shadow-md text-white group overflow-hidden relative`}
          >
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors"></div>
            <span className="text-3xl font-hebrew font-bold mb-2 drop-shadow-sm" dir="rtl">{name.hebrew}</span>
            <div className="absolute bottom-2 left-2 right-2 text-[9px] font-bold text-center leading-none opacity-80 uppercase tracking-tighter">
              {name.id}. {name.meaning}
            </div>
          </button>
        ))}
      </div>

      {selectedName && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden relative shadow-2xl flex flex-col max-h-[95vh] animate-fade-in">
            
            <div className={`${selectedName.colorClass} p-8 text-white relative shrink-0 overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              
              {/* Added z-20 to ensure button is clickable above decorative elements */}
              <button 
                onClick={() => setSelectedName(null)} 
                className="absolute top-6 right-6 text-white hover:text-white bg-black/20 rounded-full p-2 hover:bg-black/30 transition-all z-20"
              >
                <X size={24} />
              </button>
              
              <div className="text-center relative z-10">
                <div className="text-xs font-bold uppercase tracking-[0.3em] opacity-70 mb-2">Nombre Divino #{selectedName.id}</div>
                <h3 className="text-4xl font-bold tracking-tight">{selectedName.meaning}</h3>
              </div>
            </div>

            <div className="p-8 overflow-y-auto grow flex flex-col items-center">
              <div className="w-full bg-slate-50 rounded-2xl p-10 mb-8 flex flex-col items-center justify-center border border-slate-100 shadow-inner group">
                <div className="text-9xl font-hebrew font-bold text-gray-800 mb-6 tracking-[0.2em] animate-pulse-slow" dir="rtl">
                  {selectedName.hebrew}
                </div>
                <div className="flex items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">
                   <span>D</span>
                   <div className="w-24 h-[2px] bg-gray-200 relative overflow-hidden">
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-purple-400 animate-scroll-rtl"></div>
                   </div>
                   <span>I</span>
                </div>
                <div className="mt-6 text-lg text-purple-600 font-bold tracking-[0.1em]">
                  {selectedName.transliteration}
                </div>
              </div>

              <div className="w-full space-y-8">
                <div className="text-center px-4">
                   <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-3">Poder del Nombre</h4>
                   <p className="text-gray-700 leading-relaxed text-xl font-medium">{selectedName.description}</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 relative">
                   <Quote className="absolute -top-3 -left-3 text-purple-200" size={48}/>
                   <h4 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-4 text-center">Afirmación Sagrada</h4>
                   <p className="text-purple-900 font-bold text-center italic text-lg leading-relaxed">
                     "{selectedName.affirmation}"
                   </p>
                </div>

                <button 
                  onClick={() => {
                    onStartMeditation(selectedName);
                    setSelectedName(null);
                  }}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition-all shadow-lg hover:scale-[1.02]"
                >
                  <Sparkles size={20}/>
                  Iniciar Meditación Guiada
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
              <button onClick={handlePrev} className="flex items-center gap-2 text-gray-400 hover:text-purple-600 font-bold px-4 py-2 rounded-xl hover:bg-white transition-all">
                <ChevronLeft size={20} />
                <span className="text-xs uppercase">Anterior</span>
              </button>
              <button onClick={handleNext} className="flex items-center gap-2 text-gray-400 hover:text-purple-600 font-bold px-4 py-2 rounded-xl hover:bg-white transition-all">
                <span className="text-xs uppercase">Siguiente</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NamesGrid;