// Gerenciador centralizado de assets — Dr. Adriano Camillo
import React from 'react';

// Imagens
import logo from './images/newlogo.png';
import logotipoSite from './images/Logotipo Site-02.png';
import pai from './images/pai.jpg';
import paidois from './images/paidois.jpg';
import consultorio1 from './images/20240723_165806.jpg';
import consultorio2 from './images/20240723_165833.jpg';
import consultorio3 from './images/20240723_170110.jpg';
import hifuEquipamento from './images/20240723_165814.jpg';
import hifuEquipamentoDois from './images/Screenshot_20241104_152125_Photos.jpg';
import whatsappScreenshot from './images/Screenshot_20231028_123109_WhatsApp.jpg';
import photosScreenshot from './images/Screenshot_20241126_094251_Photos.jpg';

// Posters (thumbnails reais extraídos dos vídeos)
import posterHifu from './images/poster-hifu.jpg';
import posterHifuAtendimento from './images/poster-hifuatendimento.jpg';
import posterHifuDois from './images/poster-hifudois.jpg';
import posterHifuTres from './images/poster-hifutres.jpg';

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

  // Dr. Adriano
  drAdriano: pai,
  pai,
  paidois,

  // Posters de vídeo
  posterHifu,
  posterHifuAtendimento,
  posterHifuDois,
  posterHifuTres,
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
