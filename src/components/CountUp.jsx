import React, { useEffect, useRef } from 'react';

/**
 * Número que conta de 0 até `end` quando entra na tela.
 * <CountUp end={30} suffix="+" />
 */
const CountUp = ({ end, suffix = '', prefix = '', duration = 1800, className = '' }) => {
  const containerRef = useRef(null);
  const valueRef = useRef(null);
  const started = useRef(false);
  const finalValue = `${prefix}${end}${suffix}`;

  useEffect(() => {
    const el = containerRef.current;
    const valueEl = valueRef.current;
    if (!el || !valueEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      valueEl.textContent = finalValue;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          // ease-out expo: acelera no início, desacelera no final
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          valueEl.textContent = `${prefix}${Math.round(eased * end)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [duration, end, finalValue, prefix, suffix]);

  return (
    <span ref={containerRef} className={className}>
      <span className="sr-only">{finalValue}</span>
      <span ref={valueRef} aria-hidden="true">{prefix}0{suffix}</span>
    </span>
  );
};

export default CountUp;
