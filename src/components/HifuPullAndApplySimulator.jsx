import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RotateCcw, AlertCircle, Zap } from 'lucide-react';

const CARTRIDGES = [
  {
    id: 'c15',
    name: 'Cartucho 1.5mm',
    depth: '1.5mm',
    target: 'Derme Superficial',
    color: '#06b6d4', // Cyan
    description: 'Melhora a flacidez superficial, suaviza rugas finas na testa e ao redor dos olhos, e uniformiza a textura da pele.',
    energyRange: '0.1J - 0.4J',
  },
  {
    id: 'c30',
    name: 'Cartucho 3.0mm',
    depth: '3.0mm',
    target: 'Derme Profunda',
    color: '#10b981', // Emerald
    description: 'Estimula a neocolagênese na derme profunda, promovendo sustentação, densidade e firmeza estrutural na pele.',
    energyRange: '0.4J - 0.8J',
  },
  {
    id: 'c45',
    name: 'Cartucho 4.5mm',
    depth: '4.5mm',
    target: 'SMAS (Fáscia Muscular)',
    color: '#f59e0b', // Gold/Amber
    description: 'Atinge a fáscia muscular (SMAS), promovendo a contração profunda e efeito lifting imediato na bochecha e papada.',
    energyRange: '0.8J - 1.2J',
  }
];

const FACE_ZONES = [
  { id: 'forehead', name: 'Testa & Sobrancelhas', recommended: 'c15', cx: 160, cy: 90, r: 28, text: 'Testa' },
  { id: 'cheeks', name: 'Bochechas & Contorno', recommended: 'c30', cx: 110, cy: 175, r: 35, text: 'Bochechas' },
  { id: 'jawline', name: 'Mandíbula & Sustentação', recommended: 'c45', cx: 125, cy: 235, r: 30, text: 'Mandíbula' },
  { id: 'doublechin', name: 'Papada & Contorno', recommended: 'c45', cx: 170, cy: 275, r: 25, text: 'Papada' },
  { id: 'neck', name: 'Pescoço & Flacidez', recommended: 'c30', cx: 210, cy: 305, r: 25, text: 'Pescoço' }
];

const HifuPullAndApplySimulator = () => {
  const [selectedCartridge, setSelectedCartridge] = useState(CARTRIDGES[2]); // Default 4.5mm
  const [shotCounts, setShotCounts] = useState({
    forehead: 0,
    cheeks: 0,
    jawline: 0,
    doublechin: 0,
    neck: 0,
  });
  const [activeZone, setActiveZone] = useState('doublechin');
  const [isFiring, setIsFiring] = useState(false);
  const [feedback, setFeedback] = useState('Selecione o cartucho de 4.5mm e aplique na Papada ou Mandíbula para ver o lifting.');

  const skinCanvasRef = useRef(null);
  const animationRef = useRef(null);

  // Sintetizador de áudio nativo usando Web Audio API
  const playSound = (type) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      if (type === 'charge') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'fire') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (err) {
      console.log('Audio Context blocked or not supported', err);
    }
  };

  // Renderiza e anima o corte transversal da pele no canvas
  useEffect(() => {
    const canvas = skinCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let progress = 0;
    let particles = [];
    let tcpPoints = []; // pontos de coagulação térmica adicionados

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // 1. Desenhar Camadas da Pele
      // Epiderme (0 a 30px)
      ctx.fillStyle = '#fde8d7';
      ctx.fillRect(0, 0, w, 35);
      ctx.fillStyle = '#7c4a2d';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('EPIDERME', 10, 22);

      // Derme Superficial (35 a 90px)
      ctx.fillStyle = '#f8cfb0';
      ctx.fillRect(0, 35, w, 55);
      ctx.fillStyle = '#7c4a2d';
      ctx.fillText('DERME SUPERFICIAL (1.5mm)', 10, 65);

      // Derme Profunda (90 a 150px)
      ctx.fillStyle = '#f3b890';
      ctx.fillRect(0, 90, w, 60);
      ctx.fillStyle = '#7c4a2d';
      ctx.fillText('DERME PROFUNDA (3.0mm)', 10, 125);

      // SMAS (150 a 180px)
      ctx.fillStyle = '#e59d72';
      ctx.fillRect(0, 150, w, 30);
      ctx.fillStyle = '#5c2d15';
      ctx.fillText('SMAS - FÁSCIA MUSCULAR (4.5mm)', 10, 170);

      // Músculo (180 a 240px)
      ctx.fillStyle = '#c56b57';
      ctx.fillRect(0, 180, w, h - 180);
      ctx.fillStyle = '#ffdfd9';
      ctx.fillText('MÚSCULO', 10, 215);

      // Linhas divisórias das camadas
      ctx.strokeStyle = 'rgba(92, 45, 21, 0.15)';
      ctx.lineWidth = 1;
      [35, 90, 150, 180].forEach(y => {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      });

      // 2. Definir Profundidade de Foco da Ponteira Equipada
      let focusY = 65; // 1.5mm
      if (selectedCartridge.id === 'c30') focusY = 120; // 3.0mm
      if (selectedCartridge.id === 'c45') focusY = 165; // 4.5mm

      // 3. Desenhar transdutor (ponteira do HIFU) no topo
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(w / 2 - 25, 0, 50, 10);
      ctx.fillStyle = selectedCartridge.color;
      ctx.fillRect(w / 2 - 15, 10, 30, 4);

      // 4. Desenhar Disparo / Animação de Ondas de Ultrassom focadas
      if (isFiring) {
        progress += 0.05;
        if (progress > 1) {
          // Conclusão do disparo
          setIsFiring(false);
          playSound('fire');
          // Adiciona ponto focal definitivo
          tcpPoints.push({ x: w / 2 + (Math.random() * 40 - 20), y: focusY });
          // Gera partículas de colágeno
          for (let k = 0; k < 12; k++) {
            particles.push({
              x: w / 2,
              y: focusY,
              vx: Math.random() * 2 - 1,
              vy: -Math.random() * 1.5 - 0.5,
              alpha: 1,
              color: selectedCartridge.color
            });
          }
          progress = 0;
        } else {
          // Desenha feixes de ultrassom convergentes (linhas sônicas)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(Date.now() * 0.02) * 0.2})`;
          ctx.lineWidth = 1.5;
          
          // Efeito de cone
          ctx.beginPath();
          ctx.moveTo(w / 2 - 15, 14);
          ctx.lineTo(w / 2, focusY);
          ctx.lineTo(w / 2 + 15, 14);
          ctx.stroke();

          // Ondas arqueadas descendo
          ctx.strokeStyle = `${selectedCartridge.color}`;
          for (let r = 1; r <= 4; r++) {
            const currentR = r * 0.25 * progress * (focusY - 14) + 14;
            if (currentR < focusY) {
              const widthRatio = (focusY - currentR) / (focusY - 14);
              ctx.beginPath();
              ctx.arc(w / 2, 14 + (currentR - 14) * 0.9, 15 * widthRatio, 0, Math.PI);
              ctx.stroke();
            }
          }

          // Ponto focal carregando
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(w / 2, focusY, 4 + progress * 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Desenhar Pontos de Coagulação Térmica (TCPs) acumulados
      tcpPoints.forEach(pt => {
        ctx.fillStyle = '#ef4444'; // Vermelho quente
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Efeito de brilho de calor residual
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6 + Math.sin(Date.now() * 0.01) * 2, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 6. Atualizar e Desenhar Partículas de Colágeno
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;
        if (p.alpha <= 0) {
          particles.splice(idx, 1);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isFiring, selectedCartridge]);

  // Função para executar o disparo de HIFU
  const handleFireShot = (zoneId) => {
    if (isFiring) return;

    const zone = FACE_ZONES.find(z => z.id === zoneId);
    if (!zone) return;

    setActiveZone(zoneId);
    setIsFiring(true);
    playSound('charge');

    // Valida se o cartucho é o recomendado
    let correct = selectedCartridge.id === zone.recommended;
    let feedbackText = '';

    const newCounts = { ...shotCounts };
    newCounts[zoneId] = Math.min(newCounts[zoneId] + 5, 50);
    setShotCounts(newCounts);

    if (correct) {
      feedbackText = `Sucesso! Disparando ${selectedCartridge.name} na ${zone.name}. A profundidade de ${selectedCartridge.depth} é perfeita para tratar ${selectedCartridge.target}.`;
      if (newCounts[zoneId] >= 50) {
        feedbackText += ` área 100% tratada! Rejuvenescimento completo ativado nesta região.`;
      }
    } else {
      const recCartridge = CARTRIDGES.find(c => c.id === zone.recommended);
      feedbackText = `Atenção: Cartucho ${selectedCartridge.name} aplicado na ${zone.name}. Recomenda-se o cartucho de ${recCartridge.depth} (${recCartridge.target}) para melhor eficácia e segurança.`;
    }

    setFeedback(feedbackText);
  };

  const handleReset = () => {
    setShotCounts({
      forehead: 0,
      cheeks: 0,
      jawline: 0,
      doublechin: 0,
      neck: 0,
    });
    setFeedback('Simulador reiniciado. Selecione um cartucho e aplique em qualquer área.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/60 rounded-3xl p-6 md:p-8 border border-white/10 backdrop-blur-md">
      
      {/* 1. Coluna da Esquerda: Escolha de Ponteiras e Parâmetros (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={13} className="animate-pulse" />
            Configuração de Ponteiras
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Selecione o Cartucho</h3>
          <p className="text-slate-400 text-sm mb-6">
            Cada cartucho foca o ultrassom em uma camada específica. Selecione um para acoplar à manopla de locação.
          </p>

          {/* Lista de Ponteiras */}
          <div className="flex flex-col gap-3">
            {CARTRIDGES.map((cart) => {
              const isSelected = selectedCartridge.id === cart.id;
              return (
                <button
                  key={cart.id}
                  onClick={() => {
                    setSelectedCartridge(cart);
                    setFeedback(`Cartucho de ${cart.depth} equipado. Escolha uma área do rosto para testar a aplicação.`);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-slate-800/80 border-cyan-500/60 shadow-lg shadow-cyan-500/5'
                      : 'bg-slate-950/40 border-white/5 hover:bg-slate-950/80 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-base flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cart.color }}></span>
                      {cart.name}
                    </span>
                    <span 
                      className="text-xs font-bold px-2 py-0.5 rounded border"
                      style={{ 
                        color: cart.color, 
                        borderColor: `${cart.color}30`, 
                        backgroundColor: `${cart.color}08` 
                      }}
                    >
                      {cart.depth}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{cart.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Informações técnicas adicionais */}
        <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Ponteira Acoplada:</span>
            <strong className="text-white">{selectedCartridge.name} ({selectedCartridge.depth})</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Camada Alvo:</span>
            <strong style={{ color: selectedCartridge.color }}>{selectedCartridge.target}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Energia Sugerida:</span>
            <strong className="text-white">{selectedCartridge.energyRange}</strong>
          </div>
        </div>
      </div>

      {/* 2. Coluna do Meio: O Rosto Interativo (3 cols) */}
      <div className="lg:col-span-3 flex flex-col items-center justify-center bg-slate-950/40 border border-white/5 rounded-3xl p-4">
        <h4 className="text-sm font-bold text-slate-300 text-center mb-4">Selecione a Área Clínica</h4>
        
        {/* Rosto SVG Interativo */}
        <div className="relative w-full max-w-[240px] aspect-[4/5] bg-slate-900/40 rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center">
          
          {/* Gráfico do Rosto de Perfil Simplificado */}
          <svg viewBox="0 0 320 400" className="w-full h-full select-none opacity-85">
            <defs>
              <linearGradient id="faceGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
            {/* Silhueta da Cabeça de Perfil */}
            <path
              d="M 120 60 C 180 60, 220 80, 220 120 C 220 130, 230 145, 235 155 C 240 165, 245 170, 245 178 C 245 185, 235 190, 230 195 C 220 205, 218 215, 215 220 C 210 230, 205 240, 200 245 C 190 255, 175 265, 160 275 C 150 280, 140 285, 135 295 C 130 305, 125 320, 125 330 L 190 350 L 220 330 L 220 380 L 100 380 L 100 280 C 100 280, 95 190, 95 160 C 95 130, 100 80, 120 60 Z"
              fill="url(#faceGrad)"
              stroke="#475569"
              strokeWidth="2"
            />
            {/* Desenho do olho/boca simplificado */}
            <path d="M 215 150 C 218 152, 220 152, 223 150" stroke="#64748b" strokeWidth="2" fill="none" />
            <path d="M 212 185 C 215 187, 220 187, 222 185" stroke="#64748b" strokeWidth="2" fill="none" />
          </svg>

          {/* Hotspots das Zonas de Tratamento */}
          {FACE_ZONES.map((zone) => {
            const progressVal = shotCounts[zone.id];
            const isCompleted = progressVal >= 50;
            const recCart = CARTRIDGES.find(c => c.id === zone.recommended);
            const isTargeted = activeZone === zone.id;

            return (
              <button
                key={zone.id}
                onClick={() => handleFireShot(zone.id)}
                className={`absolute rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 hover:bg-emerald-500/30'
                    : isTargeted
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 scale-105 shadow-md shadow-cyan-400/20'
                    : 'bg-slate-950/70 border-white/10 text-slate-300 hover:border-cyan-400/50 hover:bg-slate-900/90'
                }`}
                style={{
                  top: `${(zone.cy / 400) * 100}%`,
                  left: `${(zone.cx / 320) * 100}%`,
                  width: `${zone.r * 2}px`,
                  height: `${zone.r * 2}px`,
                }}
                title={`Clique para aplicar na área: ${zone.name}. Recomendado: ${recCart.depth}`}
              >
                <div className="text-center p-1 leading-tight select-none">
                  <div className="truncate font-semibold">{zone.text}</div>
                  <div className="text-[8px] opacity-75">{progressVal}/50</div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleReset}
          className="mt-4 flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw size={13} />
          Resetar Simulador
        </button>
      </div>

      {/* 3. Coluna da Direita: Corte Transversal da Pele & Feedback (4 cols) */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-6 pt-6 lg:pt-0">
        
        {/* Canvas da Pele */}
        <div>
          <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-400" />
            Corte Transversal da Pele (Ao Vivo)
          </h4>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-inner">
            <canvas
              ref={skinCanvasRef}
              width={280}
              height={240}
              className="w-full h-auto block"
            />
            {isFiring && (
              <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none animate-pulse-soft" />
            )}
          </div>
        </div>

        {/* Caixa de Feedback e Instruções */}
        <div className="flex-1 flex flex-col justify-end">
          <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-4 mt-4">
            <div className="flex gap-2 items-start text-xs leading-relaxed">
              <AlertCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-white block">Instruções do Especialista:</strong>
                <p className="text-slate-300">{feedback}</p>
              </div>
            </div>
            
            {/* Progresso de Tratamento Global */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                <span>Dose Total Aplicada</span>
                <span>
                  {Object.values(shotCounts).reduce((a, b) => a + b, 0)} / 250 disparos
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min((Object.values(shotCounts).reduce((a, b) => a + b, 0) / 250) * 100, 100)}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default HifuPullAndApplySimulator;
