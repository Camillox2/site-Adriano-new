import React, { useRef, useState, useEffect } from 'react';
import { Rotate3d, Zap, Monitor, Cpu } from 'lucide-react';
import { images } from '../assets/index';

const HOTSPOTS = [
  {
    id: 'screen',
    title: 'Tela Digital Touch 10"',
    description: 'Painel de controle em HD para ajustar energia (Joules), profundidade (1.5mm a 4.5mm), espaçamento e modo de disparo em tempo real.',
    Icon: Monitor,
    position: { top: '12%', left: '42%' },
  },
  {
    id: 'handpiece',
    title: 'Transdutor Microfocado',
    description: 'Manopla ergonômica com ponteiras de encaixe rápido. Disparos contínuos confortáveis para o paciente e o profissional.',
    Icon: Zap,
    position: { top: '45%', left: '15%' },
  },
  {
    id: 'body',
    title: 'Gabinete Premium',
    description: 'Corpo em ABS brilhante com base cromada sobre rodízios. Fácil transporte entre clínicas, com maleta antichoque.',
    Icon: Cpu,
    position: { top: '70%', left: '55%' },
  },
];

const HifuDeviceViewer3d = () => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [autoRotate, setAutoRotate] = useState(0);
  const autoRotateRef = useRef(null);

  // Auto-rotate sutil quando não está com hover
  useEffect(() => {
    const tick = () => {
      if (!isHovering) {
        setAutoRotate(prev => prev + 0.3);
      }
      autoRotateRef.current = requestAnimationFrame(tick);
    };
    autoRotateRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoRotateRef.current);
  }, [isHovering]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -20,
      y: (x - 0.5) * 20,
    });
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current || !e.touches[0]) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.touches[0].clientX - rect.left) / rect.width;
    const y = (e.touches[0].clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -15,
      y: (x - 0.5) * 15,
    });
    setIsHovering(true);
  };

  const rotX = isHovering ? tilt.x : Math.sin(autoRotate * 0.02) * 3;
  const rotY = isHovering ? tilt.y : Math.sin(autoRotate * 0.015) * 8;

  return (
    <div className="relative w-full bg-slate-950 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.08)]">
      <div
        ref={cardRef}
        className="relative w-full py-8 px-4 flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px', minHeight: '520px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); setTilt({ x: 0, y: 0 }); }}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => { setIsHovering(false); setTilt({ x: 0, y: 0 }); }}
      >
        {/* Luzes de fundo dinâmicas */}
        <div
          className="absolute w-80 h-80 rounded-full blur-[100px] transition-all duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
            top: `${40 + rotX * 1.5}%`,
            left: `${35 + rotY * 1.5}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          className="absolute w-60 h-60 rounded-full blur-[80px] transition-all duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            top: `${60 - rotX}%`,
            right: `${20 - rotY}%`,
            transform: 'translate(50%, -50%)',
          }}
        />

        {/* Card 3D com a foto real do equipamento */}
        <div
          className="relative w-full max-w-md transition-transform duration-200 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          }}
        >
          {/* Sombra dinâmica */}
          <div
            className="absolute inset-0 rounded-3xl transition-all duration-200"
            style={{
              background: 'rgba(0,0,0,0.6)',
              filter: 'blur(40px)',
              transform: `translateZ(-60px) translateX(${rotY * 2}px) translateY(${-rotX * 2 + 20}px) scale(0.9)`,
            }}
          />

          {/* Container da imagem com brilho e reflexo */}
          <div
            className="relative rounded-3xl overflow-hidden border border-white/10"
            style={{ transform: 'translateZ(0px)' }}
          >
            <img
              src={images.hifuEquipamentoDois}
              alt="Equipamento Ultramed HIFU"
              className="w-full h-auto block"
              draggable="false"
            />

            {/* Reflexo de vidro que acompanha o mouse */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-300"
              style={{
                background: `linear-gradient(${135 + rotY * 2}deg, rgba(255,255,255,${isHovering ? 0.08 : 0.03}) 0%, transparent 50%, rgba(6,182,212,${isHovering ? 0.05 : 0.02}) 100%)`,
              }}
            />

            {/* Brilho de borda */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                boxShadow: `inset 0 0 40px rgba(6,182,212,${isHovering ? 0.15 : 0.05})`,
              }}
            />

            {/* Hotspots sobre a imagem */}
            {HOTSPOTS.map((hs) => (
              <div key={hs.id} className="absolute" style={hs.position}>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveHotspot(activeHotspot === hs.id ? null : hs.id); }}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                    activeHotspot === hs.id
                      ? 'bg-cyan-500 text-slate-950 scale-125 shadow-[0_0_25px_rgba(6,182,212,0.7)]'
                      : 'bg-slate-900/70 text-cyan-400 border border-cyan-400/40 hover:bg-cyan-500 hover:text-slate-950 hover:scale-110'
                  }`}
                >
                  <hs.Icon size={16} />
                  {activeHotspot !== hs.id && (
                    <span className="absolute inset-0 rounded-full border-2 border-cyan-400/60 animate-ping" />
                  )}
                </button>

                {/* Tooltip */}
                <div
                  className={`absolute z-30 bottom-14 left-1/2 -translate-x-1/2 w-72 bg-slate-900/95 border border-cyan-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
                    activeHotspot === hs.id
                      ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                      : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <hs.Icon size={16} className="text-cyan-400" />
                    <h4 className="font-bold text-white text-sm">{hs.title}</h4>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{hs.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Badge flutuante */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs px-5 py-2 rounded-full shadow-lg shadow-cyan-500/30 whitespace-nowrap"
            style={{ transform: `translateX(-50%) translateZ(30px)` }}
          >
            ULTRAMED HIFU — Certificado ANVISA
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="absolute top-5 left-5 flex items-center gap-2.5 rounded-full bg-slate-900/60 border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-md pointer-events-none z-20">
        <Rotate3d size={16} className="text-cyan-400 animate-spin-slow" />
        Mova o mouse para girar
      </div>

      {/* Fechar hotspot ao clicar fora */}
      {activeHotspot && (
        <div className="absolute inset-0 z-10" onClick={() => setActiveHotspot(null)} />
      )}
    </div>
  );
};

export default HifuDeviceViewer3d;
