import React, { useState } from 'react';
import { angels } from '../data';
import { Angel } from '../types';
import { X, Search, Calendar, Clock, Feather, Scroll, MessageCircle } from 'lucide-react';

const AngelsList: React.FC = () => {
  const [selectedAngel, setSelectedAngel] = useState<Angel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAngels = angels.filter(angel => 
    angel.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    angel.id.toString().includes(searchTerm) ||
    angel.dates.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 pb-24 md:pb-4 max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Los 72 Genios de la Kabbalah</h2>
        <p className="text-gray-500 text-sm">Plegarias y Exhortos para la conexión angélica</p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:text-sm shadow-sm transition-all"
          placeholder="Buscar ángel por nombre, número o fecha..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
        {filteredAngels.map((angel) => (
          <button
            key={angel.id}
            onClick={() => setSelectedAngel(angel)}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all text-left group flex items-start gap-4"
          >
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              {angel.id}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg group-hover:text-purple-700 transition-colors">{angel.name}</h3>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{angel.sign}</div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar size={12} />
                <span>{angel.dates}</span>
              </div>
            </div>
          </button>
        ))}
        {filteredAngels.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            No se encontraron ángeles que coincidan con tu búsqueda.
          </div>
        )}
      </div>

      {selectedAngel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 p-6 text-white shrink-0 relative">
              <button 
                onClick={() => setSelectedAngel(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-4 mb-2">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">Genio Nº {selectedAngel.id}</span>
                <span className="text-purple-200 text-xs font-medium tracking-widest uppercase">{selectedAngel.degrees}</span>
              </div>
              <h2 className="text-4xl font-bold mb-1">{selectedAngel.name}</h2>
              <div className="flex flex-wrap gap-4 text-sm text-purple-100 mt-2 opacity-90">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{selectedAngel.dates}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{selectedAngel.invocationTime}</span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 space-y-8 bg-slate-50">
              
              {/* Attributes Section */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="flex items-center gap-2 text-sm font-black text-purple-600 uppercase tracking-widest mb-3">
                  <Feather size={16} /> Atributos y Poderes
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedAngel.attributes}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Prayer Section */}
                <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>
                  <h4 className="flex items-center gap-2 text-sm font-black text-blue-600 uppercase tracking-widest mb-4 relative z-10">
                    <MessageCircle size={16} /> Plegaria
                  </h4>
                  <div className="text-gray-600 whitespace-pre-wrap leading-relaxed italic relative z-10 font-medium">
                    {selectedAngel.prayer}
                  </div>
                </div>

                {/* Exhortation Section */}
                <div className="bg-purple-900 p-6 rounded-xl border border-purple-800 shadow-sm text-white relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-800 rounded-tr-full -ml-16 -mb-16 opacity-50 z-0"></div>
                  <h4 className="flex items-center gap-2 text-sm font-black text-purple-300 uppercase tracking-widest mb-4 relative z-10">
                    <Scroll size={16} /> Exhorto
                  </h4>
                  <div className="text-purple-50 whitespace-pre-wrap leading-relaxed relative z-10 font-light">
                    {selectedAngel.exhortation}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AngelsList;