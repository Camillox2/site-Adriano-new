// Gerenciador centralizado de assets para o site Dr. Adriano Camillo
import React from 'react';

// Importação de imagens
const images = {
  // Logo e identidade visual
  logo: '/assets/images/logo.png',
  logotipo: '/assets/images/Logotipo Site-02.png',
  
  // Fotos do consultório e equipamentos
  consultorio1: '/assets/images/20240723_165806.jpg',
  consultorio2: '/assets/images/20240723_165833.jpg',
  consultorio3: '/assets/images/20240723_170110.jpg',
  
  // Screenshots e materiais
  whatsappScreenshot: '/assets/images/Screenshot_20231028_123109_WhatsApp.jpg',
  photosScreenshot: '/assets/images/Screenshot_20241126_094251_Photos.jpg',
  
  // Imagem padrão (pai.jpg)
  drAdriano: '/assets/images/pai.jpg',
  paidois: '/assets/images/paidois.jpg'
};

// Importação de vídeos
const videos = {
  // Vídeos HIFU
  hifu: '/assets/videos/hifu.mp4',
  hifuAtendimento: '/assets/videos/hifuatendimento.mp4',
  hifuDois: '/assets/videos/hifudois.mp4'
};

// Componente para carregar imagens de forma otimizada
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  ...props 
}) => {
  const handleImageError = (e) => {
    // Fallback para imagem padrão em caso de erro
    e.target.src = '/assets/images/logo.png';
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleImageError}
      {...props}
    />
  );
};

// Componente para carregar vídeos de forma otimizada
export const OptimizedVideo = ({ 
  src, 
  className = '', 
  autoPlay = false, 
  muted = true, 
  loop = false,
  controls = true,
  poster = null,
  ...props 
}) => {
  return (
    <video
      src={src}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      poster={poster}
      preload="metadata"
      {...props}
    >
      Seu navegador não suporta o elemento de vídeo.
    </video>
  );
};

// Componente para exibir placeholder enquanto carrega
export const ImagePlaceholder = ({ width = '100%', height = '200px', text = 'Carregando...' }) => (
  <div 
    className="bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center text-gray-500"
    style={{ width, height }}
  >
    <span className="text-sm">{text}</span>
  </div>
);

// Hook para precarregar imagens críticas
export const usePreloadImages = (imageList) => {
  React.useEffect(() => {
    imageList.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [imageList]);
};

// Hook para lazy loading de vídeos
export const useLazyVideo = (videoRef) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target;
            video.load();
            observer.unobserve(video);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);
};

// Componente principal do Assets
const Assets = () => {
  // Este componente não renderiza nada visualmente
  // É usado apenas para organizar os assets
  return null;
};

// Exportações
export default Assets;
export { images, videos };

// Utilitários para assets
export const AssetUtils = {
  // Gerar URL completa do asset
  getAssetUrl: (assetPath) => {
    return process.env.PUBLIC_URL + assetPath;
  },

  // Verificar se asset existe
  checkAssetExists: async (assetPath) => {
    try {
      const response = await fetch(assetPath, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  },

  // Precarregar asset crítico
  preloadAsset: (assetPath, type = 'image') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = assetPath;
    link.as = type;
    document.head.appendChild(link);
  },

  // Obter dimensões da imagem
  getImageDimensions: (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = imageSrc;
    });
  }
};

// Configurações de assets para SEO
export const AssetSEO = {
  // Meta tags para imagens
  getImageMeta: (imageSrc, alt) => ({
    'og:image': imageSrc,
    'twitter:image': imageSrc,
    'og:image:alt': alt,
    'twitter:image:alt': alt
  }),

  // Schema.org para vídeos
  getVideoSchema: (videoSrc, title, description) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': title,
    'description': description,
    'contentUrl': videoSrc,
    'uploadDate': new Date().toISOString(),
    'duration': 'PT0H3M45S' // Exemplo: 3 minutos e 45 segundos
  })
};