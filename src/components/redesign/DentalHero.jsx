import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin, Pause, Play, ShieldCheck, CalendarDays, HeartHandshake } from 'lucide-react';
import { WHATSAPP_DEFAULT } from '../../utils/constants';
import { isPrerendering } from '../../utils/prerender';
import DentalScene from './DentalScene';
import TreatmentIllustration, { FaceIllustration } from './TreatmentIllustration';

const MODES = ['Conforto', 'Sorriso', 'Estética'];

export default function DentalHero({ paused, reducedMotion, onToggleMotion }) {
  const [mode, setMode] = useState(0);
  const [position, setPosition] = useState(45);
  const [manual, setManual] = useState(false);
  const sceneRef = useRef(null);
  useEffect(() => {
    if (paused || manual || mode !== 0 || isPrerendering()) return;
    let frame;
    let start;
    let lastFrame = 0;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (sceneRef.current) observer.observe(sceneRef.current);
    const animate = time => {
      if (start === undefined) start = time;
      if (visible && !document.hidden && time - lastFrame > 40) {
        setPosition(45 + Math.sin((time - start) / 2500) * 35);
        lastFrame = time;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [paused, manual, mode]);

  const chooseMode = next => { setMode(next); setManual(false); };
  const tabKey = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3;
    chooseMode(next);
    document.getElementById(`scene-tab-${next}`)?.focus();
  };

  return <section id="inicio" className="rd-hero">
    <div className="rd-wrap rd-hero-layout">
      <div className="rd-hero-copy">
        <p className="rd-location"><MapPin size={15} /> São Lourenço do Oeste · SC</p>
        <h1><span>Seu sorriso.</span>{' '}<span>Sua essência.</span>{' '}<span className="rd-green rd-smile-text">Nosso cuidado.<svg viewBox="0 0 420 35" aria-hidden="true"><path d="M4 5Q210 58 413 5" /></svg></span></h1>
        <p className="rd-hero-description">Odontologia e estética facial com mais de 30 anos de experiência. Tecnologia que cuida. Atenção que acolhe.</p>
        <div className="rd-actions"><a href={WHATSAPP_DEFAULT} target="_blank" rel="noreferrer" className="rd-button">Agendar no WhatsApp <ArrowRight size={19} /></a><a href="#servicos" className="rd-button rd-button-outline">Conhecer os tratamentos</a></div>
      </div>
      <div ref={sceneRef} className="rd-hero-canvas">
        <div className="rd-scene-toolbar"><span className="rd-scene-caption">Explore o cuidado</span><button type="button" className="rd-motion-toggle" disabled={reducedMotion} aria-label={reducedMotion ? 'Movimento reduzido ativo no dispositivo' : paused ? 'Retomar animações' : 'Pausar animações'} onClick={() => { setManual(false); onToggleMotion(); }}>{paused ? <Play size={15} /> : <Pause size={15} />}<span>{reducedMotion ? 'Sem movimento' : paused ? 'Retomar' : 'Pausar'}</span></button></div>
        <div className="rd-scene-tabs" role="tablist" aria-label="Explore o cuidado">{MODES.map((name,index)=><button id={`scene-tab-${index}`} key={name} role="tab" type="button" tabIndex={index === mode ? 0 : -1} aria-selected={index === mode} aria-controls="scene-panel" onKeyDown={event=>tabKey(event,index)} onClick={()=>chooseMode(index)}>{name}</button>)}</div>
        <div id="scene-panel" role="tabpanel" aria-labelledby={`scene-tab-${mode}`} className="rd-scene-content" key={mode}>{mode === 0 ? <DentalScene position={position} /> : mode === 1 ? <TreatmentIllustration /> : <FaceIllustration light />}</div>
        <div className="rd-scene-bottom">{mode === 0 ? <><label htmlFor="chair-position">Posição da cadeira <span>{manual ? 'Você está no controle' : 'Experimente mover'}</span></label><input id="chair-position" type="range" min="0" max="100" value={Math.round(position)} onChange={event=>{setPosition(Number(event.target.value));setManual(true);}} aria-label="Posição da cadeira" /></> : <p>{mode === 1 ? 'Saúde, função e naturalidade para o seu sorriso.' : 'Cada rosto tem uma história. O cuidado respeita a sua.'}</p>}<small>Ilustração interativa do cuidado no consultório.</small></div>
      </div>
    </div>
    <div className="rd-proof-band"><div className="rd-wrap rd-proof-layout"><div><CalendarDays /><p><strong>30+ anos</strong><small>de experiência</small></p></div><div><ShieldCheck /><p><strong>CRO-SC 4011</strong><small>registro profissional</small></p></div><div><HeartHandshake /><p><strong>Atendimento individual</strong><small>com foco em você</small></p></div></div></div>
  </section>;
}
