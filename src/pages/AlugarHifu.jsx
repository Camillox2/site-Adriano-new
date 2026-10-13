import React, { useEffect } from 'react';
import Seo from '../components/Seo';
import { PAGE_META } from '../data/pageMeta';
import { ALUGAR_HIFU_FAQS, faqPageSchema } from '../data/pageFaqs';
import HifuShowroom from '../components/hifu-showroom/HifuShowroomV3';
import '../components/hifu-showroom/showroom-v3.css';
import '../components/hifu-showroom/motion-v4.css';
import '../components/hifu-showroom/refinement-v5.css';
import '../components/hifu-showroom/integration.css';
const meta=PAGE_META['/alugar_hifu'];
const jsonLd={'@context':'https://schema.org','@graph':[
  {'@type':'Service',name:'Locação de Ultramed HIFU com CPF ou CNPJ',description:meta.description,url:'https://dradrianocamillo.com/alugar_hifu/',provider:{'@id':'https://dradrianocamillo.com/#clinica'},areaServed:{'@type':'City',name:'São Lourenço do Oeste'}},
  faqPageSchema(ALUGAR_HIFU_FAQS)
]};
export default function AlugarHifu(){
  useEffect(() => {
    if (window.__PRERENDER__) return undefined;
    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Manrope:wght@400;450;500;550;600;650;700;750;800&display=swap';
    document.head.appendChild(fonts);
    return () => fonts.remove();
  }, []);
  return <><Seo title={meta.title} description={meta.description} path="/alugar_hifu" jsonLd={jsonLd}/><HifuShowroom/></>;
}
