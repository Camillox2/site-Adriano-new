import React from 'react';
import { memo, useEffect, useRef } from 'react';
import { animateScene } from './motionRuntime';

// Shared geometry and combined paths: four DOM updates instead of 101.
export default memo(function WaveField({ paused = false, className = '' }) {
  const svg = useRef(null);
  const clock = useRef(0);
  const uid = className.includes('consult') ? 'hifu-consult' : 'hifu-hero';
  useEffect(() => {
    if (window.__PRERENDER__) return undefined;
    const node = svg.current;
    const surface = node.querySelector('[data-surface]');
    const ribs = node.querySelector('[data-ribs]');
    const pulse = node.querySelector('[data-pulse]');
    const sparks = node.querySelector('[data-sparks]');
    const parent = node.parentElement;
    let mx = 0, my = 0, tx = 0, ty = 0, px = .7, py = .5, ripple = 0, box = null;
    const resize = new ResizeObserver(() => { box = null; });
    resize.observe(parent);
    const move = event => {
      if (event.pointerType === 'touch') return;
      box ||= parent.getBoundingClientRect();
      tx = (event.clientX - box.left) / box.width - .5;
      ty = (event.clientY - box.top) / box.height - .5;
      px = tx + .5; py = ty + .5; ripple = Math.min(1, ripple + .16);
    };
    const leave = () => { tx = 0; ty = 0; box = null; };
    parent.addEventListener('pointermove', move, { passive: true });
    parent.addEventListener('pointerleave', leave);
    const stop = animateScene(node, (t, delta, compact) => {
      const rows = compact ? 23 : 35, columns = compact ? 42 : 60;
      const blend = 1 - Math.exp(-delta * 5);
      mx += (tx - mx) * blend; my += (ty - my) * blend;
      ripple *= Math.exp(-delta * .7);
      const points = [];
      let path = '', ribPath = '', pulsePath = '', sparkPath = '';
      const travel = (t * .09) % 1;
      const rowTrig = Array.from({length:rows+1},(_,i)=>{const v=i/rows;return [v,Math.cos(v*2.1),Math.sin(v*2.1),Math.cos(v),Math.sin(v)];});
      for (let j = 0; j <= columns; j++) {
        const u = j / columns, envelope = Math.sin(Math.PI * u);
        const baseline = 580 - 325 * Math.exp(-(((u - .74) / .29) ** 2));
        const sx = Math.sin(u * 9.2 - t * .63), cx = Math.cos(u * 9.2 - t * .63);
        const sy = Math.sin(u * 4.7 + t * .37), cy = Math.cos(u * 4.7 + t * .37);
        const column = [];
        for (let i = 0; i <= rows; i++) {
          const [v, cv2, sv2, cv, sv] = rowTrig[i];
          const distance = Math.hypot((u - px) * 1.7, (v - py) * .45);
          const pointerWave = ripple > .01 ? ripple * Math.sin(distance * 20 - t * 3.2) * Math.exp(-distance * 4.5) * 27 : 0;
          const x = -150 + u * 1750 + v * 105 + mx * 36 * envelope;
          const y = baseline + v * 265 + (sx * cv2 + cx * sv2) * 94 * envelope + (cy * cv - sy * sv) * 32 + my * 38 * envelope + pointerWave;
          column.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        }
        points.push(column);
      }
      for (let i = 0; i <= rows; i++) for (let j = 0; j <= columns; j++) path += `${j ? 'L' : 'M'}${points[j][i]}`;
      for (let j = 0; j <= columns; j += 3) for (let i = 0; i <= rows; i++) ribPath += `${i ? 'L' : 'M'}${points[j][i]}`;
      const pulsePosition = travel * columns;
      const left = Math.floor(pulsePosition), right = Math.min(left + 1, columns), fraction = pulsePosition - left;
      for (let i = 0; i <= rows; i++) {
        const [ax,ay] = points[left][i].split(',').map(Number);
        const [bx,by] = points[right][i].split(',').map(Number);
        pulsePath += `${i ? 'L' : 'M'}${(ax+(bx-ax)*fraction).toFixed(1)},${(ay+(by-ay)*fraction).toFixed(1)}`;
      }
      for (let i = 0; i < 7; i++) {
        const j = Math.round(((t * .025 + i * .143) % .94 + .03) * columns);
        sparkPath += `M${points[Math.min(j, columns)][Math.round((i % 4 + .5) / 4 * rows)]}h.1`;
      }
      surface.setAttribute('d', path); ribs.setAttribute('d', ribPath);
      pulse.setAttribute('d', pulsePath); pulse.style.opacity = String(Math.sin(travel * Math.PI) * .85);
      sparks.setAttribute('d', sparkPath);
    }, { paused, clock, fps: 30 });
    return () => { stop(); resize.disconnect(); parent.removeEventListener('pointermove', move); parent.removeEventListener('pointerleave', leave); };
  }, [paused]);
  return <svg ref={svg} className={`wave-field ${className}`} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><linearGradient id={`wave-${uid}`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#378fa8" stopOpacity=".04"/><stop offset=".4" stopColor="#2282a5" stopOpacity=".36"/><stop offset=".72" stopColor="#168bb4" stopOpacity=".65"/><stop offset="1" stopColor="#73c9de" stopOpacity=".17"/></linearGradient></defs>
    <path data-surface fill="none" stroke={`url(#wave-${uid})`} strokeWidth=".95" d="M0 650Q900 100 1440 600"/>
    <path data-ribs fill="none" stroke="#3899b5" strokeOpacity=".13" strokeWidth=".65"/>
    <path data-pulse fill="none" stroke="#bdf3ff" strokeWidth="3"/>
    <path data-sparks fill="none" stroke="#baf2ff" strokeWidth="4" strokeLinecap="round"/>
  </svg>;
});
