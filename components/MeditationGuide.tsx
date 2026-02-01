import React from 'react';
import { Eye, Wind, Sun, Heart, Brain, Sparkles } from 'lucide-react';

const MeditationGuide: React.FC = () => {
  return (
    <div className="p-4 pb-24 md:pb-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Guía Práctica de Meditación Kabbalística</h2>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Sigue estos pasos detallados para conectar con la energía de los 72 Nombres y las Letras Hebreas.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Step 1 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4 border-b border-gray-50 pb-3">
            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
              <Wind size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">1. Preparación y Respiración</h3>
          </div>
          <div className="text-gray-600 text-sm space-y-2">
            <p>Siéntate en una silla cómoda con la espalda recta y los pies en el suelo (haciendo "tierra").</p>
            <p className="font-medium text-purple-700">Técnica de Respiración:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Inhala profundamente contando hasta 4.</li>
              <li>Retén el aire contando hasta 4.</li>
              <li>Exhala suavemente contando hasta 4.</li>
              <li>Repite este ciclo 3 veces para calmar el ego.</li>
            </ul>
          </div>
        </section>

        {/* Step 2 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4 border-b border-gray-50 pb-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
              <Brain size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">2. Intención (Kavaná)</h3>
          </div>
          <div className="text-gray-600 text-sm space-y-2">
            <p>Antes de mirar las letras, debes tener clara tu intención.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>¿Qué bloqueo deseas eliminar?</li>
              <li>¿Qué bendición deseas atraer?</li>
            </ul>
            <p className="italic bg-blue-50 p-2 rounded mt-2">"No medito para mí mismo, sino para recibir luz y compartirla con el mundo."</p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4 border-b border-gray-50 pb-3">
            <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600">
              <Eye size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">3. El Escaneo Visual</h3>
          </div>
          <div className="text-gray-600 text-sm space-y-2">
            <p>Abre los ojos y mira la secuencia de tres letras.</p>
            <p className="font-bold">IMPORTANTE: Escanea de DERECHA a IZQUIERDA.</p>
            <p>No necesitas intelectualizar las letras, solo deja que tus ojos "tracen" la forma de la tinta negra sobre el fondo blanco. Imagina que las letras están encendidas en fuego blanco.</p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4 border-b border-gray-50 pb-3">
            <div className="bg-red-100 p-2 rounded-lg text-red-600">
              <Heart size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">4. Integración e Irradiación</h3>
          </div>
          <div className="text-gray-600 text-sm space-y-2">
            <p>Cierra los ojos nuevamente.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Visualiza las tres letras entrando en tu <strong>cabeza</strong>, iluminando tu mente.</li>
              <li>Bájalas a tu <strong>corazón</strong>, encendiendo una luz cálida.</li>
              <li>Siente cómo esa luz se expande fuera de ti, envolviendo a tus seres queridos y al mundo.</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white text-center shadow-lg">
        <div className="flex justify-center mb-2">
          <Sparkles className="animate-pulse" />
        </div>
        <p className="font-medium text-lg">
          "La práctica constante transforma la realidad. Medita con un nombre al día."
        </p>
      </div>
    </div>
  );
};

export default MeditationGuide;