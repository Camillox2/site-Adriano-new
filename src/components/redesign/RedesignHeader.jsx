import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import logo from '../../assets/images/newlogo.webp';
import { SITE, WHATSAPP_DEFAULT } from '../../utils/constants';

export function Brand({ inverse = false }) {
  return <Link to="/" className={`rd-brand${inverse ? ' inverse' : ''}`} aria-label="Dr. Adriano Camillo — início">
    <img src={logo} alt="Logotipo Dr. Adriano Camillo" width="52" height="52" />
    <span><strong>{SITE.name}</strong><small>{SITE.title}</small></span>
  </Link>;
}

const ITEMS = [['Sobre', '#sobre'], ['Tratamentos', '#servicos'], ['HIFU', '#hifu'], ['Consultório', '#consultorio']];

export default function RedesignHeader() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    const dismiss = event => { if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus(); } };
    if (open) document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [open]);

  return <header className="rd-header">
    <div className="rd-wrap rd-header-inner">
      <Brand />
      <nav id="rd-navigation" aria-label="Navegação principal" className={open ? 'is-open' : ''}>
        {ITEMS.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
        <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
        <a className="rd-mobile-cta" href={WHATSAPP_DEFAULT} target="_blank" rel="noreferrer">Agendar avaliação <ArrowUpRight size={18} /></a>
      </nav>
      <a className="rd-button rd-header-cta" href={WHATSAPP_DEFAULT} target="_blank" rel="noreferrer">Agendar avaliação <ArrowUpRight size={18} /></a>
      <button ref={menuButton} type="button" className="rd-menu-button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="rd-navigation" onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>;
}
