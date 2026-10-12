import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, MapPin, Pause, Play, ShieldCheck, CalendarDays, HeartHandshake } from 'lucide-react';
import { WHATSAPP_DEFAULT } from '../../utils/constants';
import { isPrerendering } from '../../utils/prerender';
import DentalScene from './DentalScene';
import { FaceIllustration } from './TreatmentIllustration';
import SmileMark from './SmileMark';
import SmileScene from './SmileScene';

const MODES = ['Conforto', 'Sorriso', 'Estética'];

export default function DentalHero({ paused, reducedMotion, onToggleMotion }) {
  const [mode, setMode] = useState(0);
  const [position, setPosition] = useState(45);
  const [manual, setManual] = useState(false);
  const sceneRef = useRef(null);
  const backRef = useRef(null);
  const footRef = useRef(null);
  const rangeRef = useRef(null);
  const motionPosition = useRef(45);
  const tiltRef = useRef(null);
  const pointerFrame = useRef(null);

  const resetTilt = useCallback(() => {
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = null;
    tiltRef.current?.style.setProperty('--tilt-x', '0deg');
    tiltRef.current?.style.setProperty('--tilt-y', '0deg');
    tiltRef.current?.style.setProperty('--shift-x', '0px');
    tiltRef.current?.style.setProperty('--shift-y', '0px');
  }, []);

  const moveScene = event => {
    if (paused || reducedMotion || event.pointerType === 'touch') return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
    if (pointerFrame.current) cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      pointerFrame.current = null;
      tiltRef.current?.style.setProperty('--tilt-x', `${-y * 2.5}deg`);
      tiltRef.current?.style.setProperty('--tilt-y', `${x * 3}deg`);
      tiltRef.current?.style.setProperty('--shift-x', `${x * 5}px`);
      tiltRef.current?.style.setProperty('--shift-y', `${y * 4}px`);
    });
  };

  useEffect(() => {
    if (paused) resetTilt();
    return resetTilt;
  }, [paused, resetTilt]);

  useEffect(() => {
    if (paused || manual || mode !== 0 || isPrerendering()) return;
    let frame;
    let start;
    let visible = true;
    const initial = motionPosition.current;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    if (sceneRef.current) observer.observe(sceneRef.current);
    const animate = time => {
      if (start === undefined) start = time;
      if (visible && !document.hidden) {
        const elapsed = time - start;
        const blend = Math.min(elapsed / 1400, 1);
        const ease = blend * blend * (3 - 2 * blend);
        const next = initial + (45 + Math.sin(elapsed / 4200) * 29 - initial) * ease;
        motionPosition.current = next;
        if (backRef.current) backRef.current.style.transform = `rotate(${-10 + next * .48}deg)`;
        if (footRef.current) footRef.current.style.transform = `rotate(${(next - 45) * .13}deg)`;
        if (rangeRef.current) rangeRef.current.value = String(Math.round(next));
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [paused, manual, mode]);

  const chooseMode = next => { setPosition(motionPosition.current); setMode(next); setManual(false); };
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
        <h1><span>Seu sorriso.</span>{' '}<span>Sua essência.</span>{' '}<span className="rd-green rd-smile-text">Nosso <span className="rd-care-word">cuidado.<SmileMark /></span></span></h1>
        <p className="rd-hero-description">Odontologia e estética facial com mais de 30 anos de experiência. Tecnologia que cuida. Atenção que acolhe.</p>
        <div className="rd-actions"><a href={WHATSAPP_DEFAULT} target="_blank" rel="noreferrer" className="rd-button">Agendar no WhatsApp <ArrowRight size={19} /></a><a href="#servicos" className="rd-button rd-button-outline">Conhecer os tratamentos</a></div>
      </div>
      <div ref={sceneRef} className="rd-hero-canvas" onPointerMove={moveScene} onPointerLeave={resetTilt}>
        <div className="rd-scene-toolbar"><span className="rd-scene-caption">Explore o cuidado</span><button type="button" className="rd-motion-toggle" disabled={reducedMotion} aria-label={reducedMotion ? 'Movimento reduzido ativo no dispositivo' : paused ? 'Retomar animações' : 'Pausar animações'} onClick={() => { setPosition(motionPosition.current); setManual(false); onToggleMotion(); }}>{paused ? <Play size={15} /> : <Pause size={15} />}<span>{reducedMotion ? 'Sem movimento' : paused ? 'Retomar' : 'Pausar'}</span></button></div>
        <div className="rd-scene-tabs" role="tablist" aria-label="Explore o cuidado">{MODES.map((name,index)=><button id={`scene-tab-${index}`} key={name} role="tab" type="button" tabIndex={index === mode ? 0 : -1} aria-selected={index === mode} aria-controls="scene-panel" onKeyDown={event=>tabKey(event,index)} onClick={()=>chooseMode(index)}>{name}</button>)}</div>
        <div id="scene-panel" role="tabpanel" aria-labelledby={`scene-tab-${mode}`} className="rd-scene-content" key={mode}><div ref={tiltRef} className="rd-scene-stage">{mode === 0 ? <DentalScene position={position} backRef={backRef} footRef={footRef} /> : mode === 1 ? <SmileScene /> : <FaceIllustration light />}</div></div>
        <div className="rd-scene-bottom">{mode === 0 ? <><label htmlFor="chair-position">Posição da cadeira <span>{manual ? 'Você está no controle' : 'Experimente mover'}</span></label><input ref={rangeRef} id="chair-position" type="range" min="0" max="100" defaultValue={Math.round(motionPosition.current)} onChange={event=>{const next=Number(event.target.value);motionPosition.current=next;setPosition(next);setManual(true);}} aria-label="Posição da cadeira" /></> : <p>{mode === 1 ? 'Saúde, função e naturalidade para o seu sorriso.' : 'Cada rosto tem uma história. O cuidado respeita a sua.'}</p>}<small>Ilustração interativa do cuidado no consultório.</small></div>
      </div>
    </div>
    <div className="rd-proof-band"><div className="rd-wrap rd-proof-layout"><div><CalendarDays /><p><strong>30+ anos</strong><small>de experiência</small></p></div><div><ShieldCheck /><p><strong>CRO-SC 4011</strong><small>registro profissional</small></p></div><div><HeartHandshake /><p><strong>Atendimento individual</strong><small>com foco em você</small></p></div></div></div>
  </section>;
}
