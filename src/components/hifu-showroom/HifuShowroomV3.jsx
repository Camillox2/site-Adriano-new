import videoSource from '../../assets/videos/hifu.mp4';
import { ALUGAR_HIFU_FAQS } from '../../data/pageFaqs';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play, Plus, Minus, X, Menu, Check, CalendarDays, MoveUpRight, Layers as Layers3 } from 'lucide-react';
import DepthExperience from './DepthExperienceV3';
import CinematicHero from './CinematicHero';
import WaveField from './WaveFieldV4';
import BiologyExperience from './BiologyExperience';

const source = 'https://www.medicalsan.com.br/tecnologias/ultramed-hifu/';

const faqs = ALUGAR_HIFU_FAQS.map(({question,answer}) => [question,answer]);

function Logo({ footer=false }) {
  return <a href="#inicio" className={`original-brand ${footer?'footer-brand':''}`} aria-label="Dr. Adriano Camillo — início"><img src="/media/hifu-showroom/logo-original.webp" alt="Adriano Camillo — Clínica Odonto Facial" width="140" height="140"/></a>;
}

export default function HifuShowroomV3() {
  useEffect(() => {
    document.documentElement.classList.add('hifu-showroom-page');
    document.body.classList.add('hifu-showroom-page');
    return () => { document.documentElement.classList.remove('hifu-showroom-page'); document.body.classList.remove('hifu-showroom-page'); };
  }, []);
  const root=useRef(null);
  const dialog=useRef(null);
  const lastVideoTrigger=useRef(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const [videoOpen,setVideoOpen]=useState(false);
  const [paused,setPaused]=useState(false);
  const [profile,setProfile]=useState('CPF');
  const [faq,setFaq]=useState(0);
  const [draft,setDraft]=useState({name:'',city:'',date:''});
  const [request,setRequest]=useState(null);
  const [today,setToday]=useState('');
  const [consultVisible,setConsultVisible]=useState(false);
  const [introVisible,setIntroVisible]=useState(true);

  useEffect(()=>{
    if (window.__PRERENDER__) return undefined;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.target.id==='consultar')setConsultVisible(entry.isIntersecting);
      if(entry.target.id==='inicio')setIntroVisible(entry.isIntersecting);
    }),{threshold:0});
    const section=root.current?.querySelector('#consultar');
    const intro=root.current?.querySelector('#inicio');
    if(section)observer.observe(section);
    if(intro)observer.observe(intro);
    return ()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    if (window.__PRERENDER__) return undefined;
    const element=root.current;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const now=new Date();
    setToday(`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`);
    if(reduced) return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.09});
    element.querySelectorAll('[data-reveal]').forEach(item=>observer.observe(item));
    element.classList.add('motion-ready');
    return ()=>observer.disconnect();
  },[]);

  useEffect(()=>{
    if (window.__PRERENDER__) return undefined;
    if(videoOpen) dialog.current?.showModal();
    else if(dialog.current?.open) dialog.current.close();
  },[videoOpen]);

  function openVideo(event){lastVideoTrigger.current=event.currentTarget;setVideoOpen(true);}
  function closeVideo(){setVideoOpen(false);lastVideoTrigger.current?.focus({preventScroll:true});}
  function prepareRequest(event){
    event.preventDefault();
    const fields=new FormData(event.currentTarget);
    const name=String(fields.get('name')).trim();
    const city=String(fields.get('city')).trim();
    const date=String(fields.get('date'));
    if(!name||!city)return;
    setDraft({name,city,date});
    const formatted=date?date.split('-').reverse().join('/'):'a combinar';
    const message=`Olá! Sou ${name} e quero consultar a locação do Ultramed HIFU.\nPerfil: ${profile==='CPF'?'Profissional autônomo (CPF)':'Clínica ou empresa (CNPJ)'}\nCidade: ${city}\nData desejada: ${formatted}\nGostaria de confirmar valor, ponteiras, disparos e entrega.`;
    setRequest({message,url:`https://wa.me/5549998362864?text=${encodeURIComponent(message)}`});
  }

  return <div ref={root} className={`hifu-v3 ${paused?'motion-paused':''}`}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="main-header">
      <Logo/>
      <nav className={menuOpen?'open':''} aria-label="Navegação principal">{[['O Ultramed','#inicio'],['A tecnologia','#tecnologia'],['Na prática','#na-pratica'],['Locação','#locacao']].map(([label,href])=><a href={href} key={href} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav>
      <a className="nav-contact" href="#consultar">Consultar data <span><ArrowUpRight size={17}/></span></a>
      <button className="menu-button" type="button" aria-label={menuOpen?'Fechar menu':'Abrir menu'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </header>

    <main id="conteudo">
      <CinematicHero paused={paused} setPaused={setPaused} openVideo={openVideo}/>

      <DepthExperience paused={paused}/>

      <BiologyExperience paused={paused}/>
      <div className="rental-strip"><span>Um aparelho.<br/><strong>A sua programação.</strong></span><div><Check size={17}/> Contratação com CPF ou CNPJ</div><div><Check size={17}/> Período e ponteiras sob consulta</div><div><Check size={17}/> Entrega e retirada combinadas</div></div>

      <section className="practice-section" id="na-pratica"><div className="section-shell">
        <div className="editorial-heading" data-reveal><span className="section-index">03 / DA TECNOLOGIA À PRÁTICA</span><div><h2>Agora, na prática.</h2><p>Registros reais de atendimento do Dr. Adriano Camillo, com o Ultramed HIFU em uso.</p></div></div>
        <div className="practice-cards" data-reveal><button className="main-video-card" type="button" onClick={openVideo} aria-label="Assistir à aplicação real do Ultramed HIFU"><img src="/media/hifu-showroom/poster-hifutres.webp" width="640" height="850" alt="Registro real da aplicação de HIFU" loading="lazy"/><span className="video-shade"/><span className="video-top"><i/> APLICAÇÃO REAL <span>01 / FILME</span></span><span className="big-play"><Play size={22} fill="currentColor"/></span><span className="video-card-bottom"><strong>A manopla.<br/>O foco. A aplicação.</strong><span><ArrowUpRight size={22}/></span></span></button>
          <div className="practice-side"><div className="detail-image device-detail"><img src="/media/hifu-showroom/ultramed-studio.webp" alt="Detalhe do console Ultramed em imagem de apresentação" width="1024" height="1536" loading="lazy" decoding="async"/><span>ULTRAMED HIFU / O CONSOLE</span></div><article className="case-reference"><span className="mini-label">CASOS DOCUMENTADOS / ESTUDO CLÍNICO</span><h3>Contorno facial.<br/><em>6 meses de acompanhamento.</em></h3><p>Um estudo com 20 participantes avaliou a evolução após uma sessão, com fotografias e análise 3D em 1, 3 e 6 meses.</p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11756818/" target="_blank" rel="noreferrer" className="inline-link">Explorar os casos publicados <ArrowUpRight size={17}/></a><small>Zhu et al., 2024. Estudo com MicroUltra, diferente do Ultramed desta locação. Os resultados não são uma previsão individual.</small></article></div></div>
      </div></section>

      <section className="equipment-section section-shell" id="equipamento">
        <div className="editorial-heading" data-reveal><span className="section-index">04 / QUEM ESTÁ POR TRÁS DA LOCAÇÃO</span><div><h2>Conheça o aparelho.<br/><em>E quem cuida da locação.</em></h2><p>Concentre os atendimentos em uma data. Consulte o equipamento e a configuração para esse período.</p></div></div>
        <div className="equipment-editorial" data-reveal>
          <div className="doctor-photo"><img src="/media/hifu-showroom/dr-adriano-ultramed.webp" alt="Dr. Adriano Camillo ao lado do seu equipamento Ultramed HIFU no consultório" width="1080" height="1455" loading="lazy"/><span className="photo-badge"><span/> REGISTRO DO CONSULTÓRIO</span><div className="doctor-photo-caption"><span>Dr. Adriano Camillo</span><small>Cirurgião-dentista · CRO-SC 4011</small></div></div>
          <div className="equipment-details"><span className="mini-label">ULTRAMED HIFU / MEDICAL SAN</span><h3>Você organiza<br/>os atendimentos.<br/><em>A gente alinha a locação.</em></h3><p className="equipment-intro">A proposta é definida a partir da sua cidade, da data e da configuração necessária para o seu dia de HIFU.</p><div className="rental-detail"><span>01</span><div><h4>Uma data na sua agenda</h4><p>Informe o período em que pretende atender e consulte a disponibilidade.</p></div><CalendarDays size={19}/></div><div className="rental-detail"><span>02</span><div><h4>As ponteiras para o seu uso</h4><p>Confirme os cartuchos faciais, os disparos e os itens incluídos.</p></div><Layers3 size={19}/></div><div className="rental-detail"><span>03</span><div><h4>Logística definida antes da reserva</h4><p>Combine entrega, retirada e orientação operacional.</p></div><MoveUpRight size={19}/></div><a className="inline-link" href="#consultar">Consultar equipamento e condições <ArrowUpRight size={17}/></a></div>
        </div>
      </section>

      <section className="rental-section section-shell" id="locacao"><div className="rental-heading" data-reveal><span className="section-index">05 / DO PLANEJAMENTO AO ATENDIMENTO</span><h2>Da sua data<br/><em>ao dia de atendimento.</em></h2><p>Uma conversa para alinhar equipamento,<br/>condições e logística.</p></div><div className="steps" data-reveal>{[['01','Conte sua programação.','Informe cidade, data desejada e contratação por CPF ou CNPJ.'],['02','Confira a proposta.','Veja valor, ponteiras, disparos e condições de entrega e retirada.'],['03','Organize o seu HIFU Day.','Com a reserva confirmada, prepare os atendimentos para o período combinado.']].map(([number,title,description])=><article key={number}><div className="step-top"><span>{number}</span><ArrowUpRight size={23}/></div><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="consult-section" id="consultar"><WaveField className="consult-wave-field" paused={paused}/><div className="section-shell consult-grid"><div className="consult-copy" data-reveal><span className="section-index">LOCAÇÃO / CPF E CNPJ</span><h2>O próximo<br/><em>HIFU Day</em><br/>é na sua clínica.</h2><p>Informe sua programação e continue pelo WhatsApp para consultar a disponibilidade.</p><div className="consult-person"><img src="/media/hifu-showroom/logo-original.webp" alt="Logo Adriano Camillo" width="140" height="140"/><div><strong>Dr. Adriano Camillo</strong><span>São Lourenço do Oeste · SC</span></div></div></div><div className="consult-form" data-reveal>{request?<div className="request-summary" aria-live="polite"><div className="summary-check"><Check size={27}/></div><span className="mini-label">SUA CONSULTA ESTÁ PREPARADA</span><h3>Agora, vamos<br/>conferir a data.</h3><p className="message-preview">{request.message}</p><a className="primary-button" href={request.url} data-lead-service="Locação de HIFU" target="_blank" rel="noreferrer">Continuar no WhatsApp <span><ArrowUpRight size={18}/></span></a><button className="edit-request" type="button" onClick={()=>setRequest(null)}>Editar informações</button><small>A disponibilidade será confirmada na conversa.</small></div>:<form onSubmit={prepareRequest}><div className="form-heading"><span>CONSULTE SUA DATA</span><CalendarDays size={18}/></div><fieldset><legend>Como você quer contratar?</legend><div className="profile-options">{['CPF','CNPJ'].map(value=><button type="button" key={value} className={profile===value?'selected':''} aria-pressed={profile===value} onClick={()=>setProfile(value)}><strong>{value}</strong><span>{value==='CPF'?'Profissional autônomo':'Clínica / empresa'}</span>{profile===value?<Check size={15}/>:<Plus size={15}/>}</button>)}</div></fieldset><label className="form-field">{profile==='CPF'?'Seu nome':'Nome do responsável'}<input name="name" autoComplete="name" placeholder="Como podemos te chamar?" required maxLength={100} defaultValue={draft.name}/></label><div className="form-columns"><label className="form-field">Cidade / UF<input name="city" autoComplete="address-level2" placeholder="Ex.: Chapecó / SC" required maxLength={100} defaultValue={draft.city}/></label><label className="form-field">Data desejada<input name="date" type="date" min={today} defaultValue={draft.date}/></label></div><button className="primary-button" type="submit">Consultar disponibilidade <span><ArrowUpRight size={18}/></span></button><p className="form-footnote">Você confere a mensagem antes de abrir o WhatsApp.<br/>Valor, configuração e disponibilidade sob consulta.</p></form>}</div></div></section>

      <section className="faq-section section-shell"><div data-reveal><span className="section-index">ANTES DE RESERVAR</span><h2>As respostas<br/><em>para começar.</em></h2></div><div className="faq-list" data-reveal>{faqs.map(([question,answer],index)=><article key={question}><h3><button type="button" onClick={()=>setFaq(faq===index?-1:index)} aria-expanded={faq===index} aria-controls={`rental-faq-${index}`}><span>{question}</span>{faq===index?<Minus size={18}/>:<Plus size={18}/>}</button></h3><div id={`rental-faq-${index}`} hidden={faq!==index}><p>{answer}</p></div></article>)}</div></section>
    </main>

    <footer className="main-footer"><div className="footer-upper"><Logo footer/><p>Ultramed HIFU para profissionais e clínicas.<br/><strong>Locação com CPF ou CNPJ.</strong></p><a href="#inicio" className="back-top" aria-label="Voltar ao início"><ArrowUpRight size={25}/></a></div><div className="footer-lower"><span>Dr. Adriano Camillo · CRO-SC 4011</span><span>São Lourenço do Oeste / SC</span><a href={source} target="_blank" rel="noreferrer">Sobre a tecnologia <ArrowUpRight size={12}/></a><a href="/">Conheça a clínica</a><a href="/politica-de-privacidade">Privacidade</a><a href="https://dcfoundrydigital.com" target="_blank" rel="noreferrer">Desenvolvido e mantido por DC Foundry Digital</a><span>© {new Date().getFullYear()}</span></div></footer>
    <a className="mobile-consult" href="#consultar" hidden={consultVisible||introVisible}>Consultar locação <ArrowUpRight size={19}/></a>
    <dialog ref={dialog} className="video-dialog" onCancel={closeVideo} onClose={closeVideo} onClick={event=>{if(event.target===dialog.current)closeVideo();}}><div className="video-dialog-content"><div className="video-dialog-header"><span>ULTRAMED HIFU · APLICAÇÃO REAL</span><button type="button" aria-label="Fechar vídeo" onClick={closeVideo}><X size={19}/></button></div>{videoOpen?<video controls autoPlay playsInline poster="/media/hifu-showroom/poster-hifu.webp" src={videoSource}><track kind="captions" src="/media/hifu-showroom/hifu.vtt" srcLang="pt-BR" label="Português" default/></video>:null}<p>Registro de atendimento do Dr. Adriano Camillo.</p></div></dialog>
  </div>;
}
