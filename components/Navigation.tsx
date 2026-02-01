import React from 'react';
import { View } from '../types';
import { Home, Grid, Book } from 'lucide-react';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

// Ángel con Halo, Alas desplegadas y Túnica (Diseño icónico)
const AngelIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Halo */}
    <ellipse cx="12" cy="5" rx="5" ry="1.5" />
    {/* Cabeza */}
    <circle cx="12" cy="10" r="2.5" />
    {/* Cuerpo (Túnica) */}
    <path d="M12 13.5 L7.5 21 H16.5 L12 13.5 Z" />
    {/* Alas */}
    <path d="M15 12 C19 10 22 13 20 17" />
    <path d="M9 12 C5 10 2 13 4 17" />
  </svg>
);

// Árbol de la Vida (Diseño detallado unificado)
const TreeIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className={className}>
     {/* Líneas de conexión */}
     <path d="M50 15 L20 30 M50 15 L80 30 M20 30 L20 50 M80 30 L80 50 M20 30 L50 50 M80 30 L50 50 M50 15 L50 50 M20 50 L50 80 M80 50 L50 80 M50 50 L50 80 M50 80 L50 95 M20 70 L50 80 M80 70 L50 80" strokeWidth="4" opacity="0.6"/>
     {/* Sefirot */}
     <circle cx="50" cy="15" r="6" fill="currentColor" stroke="none" />
     <circle cx="20" cy="30" r="6" fill="currentColor" stroke="none" />
     <circle cx="80" cy="30" r="6" fill="currentColor" stroke="none" />
     <circle cx="20" cy="50" r="6" fill="currentColor" stroke="none" />
     <circle cx="80" cy="50" r="6" fill="currentColor" stroke="none" />
     <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" />
     <circle cx="20" cy="70" r="6" fill="currentColor" stroke="none" />
     <circle cx="80" cy="70" r="6" fill="currentColor" stroke="none" />
     <circle cx="50" cy="80" r="6" fill="currentColor" stroke="none" />
     <circle cx="50" cy="95" r="6" fill="currentColor" stroke="none" />
  </svg>
);

// Letra Aleph (א) - Usando texto SVG con fuente Serif para exactitud perfecta
const AlephIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0" className={className}>
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
);

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { view: View.Home, icon: Home, label: 'Inicio' },
    { view: View.Names72, icon: Grid, label: '72 Nombres' },
    { view: View.Angels, icon: AngelIcon, label: 'Ángeles' },
    { view: View.Tree, icon: TreeIcon, label: 'Árbol' },
    { view: View.Letters, icon: AlephIcon, label: 'Alefato' },
    { view: View.Guide, icon: Book, label: 'Guía' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg pb-safe md:relative md:border-t-0 md:border-r md:w-20 md:flex md:flex-col md:h-screen md:items-center md:pt-6 z-50">
      <div className="flex justify-around items-center h-16 md:flex-col md:h-auto md:space-y-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setView(item.view)}
              className={`flex flex-col items-center justify-center w-full md:w-16 md:h-16 rounded-lg transition-colors duration-200 ${
                isActive ? 'text-purple-700 bg-purple-50' : 'text-gray-500 hover:text-purple-600'
              }`}
            >
              <Icon size={24} className={isActive ? "stroke-[2.5px]" : "stroke-[2px]"} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;