import React from 'react';
import { memo, useRef, useState } from 'react';
import { ArrowUpRight, Crosshair } from 'lucide-react';
import useMotionVisibility from './useMotionVisibility';
const depths = [
  { number:'1,5', short:'Colágeno', layer:'Derme mais superficial', title:'Um estímulo para a qualidade da pele.', action:'Pontos de aquecimento estimulam a renovação do colágeno na região tratada.', benefit:'Pode contribuir para a melhora da textura e de linhas finas.', y:260, color:'#9ee9f4' },
  { number:'3,0', short:'Firmeza', layer:'Derme profunda*', title:'Colágeno para uma pele mais firme.', action:'O estímulo térmico favorece a contração e a remodelação das fibras de colágeno.', benefit:'Pode melhorar a firmeza e a flacidez leve a moderada.', y:345, color:'#67c9ed' },
  { number:'4,5', short:'Sustentação', layer:'Plano de sustentação / SMAS*', title:'O contorno ganha um foco mais profundo.', action:'A energia focalizada atua em planos profundos de sustentação, quando indicados pela avaliação.', benefit:'Pode favorecer a sustentação dos tecidos e a definição do contorno facial.', y:471, color:'#c5bcff' },
];
const surface = y => `M100 ${y}C244 ${y-32} 430 ${y+27} 657 ${y-7}`;
const band = (top,bottom) => `${surface(top)}L657 ${bottom-7}C430 ${bottom+27} 244 ${bottom-32} 100 ${bottom}Z`;
const collagen=Array.from({length:16},(_,i)=>`M108 ${220+i*8}C220 ${189+i*9} 270 ${255+i*6} 376 ${226+i*8}S544 ${263+i*7} 650 ${226+i*8}`).join(' ');
const connective=Array.from({length:14},(_,i)=>`M${126+i*38} 217Q${108+i*38} 275 ${151+i*38} 367`).join(' ');
const adipocytes=Array.from({length:24},(_,i)=>({x:119+(i%12)*46,y:411+Math.floor(i/12)*28+Math.sin(i)*4}));
const fascia=Array.from({length:9},(_,i)=>surface(451+i*5)).join(' ');
const TissueSculpture = memo(function TissueSculpture({selected}){
  const depth=depths[selected];
  return <svg className="tissue-sculpture" viewBox="0 0 870 600" role="img" aria-label={`Corte ilustrado da pele. Ponteira de ${depth.number} milímetros selecionada: ${depth.layer}. Epiderme, derme, tecido subcutâneo e SMAS identificados. Esquema sem escala anatômica.`}>
    <defs>
      <linearGradient id="tissue-skin" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c8e9f2" stopOpacity=".62"/><stop offset="1" stopColor="#78aeba" stopOpacity=".25"/></linearGradient>
      <linearGradient id="tissue-dermis" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5a95ab" stopOpacity=".32"/><stop offset="1" stopColor="#205474" stopOpacity=".28"/></linearGradient>
      <linearGradient id="tissue-side"><stop stopColor="#24495f"/><stop offset="1" stopColor="#142c43"/></linearGradient>
      <linearGradient id="tissue-cone" x1="0" y1="0" x2="0" y2="1"><stop stopColor={depth.color} stopOpacity=".02"/><stop offset=".8" stopColor={depth.color} stopOpacity=".14"/><stop offset="1" stopColor={depth.color} stopOpacity=".8"/></linearGradient>
      <linearGradient id="tissue-probe" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f6fdff"/><stop offset=".5" stopColor="#9ab8ca"/><stop offset="1" stopColor="#d9eff8"/></linearGradient>
      <radialGradient id="tissue-glow"><stop stopColor={depth.color} stopOpacity=".5"/><stop offset="1" stopColor={depth.color} stopOpacity="0"/></radialGradient>
      <clipPath id="dermis-clip"><path d={band(210,383)}/></clipPath><clipPath id="fat-clip"><path d={band(383,448)}/></clipPath>
    </defs>
    <ellipse cx="392" cy="535" rx="330" ry="40" fill="#020e1d" opacity=".32"/>
    <path d="M657 183L714 146V461L657 499Z" fill="url(#tissue-side)" stroke="#8cb6cc" strokeOpacity=".15"/>
    <path d={`${surface(190)}L714 146C487 182 297 123 157 153Z`} fill="url(#tissue-skin)" stroke="#d2edf4" strokeOpacity=".35"/>
    <path d={band(190,210)} fill="#a5cfdb" fillOpacity=".42" stroke="#caedf3" strokeOpacity=".4"/>
    <path d={band(210,383)} fill="url(#tissue-dermis)" stroke="#699cb5" strokeOpacity=".24"/>
    <g clipPath="url(#dermis-clip)" fill="none" stroke="#8ac9dc" strokeWidth="1.1"><path d={collagen} opacity=".37"/><path d={connective} opacity=".18"/></g>
    <path d={band(383,448)} fill="#728c9e" fillOpacity=".13"/>
    <g clipPath="url(#fat-clip)">{adipocytes.map((p,i)=><ellipse key={i} cx={p.x} cy={p.y} rx="23" ry="18" fill="#bfd4c9" fillOpacity=".045" stroke="#bddbcc" strokeOpacity=".25" strokeWidth=".85"/>)}</g>
    <path d={band(448,497)} fill="#8a7aad" fillOpacity=".16"/><path d={fascia} fill="none" stroke="#b8b3df" strokeOpacity=".37" strokeWidth=".9"/><path d={surface(497)} fill="none" stroke="#bdd8e7" strokeOpacity=".35"/>
    <g className="tissue-labels" fill="#b9d1dd"><path d="M111 200H57M111 308H57M111 418H57M111 472H57" fill="none" stroke="#9bbacd" strokeOpacity=".6"/><text x="100" y="177">EPIDERME</text><text x="110" y="299">DERME</text><text x="109" y="407">SUBCUTÂNEO</text><text x="111" y="483">SMAS</text></g>
    <path className="tissue-focus-cone" d={`M345 177L444 174L395 ${depth.y}Z`} fill="url(#tissue-cone)"/><path className="tissue-focus-cone" d={`M345 177L395 ${depth.y}L444 174`} fill="none" stroke={depth.color} strokeWidth="1.1" strokeOpacity=".65"/>
    <g className="tissue-target" style={{transform:`translate(0,${depth.y}px)`}}>
      <ellipse cx="395" cy="0" rx="108" ry="52" fill="url(#tissue-glow)"/><path d="M272 0H657" stroke={depth.color} strokeOpacity=".65" strokeDasharray="2 6"/>
      {[0,1,2,3,4,5,6].map(i=><g key={i} className="tissue-thermal-point" style={{animationDelay:`-${i*.38}s`}}><ellipse cx={317+i*26} cy="0" rx="4" ry="6" fill={depth.color}/><ellipse cx={317+i*26} cy="0" rx="8" ry="11" fill="none" stroke={depth.color} strokeOpacity=".3"/></g>)}
      <path d="M657 0H728" stroke={depth.color}/><circle cx="657" cy="0" r="4" fill={depth.color}/><text x="742" y="8" className="tissue-depth-label" fill={depth.color}>{depth.number}<tspan fontSize="14"> mm</tspan></text>
    </g>
    <g className="tissue-probe"><path d="M352 91L424 83L449 153L435 176L345 180L333 158Z" fill="url(#tissue-probe)" stroke="#e4f9ff" strokeOpacity=".5"/><path d="M345 166L444 161L435 176L345 180Z" fill="#61879d"/><path d="M349 178L435 174" stroke="#d4f8ff" strokeWidth="3"/><path d="M381 86L377 58Q376 42 391 34" fill="none" stroke="#96b6c8" strokeWidth="9"/><path d="M361 106L418 100" stroke="#7094aa" strokeWidth="2"/><text x="372" y="143" fill="#41627a" fontSize="11" letterSpacing="1.5">HIFU</text></g>
    <g className="tissue-bottom-label"><circle cx="273" cy="556" r="3" fill={depth.color}/><text x="286" y="560">PONTOS DE ESTÍMULO TÉRMICO</text></g>
  </svg>;
});
export default function DepthExperienceV3({paused=false}){
  const [selected,setSelected]=useState(1);const scene=useRef(null);useMotionVisibility(scene,paused);const depth=depths[selected];
  return <section className="focus-section tissue-section motion-region" id="tecnologia" ref={scene}>
    <div className="focus-ambient" aria-hidden="true"/><div className="focus-orbit" aria-hidden="true"/>
    <div className="focus-header"><span className="section-index">01 / O QUE MUDA EM CADA CAMADA</span><span className="live-label"><i/> ESCOLHA UMA PROFUNDIDADE</span></div>
    <div className="focus-title"><h2>Colágeno, firmeza<br/><span>e sustentação.</span></h2><p>O HIFU concentra calor em pontos sob a pele. Explore onde cada ponteira atua e o benefício que o tratamento busca.</p></div>
    <div className="focus-experience"><div className="sculpture-stage"><div className="focus-controls tissue-controls" aria-label="Escolha a profundidade">{depths.map((item,i)=><button key={item.number} type="button" aria-pressed={selected===i} onClick={()=>setSelected(i)} className={selected===i?'selected':''}><span>{item.number}<small> mm</small></span><strong>{item.short}</strong></button>)}</div><div className="sculpture-cross" aria-hidden="true"><Crosshair size={17}/><span>CORTE ILUSTRADO DA PELE</span></div><TissueSculpture selected={selected}/><p className="focus-control-hint">Camadas ampliadas para explicar o foco. Sem escala anatômica.</p></div>
    <div className="focus-copy tissue-copy" aria-live="polite" aria-atomic="true"><span className="technical-label">PONTEIRA FACIAL / {depth.short.toUpperCase()}</span><div className="focus-number" key={selected}>{depth.number}<span>mm</span></div><h3>{depth.title}</h3><dl className="depth-explanation"><div><dt>Onde atua</dt><dd>{depth.layer}</dd></div><div><dt>O que faz</dt><dd>{depth.action}</dd></div><div className="depth-benefit"><dt>Benefício buscado</dt><dd>{depth.benefit}</dd></div></dl><a className="focus-source" href="https://www.medicalsan.com.br/tecnologias/ultramed-hifu/" target="_blank" rel="noreferrer">Conheça a tecnologia Medical San <ArrowUpRight size={16}/></a></div></div>
    <div className="focus-bottom"><span>UM ESTÍMULO LOCAL. UMA RESPOSTA QUE EVOLUI COM O TEMPO.</span><p>*As camadas alcançadas variam com a espessura do tecido e a região. A escolha da ponteira exige avaliação profissional; os resultados variam entre pacientes.</p></div>
  </section>;
}
