import React from 'react';
import logo from '../assets/images/dcfoundry-digital-logo.png';

/**
 * Crédito clicável da DC Foundry Digital (rodapé).
 * Logo via import CRA para hash em /static/media (não depende de public/).
 */
const DcFoundryCredit = ({ className = '' }) => (
  <a
    href="https://dcfoundrydigital.com"
    target="_blank"
    rel="noreferrer noopener"
    aria-label="Desenvolvido e Mantido por DC Foundry Digital"
    className={`inline-flex items-center gap-3 text-slate-200 text-sm sm:text-[0.9375rem] leading-snug no-underline transition-colors hover:text-white ${className}`.trim()}
  >
    <img
      src={logo}
      width={48}
      height={48}
      alt="DC Foundry Digital"
      className="w-12 h-12 object-contain shrink-0"
      loading="lazy"
      decoding="async"
    />
    <span>
      Desenvolvido e Mantido por{' '}
      <strong
        className="font-bold text-[1.05em]"
        style={{
          color: '#86a6ff',
          textDecorationLine: 'underline',
          textDecorationStyle: 'wavy',
          textDecorationColor: 'rgba(134, 166, 255, 0.55)',
          textDecorationThickness: '1.5px',
          textUnderlineOffset: '5px',
        }}
      >
        DC Foundry Digital
      </strong>
    </span>
  </a>
);

export default DcFoundryCredit;
