import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Play, Pause, Waves as AudioLines } from 'lucide-react';
import WaveField from './WaveFieldV4';
import OrbitRibbon from './OrbitRibbon';
import useMotionVisibility from './useMotionVisibility';

export default function CinematicHero({ paused, setPaused, openVideo }) {
  const story = useRef(null);
  const stage = useRef(null);
  const [chapter, setChapter] = useState(0);
  useMotionVisibility(stage, paused);
  useEffect(() => {
    if (window.__PRERENDER__) return undefined;
    const node = story.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 760px)');
    let pending = 0, currentChapter = 0, previousStyle = '';
    const update = () => {
      pending = 0;
      const box = node.getBoundingClientRect();
      const p = media.matches || mobile.matches ? 0 : Math.max(0, Math.min(1, -box.top / Math.max(1, box.height - window.innerHeight)));
      const transition = Math.max(0, Math.min(1, (p - .14) / .47));
      const ease = transition * transition * (3 - 2 * transition);
      const style = `--story:${ease.toFixed(4)};--story-progress:${p.toFixed(4)};--intro-opacity:${Math.max(0,1-ease*2.4).toFixed(3)};--detail-opacity:${Math.max(0,(ease-.4)/.6).toFixed(3)};--dive:${Math.max(0,(p-.72)/.28).toFixed(3)}`;
      if (style !== previousStyle) { node.style.cssText = style; previousStyle = style; }
      const nextChapter = p > .81 ? 2 : ease > .5 ? 1 : 0;
      if (nextChapter !== currentChapter) { currentChapter = nextChapter; setChapter(nextChapter); }
    };
    const schedule = () => { if (!pending) pending = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    media.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(pending); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); media.removeEventListener('change', schedule); };
  }, []);
  return <section className="cinema-story" ref={story} id="inicio" aria-label="Conheça o Ultramed HIFU">
    <div className="cinema-stage motion-region" ref={stage}>
      <div className="cinema-light" aria-hidden="true"/>
      <div className="studio-light-drift" aria-hidden="true"/>
      <WaveField paused={paused}/>
      <OrbitRibbon/>
      <div className="cinema-lettering" aria-hidden="true">HIFU</div>
      <div className="cinema-grain" aria-hidden="true"/>
      <div className="hero-copy hero-intro" aria-hidden={chapter !== 0} inert={chapter !== 0 ? '' : undefined}>
        <span className="hero-eyebrow"><i/> ULTRAMED HIFU / LOCAÇÃO</span>
        <h1>O Ultramed<br/>na sua clínica<span>.</span></h1>
        <p className="hero-promise">Sem comprar o aparelho.</p>
        <p className="hero-description">Você escolhe a data. A gente alinha o equipamento, as ponteiras e a entrega.</p>
        <div className="hero-actions"><a className="primary-button" href="#consultar">Consultar locação <span><ArrowUpRight size={20}/></span></a><button className="hero-film" type="button" onClick={openVideo}><span><Play size={12} fill="currentColor"/></span> Ver em uso</button></div>
        <div className="hero-contract"><span>CPF</span><span>CNPJ</span><p>Para profissionais habilitados e clínicas.</p></div>
      </div>
      <div className="hero-copy hero-detail" aria-hidden={chapter !== 1} inert={chapter !== 1 ? '' : undefined}>
        <span className="hero-eyebrow"><AudioLines size={16}/> ULTRASSOM MICROFOCADO</span>
        <h2>Pequenos focos.<br/><span>Em diferentes<br/>profundidades.</span></h2>
        <p className="hero-description">Três ponteiras faciais. Explore onde a energia se concentra e o que acontece sob a superfície.</p>
        <a className="primary-button" href="#tecnologia">Explore as profundidades <span><ArrowDown size={19}/></span></a>
        <div className="hero-measures"><span>1,5 <small>mm</small></span><span>3,0 <small>mm</small></span><span>4,5 <small>mm</small></span></div>
      </div>
      <div className="cinema-product" aria-hidden="true"><div className="product-ground"/><div className="cinema-photo"><img src="/media/hifu-showroom/ultramed-studio.webp" srcSet="/media/hifu-showroom/ultramed-studio-640.webp 640w, /media/hifu-showroom/ultramed-studio.webp 1024w" sizes="(max-width:760px) 88vw, 48vw" width="1024" height="1536" alt="" fetchpriority="high"/><div className="product-light-pass"/></div></div>
      <OrbitRibbon front/>
      <div className="cinema-dive" aria-hidden="true"/>
      <div className="device-tag"><span className="tag-cross">+</span><div><strong>Ultramed HIFU</strong><span>Medical San · ultrassom microfocado</span></div><span className="tag-line"/></div>
      <div className="hero-side-label" aria-hidden="true">A ENERGIA TEM UM FOCO.</div>
      <div className="cinema-bottom"><a href="#tecnologia" className="scroll-prompt"><span><ArrowDown size={17}/></span> Role para descobrir</a><div className="chapter-indicator" aria-hidden="true"><span className={chapter === 0 ? 'active' : ''}>01 / O EQUIPAMENTO</span><i/><span className={chapter >= 1 ? 'active' : ''}>02 / O FOCO</span></div><button className="motion-toggle" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? <Play size={13}/> : <Pause size={13}/>}<span>{paused ? 'Retomar movimento' : 'Pausar movimento'}</span></button></div>
      <p className="cinema-photo-note">Imagem de apresentação tratada a partir do equipamento real.</p>
      <div className="cinema-progress" aria-hidden="true"/>
    </div>
  </section>;
}
