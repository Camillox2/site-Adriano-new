import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Star, Instagram, Play } from 'lucide-react';
import { SITE, ADDRESS, WHATSAPP_DEFAULT } from '../../utils/constants';
import { Brand } from './RedesignHeader';
import { FaceIllustration } from './TreatmentIllustration';
import DcFoundryCredit from '../DcFoundryCredit';
import father from '../../assets/images/pai.webp';
import reception from '../../assets/images/consultorio/recepcao-2.webp';
import room from '../../assets/images/consultorio/sala-atendimento-1.webp';
import care from '../../assets/images/consultorio/atendimento.webp';
import waiting from '../../assets/images/consultorio/recepcao-1.webp';
import chair from '../../assets/images/consultorio/cadeira-odontologica.webp';
import hifuVideo from '../../assets/videos/hifu.mp4';
import hifuPoster from '../../assets/images/poster-hifu.webp';

export function HifuFeature() {
  return <section id="hifu" className="rd-hifu">
    <div className="rd-wrap rd-hifu-layout">
      <div className="rd-hifu-copy"><p className="rd-kicker"><span /> Tecnologia com propósito</p><h2>Sua beleza.<br /><span>Com naturalidade.</span></h2><p>Conheça o ultrassom microfocado e converse sobre as possibilidades para o seu caso.</p><ol><li><span>01 /</span> Avaliação individual</li><li><span>02 /</span> Planejamento personalizado</li></ol><Link className="rd-button rd-button-mint" to="/hifu">Conhecer o HIFU <ArrowRight size={22} /></Link><Link className="rd-rental-link" to="/alugar_hifu">É profissional? Conheça a locação do HIFU <ArrowUpRight size={17} /></Link></div>
      <div className="rd-hifu-art"><FaceIllustration /><p>Ciência e tecnologia a serviço do seu cuidado.</p></div>
    </div>
  </section>;
}

export function DoctorProfile() {
  return <section id="sobre" className="rd-section rd-doctor"><div className="rd-wrap rd-doctor-layout">
    <figure className="rd-doctor-photo"><img src={father} alt="Dr. Adriano Camillo em seu consultório" width="900" height="900" loading="lazy" decoding="async" /><figcaption>Dr. Adriano Camillo <span>· CRO-SC 4011</span></figcaption></figure>
    <div><h2>Experiência que<br /><span>acolhe você.</span></h2><p>Mais de 30 anos dedicados à odontologia, com ciência, tecnologia e respeito à individualidade de cada paciente.</p><dl className="rd-education"><div><dt>UFSC</dt><dd>Graduação em Odontologia</dd></div><div><dt>Ortodontia</dt><dd>Especialização</dd></div><div><dt>São Leopoldo Mandic</dt><dd>Mestrado em DTM e Dor Orofacial</dd></div></dl><a className="rd-text-link" href={SITE.instagram} target="_blank" rel="noreferrer">Acompanhe no Instagram <ArrowUpRight size={19} /></a></div>
  </div></section>;
}

const PHOTOS = [
  { src: reception, alt: 'Recepção do consultório do Dr. Adriano Camillo' },
  { src: room, alt: 'Sala de atendimento odontológico' },
  { src: care, alt: 'Dr. Adriano Camillo em atendimento' },
  { src: waiting, alt: 'Sala de espera do consultório' },
  { src: chair, alt: 'Cadeira odontológica e equipamentos do consultório' },
];

export function OfficeExperience() {
  const [active, setActive] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const go = step => setActive(value => (value + step + PHOTOS.length) % PHOTOS.length);
  return <section id="consultorio" className="rd-office rd-section"><div className="rd-wrap">
    <div className="rd-section-heading"><h2>Sinta-se bem.<br /><span>Antes mesmo de sentar.</span></h2><p>Um espaço pensado para o seu conforto,<br />no Centro de São Lourenço do Oeste.</p></div>
    <div className="rd-office-layout"><div className="rd-office-gallery" role="region" aria-roledescription="carrossel" aria-label="Fotos do consultório">
      <div className="rd-office-main"><img key={PHOTOS[active].src} src={PHOTOS[active].src} alt={PHOTOS[active].alt} width="1000" height="700" loading="lazy" /><div className="rd-gallery-controls"><span aria-live="polite">{String(active+1).padStart(2,'0')} / 05</span><button type="button" onClick={()=>go(-1)} aria-label="Foto anterior"><ChevronLeft size={19} /></button><button type="button" onClick={()=>go(1)} aria-label="Próxima foto"><ChevronRight size={19} /></button></div></div>
      <div className="rd-office-thumbnails">{PHOTOS.map((photo,index)=><button type="button" key={photo.src} aria-label={`Ver foto: ${photo.alt}`} aria-pressed={active===index} onClick={()=>setActive(index)}><img src={photo.src} alt="" width="150" height="100" loading="lazy" /></button>)}</div>
    </div><div className="rd-office-video"><div className="rd-video-frame">{showVideo ? <video src={hifuVideo} poster={hifuPoster} controls autoPlay playsInline preload="metadata" aria-label="Vídeo real da aplicação do HIFU no consultório" /> : <button type="button" onClick={()=>setShowVideo(true)} aria-label="Assistir ao HIFU no consultório"><img src={hifuPoster} alt="Aplicação do HIFU no consultório" width="600" height="800" loading="lazy" /><span><Play size={26} fill="currentColor" /></span></button>}</div><p className="rd-kicker">Veja de perto</p><h3>Tecnologia real.<br />Cuidado de verdade.</h3><p>Conheça a aplicação do HIFU no consultório.</p></div></div>
    <a className="rd-office-address" href={ADDRESS.mapsUrl} target="_blank" rel="noreferrer">{ADDRESS.street} <ArrowUpRight size={18} /></a>
  </div></section>;
}

const STORIES = [
  { name: 'Emanoelli Pessoa', text: 'Um profissional extremamente competente, gentil, atencioso e muito educado. Transmite segurança durante todo o atendimento, explica cada procedimento com clareza e trata seus pacientes com respeito e cuidado.' },
  { name: 'Danieli Ferreira', text: 'Dr. Adriano é um profissional em quem tenho total confiança. É profissional, competente e atencioso, super recomendo!' },
  { name: 'Jaqueline Ribeiro', text: 'Excelente profissional, atencioso e muito competente. Com certeza irei retornar para outros procedimentos.' },
];

export function PatientStories() {
  const [active, setActive] = useState(0);
  const story = STORIES[active];
  return <section id="depoimentos" className="rd-section rd-stories"><div className="rd-wrap"><div className="rd-stories-heading"><p className="rd-kicker">Histórias de confiança</p><h2>Quem confia,<br /><span>recomenda.</span></h2></div><div className="rd-story-content"><div className="rd-story-stars" aria-label="Avaliação de 5 estrelas">{[0,1,2,3,4].map(i=><Star key={i} size={17} fill="currentColor" />)}</div><blockquote key={story.name}>{story.text}</blockquote><div className="rd-story-author"><div><strong>{story.name}</strong><small>Trecho de avaliação publicada no Google Maps</small></div><div className="rd-story-controls"><button type="button" aria-label="Depoimento anterior" onClick={()=>setActive(value=>(value+2)%3)}><ChevronLeft size={20} /></button><button type="button" aria-label="Próximo depoimento" onClick={()=>setActive(value=>(value+1)%3)}><ChevronRight size={20} /></button></div></div><a href={ADDRESS.mapsUrl} target="_blank" rel="noreferrer" className="rd-text-link">Ver avaliações no Google <ArrowUpRight size={17} /></a></div></div></section>;
}

export function RedesignFooter() {
  return <footer className="rd-footer"><div className="rd-wrap"><div className="rd-footer-top"><Brand inverse /><nav aria-label="Links do rodapé"><a href="#servicos">Tratamentos</a><Link to="/hifu">HIFU</Link><Link to="/alugar_hifu">Locação do HIFU</Link><Link to="/blog">Blog</Link><a href="#contato">Contato</a></nav><div className="rd-footer-social"><a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram do Dr. Adriano Camillo"><Instagram size={22} /></a><a href={WHATSAPP_DEFAULT} target="_blank" rel="noreferrer" aria-label="WhatsApp do consultório"><ArrowUpRight size={23} /></a></div></div><div className="rd-footer-bottom"><p>© {new Date().getFullYear()} Dr. Adriano Camillo · CRO-SC 4011</p><Link to="/politica-de-privacidade">Privacidade</Link><DcFoundryCredit /></div></div></footer>;
}
