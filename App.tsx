import React, { useState } from 'react';
import Navigation from './components/Navigation';
import NamesGrid from './components/NamesGrid';
import TreeDiagram from './components/TreeDiagram';
import LetterTable from './components/LetterTable';
import MeditationGuide from './components/MeditationGuide';
import GuidedMeditation from './components/GuidedMeditation';
import AngelsList from './components/AngelsList';
import { View, Name72 } from './types';
import { Grid, Book } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [selectedLetterName, setSelectedLetterName] = useState<string | null>(null);
  const [meditationName, setMeditationName] = useState<Name72 | null>(null);

  const handleSelectLetterFromTree = (letterName: string) => {
    setSelectedLetterName(letterName);
    setCurrentView(View.Letters);
  };

  const handleStartMeditation = (name: Name72) => {
    setMeditationName(name);
    setCurrentView(View.Meditation);
  };

  const handleSetView = (view: View) => {
    if (view !== View.Letters) {
      setSelectedLetterName(null);
    }
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case View.Names72:
        return <NamesGrid onStartMeditation={handleStartMeditation} />;
      case View.Angels:
        return <AngelsList />;
      case View.Tree:
        return <TreeDiagram onSelectLetter={handleSelectLetterFromTree} />;
      case View.Letters:
        return <LetterTable initialSelectedLetter={selectedLetterName} />;
      case View.Guide:
        return <MeditationGuide />;
      case View.Meditation:
        return meditationName ? (
          <GuidedMeditation 
            name={meditationName} 
            onClose={() => handleSetView(View.Names72)} 
          />
        ) : null;
      case View.Home:
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center max-w-2xl mx-auto animate-fade-in pb-24 md:pb-6">
            <div className="mb-6 relative">
              <div className="absolute -inset-4 bg-purple-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight relative">
                Kabbalah <span className="text-purple-600">Práctica</span>
              </h1>
            </div>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-medium">
              by Khaileh
            </p>
            
            <div className="grid gap-6 w-full sm:grid-cols-2">
              <button onClick={() => handleSetView(View.Names72)} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all text-left group">
                <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 mb-4 group-hover:scale-110 transition-transform">
                   <Grid size={28} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700">72 Nombres</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Secuencias sagradas para transformar tu ADN espiritual.</p>
              </button>

              <button onClick={() => handleSetView(View.Angels)} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all text-left group">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                   {/* Winged Angel Icon with Halo */}
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <ellipse cx="12" cy="5" rx="5" ry="1.5" />
                     <circle cx="12" cy="10" r="2.5" />
                     <path d="M12 13.5 L7.5 21 H16.5 L12 13.5 Z" />
                     <path d="M15 12 C19 10 22 13 20 17" />
                     <path d="M9 12 C5 10 2 13 4 17" />
                   </svg>
                </div>
                {/* Changed text from '72 Genios' to '72 Ángeles' */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700">72 Ángeles</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Conecta con los ángeles guardianes, sus plegarias y exhortos.</p>
              </button>

              <button onClick={() => handleSetView(View.Tree)} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all text-left group">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform overflow-hidden relative">
                   {/* Abstract Tree of Life SVG Icon */}
                   <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                     <circle cx="50" cy="15" r="5" fill="currentColor" opacity="0.8"/>
                     <circle cx="20" cy="30" r="5" fill="currentColor" opacity="0.8"/>
                     <circle cx="80" cy="30" r="5" fill="currentColor" opacity="0.8"/>
                     <circle cx="20" cy="50" r="5" fill="currentColor" opacity="0.8"/>
                     <circle cx="80" cy="50" r="5" fill="currentColor" opacity="0.8"/>
                     <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.8"/>
                     <circle cx="20" cy="70" r="5" fill="currentColor" opacity="0.8"/>
                     <circle cx="80" cy="70" r="5" fill="currentColor" opacity="0.8"/>
                     <circle cx="50" cy="80" r="5" fill="currentColor" opacity="0.8"/>
                     <circle cx="50" cy="95" r="5" fill="currentColor" opacity="0.8"/>
                     {/* Lines */}
                     <path d="M50 15 L20 30 M50 15 L80 30 M20 30 L20 50 M80 30 L80 50 M20 30 L50 50 M80 30 L50 50 M50 15 L50 50 M20 50 L50 80 M80 50 L50 80 M50 50 L50 80 M50 80 L50 95 M20 70 L50 80 M80 70 L50 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none"/>
                   </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700">Árbol Vida</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Mapa cosmogónico de las 10 Sefirot y sus senderos.</p>
              </button>

              <button onClick={() => handleSetView(View.Letters)} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all text-left group">
                <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 mb-4 group-hover:scale-110 transition-transform">
                   {/* Correct Aleph Letter Icon (Text Based for Accuracy) */}
                   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0">
                     <text 
                        x="50%" 
                        y="50%" 
                        dy=".35em" 
                        textAnchor="middle" 
                        fontSize="22" 
                        fontFamily="'Frank Ruhl Libre', serif" 
                        fontWeight="bold" 
                        fill="currentColor"
                      >
                        א
                      </text>
                   </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700">Alefato</h3>
                <p className="text-gray-500 text-sm leading-relaxed">El código fuente del universo en 22 letras de fuego.</p>
              </button>

              <button onClick={() => handleSetView(View.Guide)} className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:border-purple-300 hover:shadow-xl transition-all text-left group sm:col-span-2">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                     <Book size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-700">Meditación Guiada</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">Guía práctica paso a paso para la conexión con el Infinito y la visualización.</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="md:flex min-h-screen bg-white text-slate-900">
      {currentView !== View.Meditation && <Navigation currentView={currentView} setView={handleSetView} />}
      <main className="flex-1 overflow-y-auto h-screen bg-slate-50/30">
        {renderView()}
      </main>
    </div>
  );
};

export default App;