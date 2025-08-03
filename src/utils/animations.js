// Utilitários de animação para o site Dr. Adriano Camillo

/**
 * Configurações padrão para animações
 */
export const ANIMATION_CONFIG = {
  // Durações
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    extraSlow: 1000
  },
  
  // Easing functions
  easing: {
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  },
  
  // Delays para animações em sequência
  delays: {
    step1: 0,
    step2: 100,
    step3: 200,
    step4: 300,
    step5: 400
  }
};

/**
 * Observer para animações de entrada (Intersection Observer)
 */
export class AnimationObserver {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      animationClass: 'animate-in',
      ...options
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(this.options.animationClass);
        
        // Se tiver delay configurado, aplicar
        const delay = entry.target.dataset.animationDelay;
        if (delay) {
          entry.target.style.animationDelay = `${delay}ms`;
        }
        
        // Parar de observar após animar
        if (this.options.once !== false) {
          this.observer.unobserve(entry.target);
        }
      }
    });
  }
  
  observe(element) {
    this.observer.observe(element);
  }
  
  observeAll(selector = '[data-animate]') {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => this.observe(el));
  }
  
  disconnect() {
    this.observer.disconnect();
  }
}

/**
 * Animações de entrada predefinidas
 */
export const ENTRANCE_ANIMATIONS = {
  fadeIn: {
    name: 'fadeIn',
    keyframes: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.normal,
      easing: ANIMATION_CONFIG.easing.easeOut,
      fill: 'forwards'
    }
  },
  
  fadeInUp: {
    name: 'fadeInUp',
    keyframes: [
      { opacity: 0, transform: 'translateY(30px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.slow,
      easing: ANIMATION_CONFIG.easing.easeOut,
      fill: 'forwards'
    }
  },
  
  fadeInDown: {
    name: 'fadeInDown',
    keyframes: [
      { opacity: 0, transform: 'translateY(-30px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.slow,
      easing: ANIMATION_CONFIG.easing.easeOut,
      fill: 'forwards'
    }
  },
  
  fadeInLeft: {
    name: 'fadeInLeft',
    keyframes: [
      { opacity: 0, transform: 'translateX(-30px)' },
      { opacity: 1, transform: 'translateX(0)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.slow,
      easing: ANIMATION_CONFIG.easing.easeOut,
      fill: 'forwards'
    }
  },
  
  fadeInRight: {
    name: 'fadeInRight',
    keyframes: [
      { opacity: 0, transform: 'translateX(30px)' },
      { opacity: 1, transform: 'translateX(0)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.slow,
      easing: ANIMATION_CONFIG.easing.easeOut,
      fill: 'forwards'
    }
  },
  
  scaleIn: {
    name: 'scaleIn',
    keyframes: [
      { opacity: 0, transform: 'scale(0.8)' },
      { opacity: 1, transform: 'scale(1)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.slow,
      easing: ANIMATION_CONFIG.easing.bounce,
      fill: 'forwards'
    }
  },
  
  slideInUp: {
    name: 'slideInUp',
    keyframes: [
      { transform: 'translateY(100%)' },
      { transform: 'translateY(0)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.slow,
      easing: ANIMATION_CONFIG.easing.easeOut,
      fill: 'forwards'
    }
  }
};

/**
 * Animações de hover/interação
 */
export const INTERACTION_ANIMATIONS = {
  bounce: {
    name: 'bounce',
    keyframes: [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.slow,
      easing: ANIMATION_CONFIG.easing.bounce
    }
  },
  
  pulse: {
    name: 'pulse',
    keyframes: [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.slow,
      easing: ANIMATION_CONFIG.easing.easeInOut
    }
  },
  
  shake: {
    name: 'shake',
    keyframes: [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(0)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.normal,
      easing: ANIMATION_CONFIG.easing.easeInOut
    }
  },
  
  glow: {
    name: 'glow',
    keyframes: [
      { boxShadow: '0 0 5px rgba(37, 99, 235, 0.5)' },
      { boxShadow: '0 0 20px rgba(37, 99, 235, 0.8)' },
      { boxShadow: '0 0 5px rgba(37, 99, 235, 0.5)' }
    ],
    options: {
      duration: ANIMATION_CONFIG.duration.extraSlow,
      easing: ANIMATION_CONFIG.easing.easeInOut,
      iterationCount: Infinity
    }
  }
};

/**
 * Função para animar um elemento com Web Animations API
 */
export function animateElement(element, animationName, customOptions = {}) {
  const animation = ENTRANCE_ANIMATIONS[animationName] || INTERACTION_ANIMATIONS[animationName];
  
  if (!animation) {
    console.warn(`Animação '${animationName}' não encontrada`);
    return null;
  }
  
  const options = { ...animation.options, ...customOptions };
  
  return element.animate(animation.keyframes, options);
}

/**
 * Função para criar animação de typing (máquina de escrever)
 */
export class TypingAnimation {
  constructor(element, text, options = {}) {
    this.element = element;
    this.text = text;
    this.options = {
      speed: 50, // ms por caractere
      delay: 0, // delay antes de começar
      cursor: true, // mostrar cursor piscando
      cursorChar: '|',
      onComplete: null,
      ...options
    };
    
    this.currentIndex = 0;
    this.isComplete = false;
  }
  
  start() {
    this.element.textContent = '';
    
    if (this.options.cursor) {
      this.addCursor();
    }
    
    setTimeout(() => {
      this.type();
    }, this.options.delay);
  }
  
  type() {
    if (this.currentIndex < this.text.length) {
      const currentText = this.text.slice(0, this.currentIndex + 1);
      this.element.textContent = currentText;
      
      if (this.options.cursor) {
        this.element.textContent += this.options.cursorChar;
      }
      
      this.currentIndex++;
      setTimeout(() => this.type(), this.options.speed);
    } else {
      this.isComplete = true;
      
      if (this.options.cursor) {
        this.animateCursor();
      }
      
      if (this.options.onComplete) {
        this.options.onComplete();
      }
    }
  }
  
  addCursor() {
    this.element.textContent += this.options.cursorChar;
  }
  
  animateCursor() {
    setInterval(() => {
      const text = this.element.textContent;
      if (text.endsWith(this.options.cursorChar)) {
        this.element.textContent = text.slice(0, -1);
      } else {
        this.element.textContent += this.options.cursorChar;
      }
    }, 500);
  }
}

/**
 * Função para contar números animadamente
 */
export class CounterAnimation {
  constructor(element, targetNumber, options = {}) {
    this.element = element;
    this.target = parseInt(targetNumber);
    this.options = {
      duration: 2000, // duração total em ms
      startValue: 0,
      easing: 'easeOutExpo',
      suffix: '',
      prefix: '',
      separator: '',
      onUpdate: null,
      onComplete: null,
      ...options
    };
    
    this.current = this.options.startValue;
  }
  
  start() {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.options.duration, 1);
      
      // Aplicar easing
      const easedProgress = this.easeOutExpo(progress);
      
      this.current = Math.floor(this.options.startValue + (this.target - this.options.startValue) * easedProgress);
      
      // Formatar e exibir
      let displayValue = this.current.toString();
      
      if (this.options.separator && this.current >= 1000) {
        displayValue = this.current.toLocaleString();
      }
      
      this.element.textContent = this.options.prefix + displayValue + this.options.suffix;
      
      if (this.options.onUpdate) {
        this.options.onUpdate(this.current);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        if (this.options.onComplete) {
          this.options.onComplete();
        }
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }
}

/**
 * Função para scroll suave para elemento
 */
export function smoothScrollTo(element, options = {}) {
  const config = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
    offset: 0, // offset adicional
    ...options
  };
  
  if (typeof element === 'string') {
    element = document.querySelector(element);
  }
  
  if (!element) {
    console.warn('Elemento não encontrado para scroll');
    return;
  }
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - config.offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: config.behavior
  });
}

/**
 * Função para criar parallax simples
 */
export class ParallaxElement {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      speed: 0.5, // velocidade do parallax (0 a 1)
      direction: 'vertical', // 'vertical' ou 'horizontal'
      ...options
    };
    
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  
  handleScroll() {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * this.options.speed;
    
    if (this.options.direction === 'vertical') {
      this.element.style.transform = `translateY(${parallax}px)`;
    } else {
      this.element.style.transform = `translateX(${parallax}px)`;
    }
  }
  
  destroy() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
}

/**
 * Função para criar efeito de float/flutuação
 */
export function createFloatAnimation(element, options = {}) {
  const config = {
    amplitude: 10, // altura da flutuação em px
    frequency: 2000, // duração de um ciclo em ms
    delay: 0,
    ...options
  };
  
  const animation = element.animate([
    { transform: 'translateY(0px)' },
    { transform: `translateY(-${config.amplitude}px)` },
    { transform: 'translateY(0px)' }
  ], {
    duration: config.frequency,
    iterations: Infinity,
    easing: 'ease-in-out',
    delay: config.delay
  });
  
  return animation;
}

/**
 * Utilitário para detectar se o usuário prefere movimento reduzido
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Wrapper para animações que respeita preferências de acessibilidade
 */
export function safeAnimate(element, animationName, options = {}) {
  if (prefersReducedMotion()) {
    // Se o usuário prefere movimento reduzido, aplicar apenas o estado final
    element.style.opacity = '1';
    element.style.transform = 'none';
    return null;
  }
  
  return animateElement(element, animationName, options);
}

/**
 * Inicializar todas as animações da página
 */
export function initPageAnimations() {
  // Criar observer para animações de entrada
  const observer = new AnimationObserver({
    animationClass: 'animate-in',
    once: true
  });
  
  // Observar todos os elementos com data-animate
  observer.observeAll('[data-animate]');
  
  // Inicializar contadores
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(counter => {
    const targetValue = counter.dataset.counter;
    const counterAnimation = new CounterAnimation(counter, targetValue);
    
    // Iniciar quando o elemento entrar na viewport
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counterAnimation.start();
          counterObserver.unobserve(entry.target);
        }
      });
    });
    
    counterObserver.observe(counter);
  });
  
  // Inicializar parallax
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  parallaxElements.forEach(element => {
    const speed = parseFloat(element.dataset.parallax) || 0.5;
    new ParallaxElement(element, { speed });
  });
  
  return observer;
}

// Export default com todas as funções principais
export default {
  AnimationObserver,
  TypingAnimation,
  CounterAnimation,
  ParallaxElement,
  animateElement,
  smoothScrollTo,
  createFloatAnimation,
  safeAnimate,
  initPageAnimations,
  ANIMATION_CONFIG,
  ENTRANCE_ANIMATIONS,
  INTERACTION_ANIMATIONS
};