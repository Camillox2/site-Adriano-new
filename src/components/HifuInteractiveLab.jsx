import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
Box,
ChevronLeft,
ChevronRight,
Move3D,
Rotate3D,
ScanLine,
Sparkles,
Zap,
} from 'lucide-react';
import { images } from '../assets';
const CARTRIDGES = [
{
id: '1.5',
label: '1,5 mm',
short: 'Superficial',
layer: 'Derme superficial',
area: 'face',
color: '#38bdf8',
focus: 28,
description: 'Demonstração visual da atuação em uma camada mais superficial da pele.',
},
{
id: '3.0',
label: '3,0 mm',
short: 'Profunda',
layer: 'Derme profunda',
area: 'face',
color: '#2563eb',
focus: 47,
description: 'Representa o foco em uma camada dérmica mais profunda.',
},
{
id: '4.5',
label: '4,5 mm',
short: 'SMAS',
layer: 'Plano SMAS',
area: 'face',
color: '#7c3aed',
focus: 66,
description: 'Representa a concentração de energia no plano SMAS facial.',
},
{
id: '8.0',
label: '8,0 mm',
short: 'Corporal',
layer: 'Plano corporal superficial',
area: 'body',
color: '#db2777',
focus: 78,
description: 'Simulação de uma profundidade corporal mais superficial.',
},
{
id: '13.0',
label: '13,0 mm',
short: 'Corporal +',
layer: 'Plano corporal profundo',
area: 'body',
color: '#ea580c',
focus: 90,
description: 'Simulação visual de uma atuação corporal mais profunda.',
},
];
const Equipment360 = () => {
const [rotation, setRotation] = useState(-18);
const [dragging, setDragging] = useState(false);
const startX = useRef(0);
const startRotation = useRef(0);
const onPointerDown = (event) => {
setDragging(true);
startX.current = event.clientX;
startRotation.current = rotation;
event.currentTarget.setPointerCapture?.(event.pointerId);
};
const onPointerMove = (event) => {
if (!dragging) return;
setRotation(startRotation.current + (event.clientX - startX.current) * 0.55);
};
const endDrag = (event) => {
setDragging(false);
event.currentTarget.releasePointerCapture?.(event.pointerId);
};
return (
<div className="rounded-[2rem] border border-white/10 bg-slate-950 p-4 sm:p-6 shadow-2xl overflow-hidden">
<div className="flex flex-wrap items-center justify-between gap-3 mb-4">
<div>
<span className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.2em]">
<Box size={15} aria-hidden="true" />
Visualizador 360°
</span>
<h3 className="text-white text-xl sm:text-2xl font-bold mt-1">Explore o equipamento</h3>
</div>
<div className="flex items-center gap-2">
<button
type="button"
onClick={() => setRotation((value) => value - 35)}
className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
aria-label="Girar equipamento para a esquerda"
>
<ChevronLeft size={20} />
</button>
<button
type="button"
onClick={() => setRotation((value) => value + 35)}
className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
aria-label="Girar equipamento para a direita"
>
<ChevronRight size={20} />
</button>
</div>
</div>
<div
className={`h-[25rem] sm:h-[31rem] relative select-none touch-none rounded-3xl overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.18),transparent_45%)] ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
style={{ perspective: '1200px' }}
onPointerDown={onPointerDown}
onPointerMove={onPointerMove}
onPointerUp={endDrag}
onPointerCancel={endDrag}
role="application"
aria-label="Modelo tridimensional ilustrativo do equipamento HIFU. Arraste horizontalmente para girar."
>
<div className="absolute inset-x-8 bottom-8 h-8 bg-cyan-400/20 blur-2xl rounded-full" aria-hidden="true"></div>
<div
className="absolute left-1/2 top-1/2 w-56 sm:w-64 h-[22rem] sm:h-[27rem] transition-transform duration-200 ease-out"
style={{
transform: `translate(-50%, -50%) rotateX(-5deg) rotateY(${rotation}deg)`,
transformStyle: 'preserve-3d',
}}
>
<div
className="absolute inset-0 rounded-[2.1rem] bg-gradient-to-br from-slate-50 via-slate-200 to-slate-400 border border-white/70 shadow-2xl"
style={{ transform: 'translateZ(42px)' }}
>
<div className="absolute inset-x-5 top-7 h-28 rounded-2xl bg-slate-950 border border-cyan-400/30 shadow-inner overflow-hidden">
<div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.22),transparent_35%)]"></div>
<div className="relative p-4">
<p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300">Ultramed HIFU</p>
<div className="grid grid-cols-3 gap-2 mt-3">
{[64, 82, 48].map((value) => (
<div key={value} className="rounded-lg bg-white/5 p-2">
<span className="block h-1.5 rounded-full bg-cyan-400/70" style={{ width: `${value}%` }}></span>
<span className="block h-1 rounded-full bg-white/20 mt-2"></span>
</div>
))}
</div>
</div>
</div>
<div className="absolute left-7 right-7 top-44 h-px bg-slate-300"></div>
<div className="absolute left-7 top-48 right-7 grid grid-cols-2 gap-3">
<div className="h-16 rounded-xl bg-white/65 border border-white shadow-inner"></div>
<div className="h-16 rounded-xl bg-white/65 border border-white shadow-inner"></div>
</div>
<div className="absolute left-1/2 -translate-x-1/2 bottom-7 w-20 h-20 rounded-full border-[9px] border-slate-300 bg-slate-700 shadow-inner">
<div className="absolute inset-3 rounded-full bg-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.7)]"></div>
</div>
</div>
<div
className="absolute top-3 bottom-3 w-[84px] right-[-42px] rounded-r-[2rem] bg-gradient-to-r from-slate-400 to-slate-600 border border-slate-300"
style={{ transform: 'rotateY(90deg)', transformOrigin: 'left center' }}
>
<div className="absolute top-16 left-5 w-10 h-32 rounded-full bg-slate-700/60"></div>
</div>
<div
className="absolute top-3 bottom-3 w-[84px] left-[-42px] rounded-l-[2rem] bg-gradient-to-l from-slate-300 to-slate-500 border border-slate-300"
style={{ transform: 'rotateY(-90deg)', transformOrigin: 'right center' }}
></div>
<div
className="absolute inset-0 rounded-[2rem] bg-slate-500 border border-slate-400"
style={{ transform: 'translateZ(-42px) rotateY(180deg)' }}
>
<div className="absolute inset-x-9 top-12 h-24 rounded-2xl bg-slate-700/70 grid grid-cols-4 gap-2 p-4">
{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
<span key={item} className="rounded-full bg-slate-500"></span>
))}
</div>
<div className="absolute inset-x-9 bottom-12 h-24 rounded-xl border border-slate-300/30"></div>
</div>
<div
className="absolute left-3 right-3 top-[-42px] h-[84px] rounded-t-[2rem] bg-slate-100"
style={{ transform: 'rotateX(90deg)', transformOrigin: 'bottom center' }}
></div>
<div
className="absolute -right-20 top-28 w-28 h-48"
style={{ transform: 'translateZ(58px)' }}
>
<div className="absolute left-2 top-0 w-9 h-32 rounded-full bg-gradient-to-b from-white to-slate-400 border border-white shadow-xl rotate-6"></div>
<div className="absolute left-0 top-24 w-14 h-14 rounded-xl bg-slate-200 border border-white rotate-6"></div>
<div className="absolute left-9 top-3 w-20 h-28 border-t-2 border-r-2 border-cyan-300/40 rounded-tr-[3rem]"></div>
</div>
</div>
<div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center gap-2 rounded-full bg-slate-900/80 border border-white/10 px-4 py-2 text-xs text-slate-300 backdrop-blur">
<Rotate3D size={16} className="text-cyan-300" aria-hidden="true" />
Arraste para girar em 360°
</div>
</div>
<p className="text-[11px] text-slate-500 mt-3 text-center">
Representação tridimensional ilustrativa baseada no equipamento real. Consulte fotos e vídeos para detalhes físicos.
</p>
</div>
);
};
const TreatmentSurface = ({ area, firing, handpiece, onPointerDown, onPointerMove, onPointerUp, containerRef }) => (
<div ref={containerRef} className="relative h-[23rem] sm:h-[29rem] overflow-hidden rounded-3xl bg-gradient-to-b from-slate-100 to-slate-200 border border-white shadow-inner touch-none">
<div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_25%,white,transparent_42%)]"></div>
{area === 'face' ? (
<div className="absolute left-1/2 top-7 -translate-x-1/2 w-52 sm:w-64 h-[19rem] sm:h-[24rem] rounded-[48%_48%_44%_44%/38%_38%_60%_60%] bg-gradient-to-br from-[#f8d5c4] via-[#eabda7] to-[#c98d77] shadow-2xl border border-white/50">
<div className="absolute left-[28%] top-[35%] w-7 h-2 rounded-full bg-slate-700/55"></div>
<div className="absolute right-[28%] top-[35%] w-7 h-2 rounded-full bg-slate-700/55"></div>
<div className="absolute left-1/2 -translate-x-1/2 top-[42%] w-5 h-16 rounded-full border-r border-amber-900/20"></div>
<div className="absolute left-1/2 -translate-x-1/2 bottom-[21%] w-20 h-7 rounded-[50%] border-b-2 border-rose-900/35"></div>
<div className="absolute -left-3 top-[38%] w-7 h-20 rounded-full bg-[#dca68f]"></div>
<div className="absolute -right-3 top-[38%] w-7 h-20 rounded-full bg-[#dca68f]"></div>
</div>
) : (
<div className="absolute left-1/2 top-7 -translate-x-1/2 w-64 sm:w-80 h-[20rem] sm:h-[25rem] rounded-[42%_42%_32%_32%/28%_28%_45%_45%] bg-gradient-to-br from-[#f4cfbd] via-[#eab8a0] to-[#c98772] shadow-2xl border border-white/50">
<div className="absolute left-1/2 -translate-x-1/2 top-[18%] w-28 h-20 rounded-full border-b border-amber-900/15"></div>
<div className="absolute left-1/2 -translate-x-1/2 top-[52%] w-2.5 h-2.5 rounded-full bg-amber-900/25"></div>
<div className="absolute inset-x-10 bottom-[20%] h-px bg-amber-900/10"></div>
</div>
)}
<div
className="absolute w-24 h-36 z-20 cursor-grab active:cursor-grabbing select-none"
style={{ left: `${handpiece.x}%`, top: `${handpiece.y}%`, transform: 'translate(-50%, -50%) rotate(-18deg)' }}
onPointerDown={onPointerDown}
onPointerMove={onPointerMove}
onPointerUp={onPointerUp}
onPointerCancel={onPointerUp}
role="button"
tabIndex={0}
aria-label="Ponteira interativa. Arraste sobre a área de tratamento."
>
<div className="absolute left-8 top-0 w-10 h-24 rounded-full bg-gradient-to-b from-white to-slate-400 border border-white shadow-xl"></div>
<div className="absolute left-4 top-20 w-16 h-12 rounded-xl bg-gradient-to-b from-slate-100 to-slate-400 border border-white shadow-xl">
<div className="absolute inset-x-2 bottom-1 h-2 rounded-full bg-slate-700"></div>
</div>
{firing && (
<>
<span className="absolute left-1/2 top-[7rem] -translate-x-1/2 w-16 h-16 rounded-full border-2 border-cyan-400 animate-ping"></span>
<span className="absolute left-1/2 top-[7rem] -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(34,211,238,1)] animate-pulse"></span>
</>
)}
</div>
<div className="absolute left-3 bottom-3 right-3 sm:left-5 sm:right-auto rounded-2xl bg-slate-950/85 backdrop-blur px-4 py-3 text-white text-xs sm:text-sm flex items-center gap-3 border border-white/10">
<Move3D size={18} className="text-cyan-300 shrink-0" aria-hidden="true" />
Arraste a ponteira sobre {area === 'face' ? 'o rosto' : 'a área corporal'}
</div>
</div>
);
const SkinCrossSection = ({ active, firing }) => {
const layers = useMemo(
() => [
{ label: 'Epiderme', height: 13, color: '#fde8d7' },
{ label: 'Derme superficial', height: 19, color: '#f8cfb0' },
{ label: 'Derme profunda', height: 20, color: '#f1b98f' },
{ label: 'SMAS / fáscia', height: 18, color: '#dc927a' },
{ label: 'Tecido subcutâneo', height: 30, color: '#efc35c' },
],
[]
);
return (
<div className="rounded-3xl bg-slate-950 border border-white/10 p-5 sm:p-6 shadow-2xl">
<div className="flex items-start justify-between gap-4 mb-5">
<div>
<span className="text-cyan-300 text-xs uppercase tracking-[0.2em] font-bold">Visão interna ao vivo</span>
<h3 className="text-white text-xl font-bold mt-1">Onde o foco se concentra</h3>
</div>
<span className="rounded-full px-3 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: active.color }}>
{active.label}
</span>
</div>
<div className="relative h-72 rounded-2xl overflow-hidden border border-white/10">
{layers.map((layer) => (
<div
key={layer.label}
className="relative flex items-center px-4 text-[11px] sm:text-xs font-bold text-amber-950/70 border-b border-white/25 last:border-0"
style={{ height: `${layer.height}%`, backgroundColor: layer.color }}
>
{layer.label}
</div>
))}
<div className="absolute left-1/2 -translate-x-1/2 top-0 w-28 h-full pointer-events-none">
<div
className={`absolute left-1/2 -translate-x-1/2 top-0 w-24 origin-top transition-all duration-700 ${firing ? 'opacity-100' : 'opacity-35'}`}
style={{
height: `${active.focus}%`,
clipPath: 'polygon(30% 0, 70% 0, 53% 100%, 47% 100%)',
background: `linear-gradient(to bottom, ${active.color}44, ${active.color})`,
}}
></div>
<span
className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ${firing ? 'w-8 h-8 animate-ping' : 'w-4 h-4'}`}
style={{ top: `${active.focus}%`, backgroundColor: active.color, boxShadow: `0 0 26px ${active.color}` }}
></span>
{firing && [0, 1, 2].map((item) => (
<span
key={item}
className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-pulse"
style={{
top: `${Math.max(10, active.focus - 4 + item * 4)}%`,
marginLeft: `${(item - 1) * 18}px`,
backgroundColor: active.color,
}}
></span>
))}
</div>
</div>
<div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4">
<p className="text-white font-bold">{active.layer}</p>
<p className="text-slate-400 text-sm leading-relaxed mt-1">{active.description}</p>
</div>
</div>
);
};
const HifuInteractiveLab = ({ mode = 'patient' }) => {
const available = mode === 'rental' ? CARTRIDGES : CARTRIDGES.filter((item) => item.area === 'face');
const [active, setActive] = useState(available[2] || available[0]);
const [firing, setFiring] = useState(false);
const [handpiece, setHandpiece] = useState({ x: 76, y: 38 });
const [dragging, setDragging] = useState(false);
const surfaceRef = useRef(null);
const timerRef = useRef(null);
useEffect(() => () => window.clearTimeout(timerRef.current), []);
const fire = () => {
window.clearTimeout(timerRef.current);
setFiring(false);
window.requestAnimationFrame(() => {
setFiring(true);
timerRef.current = window.setTimeout(() => setFiring(false), 1500);
});
};
const moveHandpiece = (event) => {
if (!dragging || !surfaceRef.current) return;
const rect = surfaceRef.current.getBoundingClientRect();
const x = Math.min(88, Math.max(12, ((event.clientX - rect.left) / rect.width) * 100));
const y = Math.min(83, Math.max(16, ((event.clientY - rect.top) / rect.height) * 100));
setHandpiece({ x, y });
};
const startDrag = (event) => {
setDragging(true);
event.currentTarget.setPointerCapture?.(event.pointerId);
};
const endDrag = (event) => {
if (!dragging) return;
setDragging(false);
event.currentTarget.releasePointerCapture?.(event.pointerId);
fire();
};
const selectCartridge = (cartridge) => {
setActive(cartridge);
setHandpiece(cartridge.area === 'face' ? { x: 76, y: 38 } : { x: 74, y: 48 });
fire();
};
return (
<div className="space-y-8">
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 items-stretch">
<Equipment360 />
<div className="rounded-[2rem] bg-white border border-slate-200 p-5 sm:p-7 shadow-xl">
<span className="section-eyebrow">
<ScanLine size={14} aria-hidden="true" />
Ponteiras interativas
</span>
<h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-5">
Escolha a profundidade e veja a simulação
</h3>
<p className="text-slate-600 mt-3 leading-relaxed">
Cada cartucho concentra o foco em uma profundidade diferente. Selecione uma opção e arraste a ponteira na demonstração.
</p>
<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6" role="tablist" aria-label="Cartuchos HIFU">
{available.map((cartridge) => (
<button
key={cartridge.id}
type="button"
role="tab"
aria-selected={active.id === cartridge.id}
onClick={() => selectCartridge(cartridge)}
className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
active.id === cartridge.id
? 'border-slate-900 bg-slate-900 text-white shadow-xl -translate-y-0.5'
: 'border-slate-200 bg-slate-50 text-slate-800 hover:border-primary-300 hover:bg-primary-50'
}`}
>
<span className="block text-xl font-black">{cartridge.label}</span>
<span className={`block text-xs mt-1 ${active.id === cartridge.id ? 'text-slate-300' : 'text-slate-500'}`}>
{cartridge.short}
</span>
</button>
))}
</div>
<div className="mt-6 rounded-2xl border border-slate-200 p-5 flex gap-4 items-start">
<span className="h-11 w-11 shrink-0 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: active.color }}>
<Zap size={21} aria-hidden="true" />
</span>
<div>
<p className="font-bold text-slate-900">{active.layer}</p>
<p className="text-sm text-slate-600 mt-1 leading-relaxed">{active.description}</p>
</div>
</div>
<div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 h-40 relative">
<img
src={images.hifuEquipamentoDois}
alt="Equipamento Ultramed HIFU real utilizado pelo Dr. Adriano Camillo"
loading="lazy"
className="w-full h-full object-cover"
/>
<div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent"></div>
<div className="absolute inset-y-0 left-0 p-5 flex flex-col justify-center max-w-[70%]">
<span className="text-white font-bold">Equipamento real</span>
<span className="text-slate-200 text-xs mt-1">A representação 3D é complementada pelas imagens e vídeos originais.</span>
</div>
</div>
</div>
</div>
<div className="rounded-[2.2rem] bg-gradient-to-br from-slate-100 to-white border border-slate-200 p-5 sm:p-8 shadow-xl">
<div className="text-center max-w-3xl mx-auto mb-7">
<span className="inline-flex items-center gap-2 text-primary-700 font-bold text-xs uppercase tracking-[0.2em]">
<Sparkles size={16} aria-hidden="true" />
Simulação em tempo real
</span>
<h3 className="text-2xl sm:text-4xl font-bold text-slate-900 mt-3">
Arraste a ponteira e acompanhe o foco sob a pele
</h3>
<p className="text-slate-600 mt-3">
A animação é educativa e ilustrativa. Parâmetros e aplicação real devem ser definidos por profissional habilitado conforme avaliação e manual do equipamento.
</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
<TreatmentSurface
area={active.area}
firing={firing}
handpiece={handpiece}
onPointerDown={startDrag}
onPointerMove={moveHandpiece}
onPointerUp={endDrag}
containerRef={surfaceRef}
/>
<SkinCrossSection active={active} firing={firing} />
</div>
<div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
<button type="button" onClick={fire} className="btn-primary">
<Zap size={18} aria-hidden="true" />
Disparar demonstração
</button>
<p className="text-xs text-slate-500 text-center sm:text-left max-w-md">
A visualização não representa dosimetria, temperatura, indicação clínica ou resultado garantido.
</p>
</div>
</div>
</div>
);
};
export default HifuInteractiveLab;
