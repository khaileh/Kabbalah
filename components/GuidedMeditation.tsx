import React, { useState, useEffect, useRef } from 'react';
import { Name72 } from '../types';
import { X, Volume2, Wind, Sparkles, Heart, Eye } from 'lucide-react';

interface GuidedMeditationProps {
  name: Name72;
  onClose: () => void;
}

const GuidedMeditation: React.FC<GuidedMeditationProps> = ({ name, onClose }) => {
  const [step, setStep] = useState(0);
  const [kavana, setKavana] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioContext = useRef<AudioContext | null>(null);

  // Phases with integrated instructions
  const phases = [
    { title: "Define tu Intención", icon: Sparkles, duration: 0 },
    { 
      title: "Respiración Consciente", 
      icon: Wind, 
      duration: 30000, 
      instruction: "Cierra los ojos. Inhala en 4 tiempos, retén en 4, exhala en 4. Siente cómo tu ego se disuelve y dejas espacio para la Luz." 
    },
    { 
      title: "Escaneo Visual", 
      icon: Eye, 
      duration: 45000, 
      instruction: "Abre los ojos. Escanea las letras de DERECHA a IZQUIERDA. Observa la llama viva sobre cada letra conectándote con el Cielo." 
    },
    { 
      title: "Integración Sagrada", 
      icon: Heart, 
      duration: 60000, 
      instruction: `Visualiza las letras encendidas en tu mente. Repite internamente: "${kavana ? kavana + '. ' : ''}${name.affirmation}"` 
    },
    { 
      title: "Expansión", 
      icon: Volume2, 
      duration: 30000, 
      instruction: "Irradia esta vibración desde tu corazón hacia todo el planeta. Tú eres un canal de bendición." 
    },
    { 
      title: "Gratitud", 
      icon: Sparkles, 
      duration: 15000, 
      instruction: "Siente gratitud por la conexión. La Luz permanece contigo. Abre los ojos suavemente." 
    }
  ];

  const playBell = () => {
    try {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContext.current;
      if (ctx.state === 'suspended') ctx.resume();

      // Create a more "crystal/bell" sound using harmonics
      const frequencies = [880, 1318.51, 1760]; // A5, E6, A6 (High and pleasant)
      
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Quick attack, long exponential decay
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15 / (i + 1), ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 4);
      });
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  useEffect(() => {
    let timer: number;
    if (isActive && step > 0 && step < phases.length) {
      playBell();
      const duration = phases[step].duration;
      let start = Date.now();
      
      timer = window.setInterval(() => {
        const elapsed = Date.now() - start;
        const currentProgress = (elapsed / duration) * 100;
        
        if (currentProgress >= 100) {
          if (step < phases.length - 1) {
            setStep(s => s + 1);
            setProgress(0);
          } else {
            setIsActive(false);
            setStep(phases.length - 1);
          }
          clearInterval(timer);
        } else {
          setProgress(currentProgress);
        }
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isActive, step]);

  const startMeditation = () => {
    // Removed validation check to make intention optional
    setStep(1);
    setIsActive(true);
  };

  // Helper to split hebrew string correctly (though JS split works fine for simple chars)
  const letters = name.hebrew.split('');

  const renderContent = () => {
    if (step === 0) {
      return (
        <div className="space-y-8 animate-fade-in max-w-md w-full px-4 mt-10">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Prepara tu Kavaná</h3>
            <p className="text-gray-500 text-sm">Define tu intención para esta conexión sagrada (opcional)</p>
          </div>
          <div className="p-8 bg-white rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center">
            <div className="text-6xl font-hebrew text-purple-600 mb-6 drop-shadow-md" dir="rtl">{name.hebrew}</div>
            <div className="w-full text-center text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              {name.transliteration}
            </div>
            <textarea
              className="w-full h-32 p-4 rounded-2xl bg-slate-50 border-transparent focus:ring-2 focus:ring-purple-500 focus:bg-white text-gray-700 resize-none shadow-inner transition-all"
              placeholder="Escribe tu intención... (ej. 'Sano mi cuerpo', 'Paz en mi hogar')"
              value={kavana}
              onChange={(e) => setKavana(e.target.value)}
            />
          </div>
          <button
            onClick={startMeditation}
            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-2xl hover:scale-[1.02]"
          >
            Comenzar Meditación
          </button>
        </div>
      );
    }

    const currentPhase = phases[step];
    const Icon = currentPhase.icon;

    return (
      <div className="flex flex-col items-center justify-between h-full w-full max-w-3xl py-12 px-6 relative">
        
        {/* Center: The Core Visualization */}
        <div className="relative flex flex-col items-center justify-center flex-grow w-full py-8">
          
          {/* Background Ambient Glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-amber-100/30 rounded-full blur-[80px] animate-pulse"></div>
          
          {/* Hebrew Letters with Flame Crowns */}
          {/* Reduced margin-bottom from mb-16 to mb-6 */}
          <div className="relative z-10 flex gap-4 md:gap-8 items-end justify-center mb-6" dir="rtl">
            {letters.map((char, index) => (
              <div key={index} className="flex flex-col items-center relative group">
                
                {/* The Ethereal Flame */}
                <div 
                  className="absolute -top-16 md:-top-24 w-12 h-20 md:w-20 md:h-32 opacity-90 animate-flame"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                    <defs>
                      <linearGradient id={`flameGradient-${index}`} x1="0%" y1="100%" x2="0%" y2="0%">
                         <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" /> {/* Amber 400 */}
                         <stop offset="50%" stopColor="#fef3c7" stopOpacity="0.6" /> {/* Amber 100 */}
                         <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M50 0 C50 0 20 60 20 80 C20 95 35 100 50 100 C65 100 80 95 80 80 C80 60 50 0 50 0 Z" 
                      fill={`url(#flameGradient-${index})`}
                    />
                    {/* Inner core of flame */}
                    <path 
                      d="M50 30 C50 30 35 70 35 85 C35 95 40 98 50 98 C60 98 65 95 65 85 C65 70 50 30 50 30 Z" 
                      fill="#ffffff"
                      fillOpacity="0.7"
                    />
                  </svg>
                </div>

                {/* The Letter */}
                <div className="text-[7rem] md:text-[11rem] leading-none font-hebrew font-bold text-gray-900 drop-shadow-2xl z-10">
                  {char}
                </div>
              </div>
            ))}
          </div>

          {/* Transliteration Moved Below */}
          <div className="text-center z-10 animate-fade-in relative">
             <div className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">Nombre Divino</div>
             <div className="text-2xl md:text-3xl font-bold text-gray-600 tracking-[0.2em] uppercase">{name.transliteration}</div>
          </div>
        </div>

        {/* Bottom: Instructions */}
        <div className="text-center space-y-6 w-full max-w-xl z-10 mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 text-purple-600">
            <Icon size={20} className="animate-pulse" />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">{currentPhase.title}</h3>
          </div>
          <div className="min-h-[60px] flex items-center justify-center px-4">
            <p className="text-lg md:text-2xl text-gray-800 font-medium leading-relaxed animate-fade-in key={step}">
              {currentPhase.instruction}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px]"></div>
      </div>

      <button 
        onClick={() => {
          if (step > 0 && step < phases.length - 1) {
            if (confirm("¿Deseas interrumpir la conexión espiritual?")) onClose();
          } else {
            onClose();
          }
        }}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors z-[110] p-3 hover:bg-white rounded-full shadow-sm"
      >
        <X size={28} />
      </button>

      {renderContent()}

      {/* Linear Progress Bar at the absolute bottom */}
      {step > 0 && (
        <div className="absolute bottom-8 w-full max-w-md px-8 z-20">
          <div className="flex justify-between text-[10px] font-black text-gray-400 mb-2 tracking-widest uppercase">
            <span>Fase {step} de {phases.length - 1}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 transition-all duration-300 ease-out" 
              style={{ width: `${Math.max(5, progress)}%` }} 
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidedMeditation;