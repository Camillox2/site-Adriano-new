import { useEffect, useRef, useState } from 'react';

// Hook customizado para Intersection Observer otimizado
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersect = entry.isIntersecting;
        setIsIntersecting(isIntersect);
        
        if (isIntersect && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [hasIntersected, options]);

  return { targetRef, isIntersecting, hasIntersected };
};

// Hook para lazy loading de imagens
export const useLazyImage = (src, placeholder = '') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver();

  useEffect(() => {
    if (hasIntersected && src) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        setHasError(true);
      };
      
      img.src = src;
    }
  }, [hasIntersected, src]);

  return { targetRef, imageSrc, isLoaded, hasError };
};

// Hook para animações em scroll
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const { targetRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (!isIntersecting) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isIntersecting]);

  return { targetRef, scrollY, isIntersecting };
};

// Hook para preload de vídeos
export const useVideoPreload = (videoSrc) => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoSrc) return;

    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.addEventListener('loadedmetadata', () => {
      setIsPreloaded(true);
    });
    
    video.addEventListener('canplay', () => {
      setCanPlay(true);
    });
    
    video.src = videoSrc;
    
    return () => {
      video.remove();
    };
  }, [videoSrc]);

  return { videoRef, isPreloaded, canPlay };
};

const hooks = {
  useIntersectionObserver,
  useLazyImage,
  useScrollAnimation,
  useVideoPreload,
};

export default hooks;
