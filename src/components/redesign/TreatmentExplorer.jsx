import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import TreatmentIllustration from './TreatmentIllustration';

export const TREATMENTS = [
  { title: 'Odontologia estética', mode: 'estetica', slug: '/odontologia-estetica', description: 'Saúde, função e naturalidade para o seu sorriso.', detail: 'Um planejamento que considera a estética, a saúde e a função do seu sorriso.' },
  { title: 'Ortodontia', mode: 'ortodontia', slug: '/ortodontia', description: 'Equilíbrio para o seu sorriso e a sua mordida.', detail: 'Alinhamento dos dentes e correção da mordida com planejamento individual.' },
  { title: 'Implantes dentários', mode: 'implantes', slug: '/implantes-dentarios', description: 'Volte a sorrir com mais confiança.', detail: 'Reabilitação de dentes ausentes com foco em função, estabilidade e estética.' },
  { title: 'Harmonização orofacial', mode: 'face', slug: '/harmonizacao-orofacial', description: 'Sua individualidade em primeiro lugar.', detail: 'Avaliação e planejamento para valorizar a harmonia do rosto com naturalidade.' },
  { title: 'DTM e dor orofacial', mode: 'dtm', slug: '/dtm-dor-orofacial', description: 'Atenção à sua dor. Cuidado com você.', detail: 'Avaliação de dores na face, mandíbula, articulação e sinais de bruxismo.' },
];

export default function TreatmentExplorer() {
  const [active, setActive] = useState(0);
  return <section id="servicos" className="rd-section rd-treatments">
    <div className="rd-wrap">
      <div className="rd-section-heading"><h2>Um cuidado completo.<br /><span>Do sorriso à autoestima.</span></h2><p>Cada pessoa é única.<br />Seu tratamento também.</p></div>
      <div className="rd-treatment-layout">
        <div className="rd-treatment-canvas"><div key={active} className="rd-treatment-art"><TreatmentIllustration mode={TREATMENTS[active].mode} /></div><span className="rd-illustration-note">Selecione um tratamento e explore.</span></div>
        <div className="rd-treatment-list">{TREATMENTS.map((treatment,index)=><article className={`rd-treatment-row${active === index ? ' is-active' : ''}`} key={treatment.slug}>
          <h3><button type="button" id={`treatment-button-${index}`} aria-expanded={active === index} aria-controls={`treatment-detail-${index}`} onClick={()=>setActive(index)}><span className="rd-treatment-number">0{index+1}</span><span>{treatment.title}</span>{active === index ? <Minus size={21} /> : <Plus size={21} />}</button></h3>
          <div id={`treatment-detail-${index}`} role="region" aria-labelledby={`treatment-button-${index}`} hidden={active !== index} className="rd-treatment-detail"><p>{treatment.description}</p><p className="rd-muted">{treatment.detail}</p><Link to={treatment.slug}>Conhecer o tratamento <ArrowRight size={21} /></Link></div>
        </article>)}<Link to="/servicos" className="rd-all-treatments">Ver todos os tratamentos <ArrowRight size={19} /></Link></div>
      </div>
    </div>
  </section>;
}
