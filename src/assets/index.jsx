// Gerenciador centralizado de assets — Dr. Adriano Camillo
import React from 'react';

// Imagens
import logo from './images/newlogo.webp';
import logotipoSite from './images/Logotipo Site-02.webp';
import pai from './images/pai.webp';
import paidois from './images/paidois.webp';
import consultorio1 from './images/20240723_165806.webp';
import consultorio2 from './images/20240723_165833.webp';
import consultorio3 from './images/20240723_170110.webp';
import hifuEquipamento from './images/20240723_165814.webp';
import hifuEquipamentoDois from './images/Screenshot_20241104_152125_Photos.webp';
import whatsappScreenshot from './images/Screenshot_20231028_123109_WhatsApp.webp';
import photosScreenshot from './images/Screenshot_20241126_094251_Photos.webp';
import faceBefore from './images/face-before.jpg';
import faceAfter from './images/face-after.jpg';

// Resultados
import resultado_design_1 from './images/resultados/resultado_design_1.webp';
import resultado_design_2 from './images/resultados/resultado_design_2.webp';
import resultado_harmonizacao_1 from './images/resultados/resultado_harmonizacao_1.webp';
import resultado_harmonizacao_2 from './images/resultados/resultado_harmonizacao_2.webp';
import resultado_harmonizacao_3 from './images/resultados/resultado_harmonizacao_3.webp';
import botox_testa_antes_depois from './images/resultados/botox_testa_antes_depois.webp';
import harmonizacao_perfil from './images/resultados/harmonizacao_perfil.webp';
import preenchimento_labial_detalhe from './images/resultados/preenchimento_labial_detalhe.webp';

// Novas fotos
import preenchimento_labial_1 from './novas/preenchimento_labial_1.png';
import preenchimento_labial_2 from './novas/preenchimento_labial_2.png';
import preenchimento_labial_3 from './novas/preenchimento_labial_3.png';
import preenchimento_labial_4 from './novas/preenchimento_labial_4.png';
import preenchimento_labial_5 from './novas/preenchimento_labial_5.png';
import lipo_papada from './novas/lipo_papada.png';
import lifting_facial from './novas/lifting_facial.png';
import preenchimento_mento from './novas/preenchimento_mento.png';
import botox_1 from './novas/botox_1.png';
import botox_2 from './novas/botox_2.png';
import botox_3 from './novas/botox_3.png';
import harmonizacao_antes_depois_1 from './novas/harmonizacao_antes_depois_1.png';
import harmonizacao_antes_depois_2 from './novas/harmonizacao_antes_depois_2.png';
import implante_dentario_1 from './novas/implante_dentario_1.png';

// Posters (thumbnails reais extraídos dos vídeos)
import posterHifu from './images/poster-hifu.webp';
import posterHifuAtendimento from './images/poster-hifuatendimento.webp';
import posterHifuDois from './images/poster-hifudois.webp';
import posterHifuTres from './images/poster-hifutres.webp';

// Vídeos (comprimidos para web — 1080p)
import hifuVideo from './videos/hifu.mp4';
import hifuAtendimentoVideo from './videos/hifuatendimento.mp4';
import hifuDoisVideo from './videos/hifudois.mp4';
import hifuTresVideo from './videos/hifutres.mp4';

const images = {
  logo,
  logotipo: logotipoSite,

  // Consultório e equipamento HIFU
  consultorio1,
  consultorio2,
  consultorio3,
  hifuEquipamento,
  hifuEquipamentoDois,

  // Materiais
  whatsappScreenshot,
  photosScreenshot,
  faceBefore,
  faceAfter,

  // Dr. Adriano
  drAdriano: pai,
  pai,
  paidois,

  // Posters de vídeo
  posterHifu,
  posterHifuAtendimento,
  posterHifuDois,
  posterHifuTres,

  // Resultados
  resultado_design_1,
  resultado_design_2,
  resultado_harmonizacao_1,
  resultado_harmonizacao_2,
  resultado_harmonizacao_3,
  botox_testa_antes_depois,
  harmonizacao_perfil,
  preenchimento_labial_detalhe,

  // Novas
  preenchimento_labial_1,
  preenchimento_labial_2,
  preenchimento_labial_3,
  preenchimento_labial_4,
  preenchimento_labial_5,
  lipo_papada,
  lifting_facial,
  preenchimento_mento,
  botox_1,
  botox_2,
  botox_3,
  harmonizacao_antes_depois_1,
  harmonizacao_antes_depois_2,
  implante_dentario_1,
};

const videos = {
  hifu: hifuVideo,
  hifuAtendimento: hifuAtendimentoVideo,
  hifuDois: hifuDoisVideo,
  hifuTres: hifuTresVideo,
};

// Imagem otimizada com placeholder
export const OptimizedImage = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  placeholder = true,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className="relative overflow-hidden">
      {placeholder && !imageLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-slate-300 animate-shimmer"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        loading={loading}
        onLoad={() => setImageLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
};

// Vídeo otimizado (preload apenas de metadados)
export const OptimizedVideo = ({
  src,
  className = '',
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  poster = null,
  ...props
}) => (
  <video
    src={src}
    className={className}
    autoPlay={autoPlay}
    muted={muted}
    loop={loop}
    controls={controls}
    poster={poster}
    preload="metadata"
    playsInline
    {...props}
  >
    Seu navegador não suporta o elemento de vídeo.
  </video>
);

const Assets = () => null;

export default Assets;
export { images, videos };
