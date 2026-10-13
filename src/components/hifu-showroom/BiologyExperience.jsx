import React from 'react';
import { memo, useRef, useState } from 'react';
import { ArrowUpRight, Scan as ScanLine, Waves } from 'lucide-react';
import useMotionVisibility from './useMotionVisibility';
import FacialSculpture from './FacialSculpture';

const weave = side => Array.from({length:28},(_,row)=>Array.from({length:81},(_,i)=>{
  const u=i/80;
  const x=55+u*690;
  const y=270+row*6+Math.sin(u*Math.PI*2.2+(side?Math.PI:0)+row*.031)*103 + Math.sin(u*Math.PI)*side*24;
  return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`;
}).join(' '));
const fibersA = weave(false), fibersB = weave(true);

const FiberArt = memo(function FiberArt(){
  return <div className="fiber-float"><svg viewBox="0 0 800 700" className="fiber-art" role="img" aria-label="Composição artística de fibras entrelaçadas para ilustrar o colágeno, sem escala microscópica.">
    <defs><linearGradient id="fiber-a" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#c1e0e9"/><stop offset=".25" stopColor="#246787"/><stop offset=".5" stopColor="#b2e9f5"/><stop offset=".75" stopColor="#276e91"/><stop offset="1" stopColor="#c1e0e9"/></linearGradient><linearGradient id="fiber-b" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#98cbdc"/><stop offset=".3" stopColor="#b4e5ee"/><stop offset=".55" stopColor="#337b9e"/><stop offset=".8" stopColor="#97cadc"/><stop offset="1" stopColor="#bbdce7"/></linearGradient></defs>
    <g fill="none" stroke="url(#fiber-b)" strokeWidth="1.7">{fibersB.map((d,i)=><path d={d} key={i}/>)}</g>
    <g fill="none" stroke="url(#fiber-a)" strokeWidth="1.9">{fibersA.map((d,i)=><path d={d} key={i}/>)}</g>
    {[6,14,22].map((i)=><path className="fiber-energy" key={i} d={fibersA[i]} fill="none" stroke="#e5fdff" strokeWidth="3" pathLength="100" style={{animationDelay:`-${i*.2}s`}}/>)}
    <g fill="none" stroke="#679eb7" strokeWidth=".8" strokeOpacity=".4"><ellipse cx="400" cy="367" rx="310" ry="170" transform="rotate(-20 400 367)"/><path d="M400 125V173M400 545V590M35 367H85M715 367H765"/></g>
  </svg></div>;
});

const topics = [
  { title:'Firmeza e contorno', kicker:'O CONTORNO EM FOCO', headline:'Mais firmeza. Contornos mais definidos.', text:'O estímulo térmico favorece a remodelação do colágeno e a retração do tecido. Em pacientes com indicação, pode melhorar a flacidez e a definição do contorno facial ao longo do tempo.', label:'ESTUDO VETORIAL / CONTORNO FACIAL' },
  { title:'Colágeno', kicker:'UMA RESPOSTA DO ORGANISMO', headline:'O estímulo acontece sob a pele.', text:'Os pontos de aquecimento desencadeiam uma resposta de remodelação do tecido. A formação de colágeno e os resultados se desenvolvem ao longo do tempo.', label:'ESTUDO VETORIAL / FIBRAS DE COLÁGENO' },
];

export default function BiologyExperience({paused}) {
  const scene = useRef(null);
  const [selected,setSelected] = useState(0);
  useMotionVisibility(scene,paused);
  return <section className="biology-section motion-region" id="beneficios" ref={scene}>
    <div className="biology-shell"><div className="biology-heading"><span className="section-index">02 / O QUE ACONTECE NO TECIDO</span><h2>Colágeno. Firmeza.<br/><span>Contorno.</span></h2></div>
      <div className="biology-grid"><div className="biology-copy"><div className="biology-tabs" aria-label="Explore os benefícios">{topics.map((topic,i)=><button type="button" key={topic.title} aria-pressed={selected===i} onClick={()=>setSelected(i)} className={selected===i?'selected':''}>{i===0?<ScanLine size={17}/>:<Waves size={17}/>} {topic.title}</button>)}</div><div className="biology-description" aria-live="polite"><span className="mini-label">{topics[selected].kicker}</span><h3>{topics[selected].headline}</h3><p>{topics[selected].text}</p></div><p className="biology-note">A resposta e o prazo variam de pessoa para pessoa. As ilustrações explicam conceitos e não representam resultados clínicos.</p><a className="inline-link" href="https://www.medicalsan.com.br/tecnologias/ultramed-hifu/" target="_blank" rel="noreferrer">Indicações do fabricante <ArrowUpRight size={16}/></a></div>
        <div className={`biology-display ${selected===1?'show-fibers':'show-face'}`}><div className="biology-aura" aria-hidden="true"/><div className="bio-orbit one" aria-hidden="true"/><div className="bio-orbit two" aria-hidden="true"/><div className="biology-art-view"><div className={`biology-visual ${selected===0?'active':''}`} aria-hidden={selected!==0}><FacialSculpture/></div><div className={`biology-visual ${selected===1?'active':''}`} aria-hidden={selected!==1}><FiberArt/></div></div><div className="biology-coordinate top">{selected===0?'01 / CONTORNO':'02 / COLÁGENO'}<span>HIFU</span></div><div className="biology-coordinate bottom"><span>{topics[selected].label}</span><i>+</i></div><span className="bio-corner tl" aria-hidden="true"/><span className="bio-corner br" aria-hidden="true"/></div>
      </div>
    </div>
  </section>;
}
