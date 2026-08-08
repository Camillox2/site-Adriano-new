import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, RotateCcw, Zap, Hand, CheckCircle2, ChevronRight } from 'lucide-react';
import { images } from '../assets/index';

const CARTRIDGES = [
  {
    id: 'c15',
    name: '1.5mm',
    fullName: 'Cartucho 1.5mm',
    target: 'Derme Superficial',
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.4)',
    description: 'Suaviza rugas finas, uniformiza textura e melhora poros.',
    energyRange: '0.1J – 0.4J',
  },
  {
    id: 'c30',
    name: '3.0mm',
    fullName: 'Cartucho 3.0mm',
    target: 'Derme Profunda',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.4)',
    description: 'Estimula neocolagênese, devolve densidade e firmeza.',
    energyRange: '0.4J – 0.8J',
  },
  {
    id: 'c45',
    name: '4.5mm',
    fullName: 'Cartucho 4.5mm',
    target: 'SMAS (Fáscia)',
    color: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.4)',
    description: 'Contração muscular profunda, lifting imediato.',
    energyRange: '0.8J – 1.2J',
  },
];

const HifuPullAndApplySimulator = () => {
  const [selectedCartridge, setSelectedCartridge] = useState(CARTRIDGES[2]);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [shots, setShots] = useState(0);
  const [isFiring, setIsFiring] = useState(false);
  const [particles, setParticles] = useState([]);
  const sliderRef = useRef(null);

  // Áudio
  const playSound = useCallback((type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'fire') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.15);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (err) { /* silencioso */ }
  }, []);

  // Disparo via clique na foto
  const handleFire = useCallback(() => {
    if (isFiring) return;
    setIsFiring(true);
    playSound('fire');

    // Gera partículas de energia
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      color: selectedCartridge.color,
      delay: Math.random() * 300,
    }));
    setParticles(newParticles);

    setShots(prev => Math.min(prev + 1, 10));

    // Revela mais do "depois" a cada disparo
    setSliderPos(prev => {
      const newPos = Math.max(prev - 5, 0);
      return newPos;
    });

    setTimeout(() => {
      setIsFiring(false);
      setParticles([]);
    }, 1200);
  }, [isFiring, playSound, selectedCartridge]);

  // Slider drag para before/after
  const handleSliderStart = useCallback((e) => {
    e.preventDefault();
    setIsDraggingSlider(true);
  }, []);

  const handleSliderMove = useCallback((e) => {
    if (!isDraggingSlider || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, x)));
  }, [isDraggingSlider]);

  const handleSliderEnd = useCallback(() => {
    setIsDraggingSlider(false);
  }, []);

  useEffect(() => {
    if (isDraggingSlider) {
      window.addEventListener('mousemove', handleSliderMove);
      window.addEventListener('mouseup', handleSliderEnd);
      window.addEventListener('touchmove', handleSliderMove);
      window.addEventListener('touchend', handleSliderEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleSliderMove);
      window.removeEventListener('mouseup', handleSliderEnd);
      window.removeEventListener('touchmove', handleSliderMove);
      window.removeEventListener('touchend', handleSliderEnd);
    };
  }, [isDraggingSlider, handleSliderMove, handleSliderEnd]);

  const progress = (shots / 10) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/60 rounded-[2rem] p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">

      {/* Glow global */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{ background: `radial-gradient(circle at 50% 50%, ${selectedCartridge.glowColor.replace('0.4', '0.08')} 0%, transparent 70%)` }}
      />

      {/* 1. Ponteiras (Esquerda) */}
      <div className="lg:col-span-3 flex flex-col gap-5 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={13} className="animate-pulse" />
            Ponteiras
          </span>
          <h3 className="text-xl font-bold text-white mb-2">Selecione o Cartucho</h3>
          <p className="text-slate-400 text-xs mb-5">
            Cada ponteira foca o ultrassom em uma profundidade. Selecione e clique no rosto para disparar.
          </p>

          <div className="flex flex-col gap-2.5">
            {CARTRIDGES.map((cart) => {
              const isActive = selectedCartridge.id === cart.id;
              return (
                <button
                  key={cart.id}
                  onClick={() => setSelectedCartridge(cart)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-slate-800/80 shadow-lg'
                      : 'bg-slate-950/60 border-white/5 hover:bg-slate-950/80'
                  }`}
                  style={{
                    borderColor: isActive ? `${cart.color}50` : undefined,
                    boxShadow: isActive ? `0 0 20px ${cart.color}15` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cart.color, boxShadow: isActive ? `0 0 8px ${cart.color}` : 'none' }} />
                      {cart.fullName}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border"
                      style={{ color: cart.color, borderColor: `${cart.color}30`, backgroundColor: `${cart.color}08` }}
                    >
                      {cart.target}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{cart.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 text-xs space-y-2 mt-auto">
          <div className="flex justify-between">
            <span className="text-slate-400">Ponteira:</span>
            <strong style={{ color: selectedCartridge.color }}>{selectedCartridge.fullName}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Energia:</span>
            <strong className="text-white">{selectedCartridge.energyRange}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Disparos:</span>
            <strong className="text-white">{shots} / 10</strong>
          </div>
        </div>
      </div>

      {/* 2. Comparador Before/After com Slider (Centro) */}
      <div className="lg:col-span-6 flex flex-col items-center justify-center relative z-10">
        <h4 className="text-sm font-bold text-slate-300 text-center mb-4 flex items-center gap-2">
          <Hand size={14} className="text-cyan-400" />
          Clique no rosto para disparar · Arraste a barra para comparar
        </h4>

        <div
          ref={sliderRef}
          className="relative w-full max-w-lg aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl cursor-crosshair select-none group"
          onClick={handleFire}
        >
          {/* Imagem DEPOIS (fundo completo) */}
          <img
            src={images.faceAfter}
            alt="Após Tratamento HIFU"
            className="absolute inset-0 w-full h-full object-cover"
            draggable="false"
          />

          {/* Imagem ANTES (clipped pelo slider) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={images.faceBefore}
              alt="Antes do Tratamento HIFU"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: `${(100 / sliderPos) * 100}%`, maxWidth: 'none' }}
              draggable="false"
            />
          </div>

          {/* Linha do Slider */}
          <div
            className="absolute top-0 bottom-0 z-20"
            style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-[3px] h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize"
              onMouseDown={handleSliderStart}
              onTouchStart={handleSliderStart}
              onClick={(e) => e.stopPropagation()}
            >
              <ChevronRight size={14} className="text-slate-700 -mr-0.5" />
              <ChevronRight size={14} className="text-slate-700 rotate-180 -ml-0.5" />
            </div>
          </div>

          {/* Labels ANTES / DEPOIS */}
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 pointer-events-none z-10">
            ANTES
          </div>
          <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-400/30 pointer-events-none z-10">
            DEPOIS
          </div>

          {/* VFX: Partículas de energia ao disparar */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute w-2 h-2 rounded-full animate-ping pointer-events-none z-30"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                backgroundColor: p.color,
                boxShadow: `0 0 12px ${p.color}`,
                animationDelay: `${p.delay}ms`,
                animationDuration: '800ms',
              }}
            />
          ))}

          {/* VFX: Flash de energia */}
          {isFiring && (
            <>
              <div
                className="absolute inset-0 pointer-events-none z-20 animate-pulse"
                style={{ background: `radial-gradient(circle at 50% 50%, ${selectedCartridge.glowColor} 0%, transparent 60%)` }}
              />
              {/* Ondas sonoras concêntricas */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="absolute rounded-full border-2 animate-ping"
                    style={{
                      width: `${60 + i * 40}px`,
                      height: `${60 + i * 40}px`,
                      borderColor: selectedCartridge.color,
                      opacity: 0.3 - i * 0.08,
                      animationDelay: `${i * 150}ms`,
                      animationDuration: '1s',
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Mira/Crosshair sutil */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-white/60" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-white/60" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-[2px] bg-white/60" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-3 h-[2px] bg-white/60" />
              <div className="absolute inset-2 rounded-full border border-white/40" />
            </div>
          </div>

          {/* Tratamento completo */}
          {shots >= 10 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm pointer-events-none">
              <div className="bg-emerald-500 text-white font-bold px-6 py-3 rounded-full shadow-2xl shadow-emerald-500/40 flex items-center gap-2 text-sm">
                <CheckCircle2 size={18} />
                Lifting Completo!
              </div>
            </div>
          )}
        </div>

        {/* Reset */}
        <button
          onClick={() => { setShots(0); setSliderPos(50); }}
          className="mt-5 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw size={13} />
          Resetar Simulação
        </button>
      </div>

      {/* 3. Informações e Progresso (Direita) */}
      <div className="lg:col-span-3 flex flex-col justify-between gap-6 relative z-10">

        {/* Diagrama de Corte Simplificado */}
        <div>
          <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-400" />
            Camadas da Pele
          </h4>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-inner">
            <div className="relative">
              {/* Epiderme */}
              <div className="h-6 bg-amber-100 flex items-center px-3">
                <span className="text-[9px] font-bold text-amber-900">EPIDERME</span>
              </div>
              {/* 1.5mm */}
              <div className={`h-10 flex items-center px-3 transition-all duration-500 ${selectedCartridge.id === 'c15' ? 'bg-cyan-500/30 ring-1 ring-cyan-400/50' : 'bg-amber-200/80'}`}>
                <span className="text-[9px] font-bold" style={{ color: selectedCartridge.id === 'c15' ? '#06b6d4' : '#92400e' }}>
                  DERME SUPERFICIAL — 1.5mm {selectedCartridge.id === 'c15' && '◀ ALVO'}
                </span>
              </div>
              {/* 3.0mm */}
              <div className={`h-12 flex items-center px-3 transition-all duration-500 ${selectedCartridge.id === 'c30' ? 'bg-emerald-500/30 ring-1 ring-emerald-400/50' : 'bg-orange-200/80'}`}>
                <span className="text-[9px] font-bold" style={{ color: selectedCartridge.id === 'c30' ? '#10b981' : '#78350f' }}>
                  DERME PROFUNDA — 3.0mm {selectedCartridge.id === 'c30' && '◀ ALVO'}
                </span>
              </div>
              {/* 4.5mm SMAS */}
              <div className={`h-8 flex items-center px-3 transition-all duration-500 ${selectedCartridge.id === 'c45' ? 'bg-amber-500/30 ring-1 ring-amber-400/50' : 'bg-orange-300/80'}`}>
                <span className="text-[9px] font-bold" style={{ color: selectedCartridge.id === 'c45' ? '#f59e0b' : '#451a03' }}>
                  SMAS — 4.5mm {selectedCartridge.id === 'c45' && '◀ ALVO'}
                </span>
              </div>
              {/* Músculo */}
              <div className="h-8 bg-red-300/80 flex items-center px-3">
                <span className="text-[9px] font-bold text-red-900">MÚSCULO</span>
              </div>

              {/* Indicador animado de profundidade */}
              {isFiring && (
                <div
                  className="absolute right-3 w-1 rounded-full animate-pulse"
                  style={{
                    backgroundColor: selectedCartridge.color,
                    boxShadow: `0 0 8px ${selectedCartridge.color}`,
                    top: selectedCartridge.id === 'c15' ? '24px' : selectedCartridge.id === 'c30' ? '42px' : '62px',
                    height: '12px',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Progresso */}
        <div className={`border rounded-2xl p-5 transition-all duration-500 ${
          shots >= 10 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-950/80 border-white/10'
        }`}>
          <div className="flex items-start gap-3 text-sm mb-4">
            {shots >= 10 ? (
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <Zap size={18} className="shrink-0 mt-0.5" style={{ color: selectedCartridge.color }} />
            )}
            <div>
              <strong className="text-white block mb-1">
                {shots >= 10 ? 'Tratamento Concluído!' : 'Simulação em Andamento'}
              </strong>
              <p className="text-slate-400 text-xs leading-relaxed">
                {shots >= 10
                  ? 'Arraste a barra no centro para comparar o antes e depois. O efeito lifting é visível imediatamente.'
                  : `Selecione a ponteira de ${selectedCartridge.name} e clique no rosto para aplicar disparos de ultrassom microfocado.`
                }
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5">
            <div className="flex justify-between text-xs text-slate-400 font-bold mb-2">
              <span>Progresso do Lifting</span>
              <span style={{ color: shots >= 10 ? '#10b981' : selectedCartridge.color }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${selectedCartridge.color}, ${shots >= 10 ? '#10b981' : selectedCartridge.color})`,
                  boxShadow: `0 0 10px ${selectedCartridge.color}40`,
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HifuPullAndApplySimulator;
