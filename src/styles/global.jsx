import React, { useEffect } from 'react';

// Componente para gerenciar estilos globais e configurações da aplicação
const GlobalStyle = () => {
  useEffect(() => {
    // Configurações iniciais da aplicação
    
    // 1. Configurar meta tags dinâmicas
    const setMetaTags = () => {
      // Title
      document.title = 'Dr. Adriano Camillo - Cirurgião Dentista | HIFU, Ortodontia, Implantes';
      
      // Meta description
      const metaDescription = document.querySelector('meta[name="description"]') || 
                             document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Dr. Adriano Camillo - Especialista em Ortodontia, Implantes, Harmonização Orofacial e HIFU. Atendimento em São Lourenço do Oeste, Realeza e Ampére. Agende sua consulta!';
      if (!document.querySelector('meta[name="description"]')) {
        document.head.appendChild(metaDescription);
      }
      
      // Meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]') || 
                          document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = 'dentista, ortodontia, implantes, HIFU, harmonização orofacial, São Lourenço do Oeste, Realeza, Ampére, Dr. Adriano Camillo';
      if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
      }
      
      // Open Graph tags
      const ogTags = [
        { property: 'og:title', content: 'Dr. Adriano Camillo - Cirurgião Dentista' },
        { property: 'og:description', content: 'Especialista em Ortodontia, Implantes, Harmonização Orofacial e HIFU' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: '/assets/images/logo.png' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:site_name', content: 'Dr. Adriano Camillo' }
      ];
      
      ogTags.forEach(tag => {
        let metaOg = document.querySelector(`meta[property="${tag.property}"]`) || 
                     document.createElement('meta');
        metaOg.setAttribute('property', tag.property);
        metaOg.content = tag.content;
        if (!document.querySelector(`meta[property="${tag.property}"]`)) {
          document.head.appendChild(metaOg);
        }
      });
      
      // Twitter Card tags
      const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Dr. Adriano Camillo - Cirurgião Dentista' },
        { name: 'twitter:description', content: 'Especialista em Ortodontia, Implantes, Harmonização Orofacial e HIFU' },
        { name: 'twitter:image', content: '/assets/images/logo.png' }
      ];
      
      twitterTags.forEach(tag => {
        let metaTwitter = document.querySelector(`meta[name="${tag.name}"]`) || 
                         document.createElement('meta');
        metaTwitter.name = tag.name;
        metaTwitter.content = tag.content;
        if (!document.querySelector(`meta[name="${tag.name}"]`)) {
          document.head.appendChild(metaTwitter);
        }
      });
    };
    
    // 2. Configurar viewport para mobile
    const setViewport = () => {
      let viewport = document.querySelector('meta[name="viewport"]') || 
                     document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      if (!document.querySelector('meta[name="viewport"]')) {
        document.head.appendChild(viewport);
      }
    };
    
    // 3. Configurar tema para navegadores móveis
    const setThemeColor = () => {
      let themeColor = document.querySelector('meta[name="theme-color"]') || 
                       document.createElement('meta');
      themeColor.name = 'theme-color';
      themeColor.content = '#2563eb'; // Azul principal
      if (!document.querySelector('meta[name="theme-color"]')) {
        document.head.appendChild(themeColor);
      }
    };
    
    // 4. Configurar favicon dinâmico
    const setFavicon = () => {
      let favicon = document.querySelector('link[rel="icon"]') || 
                    document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = '/assets/images/logo.png';
      if (!document.querySelector('link[rel="icon"]')) {
        document.head.appendChild(favicon);
      }
    };
    
    // 5. Configurar structured data (Schema.org)
    const setStructuredData = () => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Dentist",
        "name": "Dr. Adriano Camillo",
        "description": "Cirurgião-dentista especializado em Ortodontia, Implantes, Harmonização Orofacial e HIFU",
        "url": window.location.origin,
        "telephone": "+55-49-99836-2864",
        "address": [
          {
            "@type": "PostalAddress",
            "addressLocality": "São Lourenço do Oeste",
            "addressRegion": "SC",
            "addressCountry": "BR"
          },
          {
            "@type": "PostalAddress",
            "addressLocality": "Realeza",
            "addressRegion": "PR", 
            "addressCountry": "BR"
          },
          {
            "@type": "PostalAddress",
            "addressLocality": "Ampére",
            "addressRegion": "PR",
            "addressCountry": "BR"
          }
        ],
        "openingHours": "Mo-Fr 08:00-18:00",
        "priceRange": "$$",
        "image": "/assets/images/logo.png",
        "sameAs": [
          "https://www.instagram.com/dr.adrianocamillo/",
          "https://wa.me/5549998362864"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Serviços Odontológicos",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Ortodontia",
                "description": "Correção do posicionamento dos dentes e mordida"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Implantes Dentais",
                "description": "Reposição de dentes perdidos com tecnologia de ponta"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Harmonização Orofacial",
                "description": "Rejuvenescimento facial não cirúrgico"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "HIFU - Ultrasson Microfocado", 
                "description": "Lifting facial não invasivo revolucionário"
              }
            }
          ]
        }
      };
      
      let jsonLd = document.querySelector('script[type="application/ld+json"]') || 
                   document.createElement('script');
      jsonLd.type = 'application/ld+json';
      jsonLd.textContent = JSON.stringify(structuredData);
      if (!document.querySelector('script[type="application/ld+json"]')) {
        document.head.appendChild(jsonLd);
      }
    };
    
    // 6. Configurar Google Analytics (se necessário)
    const setAnalytics = () => {
      // Descomente e configure se tiver Google Analytics
      /*
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      script.async = true;
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
      */
    };
    
    // 7. Configurar scroll suave
    const setSmoothScroll = () => {
      document.documentElement.style.scrollBehavior = 'smooth';
    };
    
    // 8. Configurar prevenção de zoom indesejado no iOS
    const preventZoom = () => {
      document.addEventListener('touchstart', function() {}, { passive: true });
      
      // Prevenir zoom duplo-toque no iOS
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    };
    
    // 9. Configurar lazy loading para imagens
    const setLazyLoading = () => {
      if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
          img.src = img.dataset.src || img.src;
        });
      } else {
        // Fallback para navegadores antigos
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
      }
    };
    
    // 10. Configurar service worker para PWA (opcional)
    const setServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    };
    
    // Executar todas as configurações
    setMetaTags();
    setViewport();
    setThemeColor();
    setFavicon();
    setStructuredData();
    setAnalytics();
    setSmoothScroll();
    preventZoom();
    setLazyLoading();
    // setServiceWorker(); // Descomente se quiser PWA
    
    // Cleanup
    return () => {
      // Limpar event listeners se necessário
    };
  }, []);
  
  // Observer para animações quando elementos entram na viewport
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    // Observar elementos com classe 'appear'
    const elements = document.querySelectorAll('.appear');
    elements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
  
  // Este componente não renderiza nada visualmente
  return null;
};

export default GlobalStyle;