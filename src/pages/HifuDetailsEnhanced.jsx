import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, Building2, Sparkles } from 'lucide-react';
import HifuDetails from './HifuDetails';
import HifuInteractiveLab from '../components/HifuInteractiveLab';

const EnhancedExperience = () => (
  <section className="section bg-slate-100 overflow-hidden" aria-labelledby="hifu-3d-title">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="section-eyebrow">
          <Box size={14} aria-hidden="true" />
          Nova experiência 3D
        </span>
        <h2 id="hifu-3d-title" className="section-title mt-5">
          Gire o aparelho e veja o HIFU <span className="text-primary-700">agindo por dentro</span>
        </h2>
        <p className="section-subtitle mt-5">
          Explore o equipamento em 360°, escolha uma ponteira facial e arraste-a sobre o rosto para acompanhar uma representação educativa do foco sob a pele.
        </p>
      </div>

      <HifuInteractiveLab mode="patient" />

      <div className="mt-10 rounded-[2rem] bg-slate-950 border border-slate-800 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-start gap-4 max-w-3xl">
          <span className="h-12 w-12 rounded-2xl bg-cyan-400/10 text-cyan-300 flex items-center justify-center shrink-0">
            <Building2 size={24} aria-hidden="true" />
          </span>
          <div>
            <span className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-[0.18em]">
              <Sparkles size={14} aria-hidden="true" />
              Área profissional
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">Você é profissional e quer levar o HIFU para sua clínica?</h3>
            <p className="text-slate-400 mt-2 leading-relaxed">
              Acesse a página exclusiva de locação, veja todas as profundidades e consulte disponibilidade.
            </p>
          </div>
        </div>
        <Link to="/alugar_hifu" className="btn-primary shrink-0">
          Conhecer a locação
          <ArrowRight size={19} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

const HifuDetailsEnhanced = () => {
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    const target = document.getElementById('videos-hifu');
    if (!target?.parentNode) return undefined;

    const node = document.createElement('div');
    node.setAttribute('data-hifu-3d-experience', 'true');
    target.parentNode.insertBefore(node, target);
    setPortalNode(node);

    return () => {
      node.remove();
    };
  }, []);

  return (
    <>
      <HifuDetails />
      {portalNode && createPortal(<EnhancedExperience />, portalNode)}
    </>
  );
};

export default HifuDetailsEnhanced;
