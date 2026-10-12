import React, { useId } from 'react';

const TEETH = [
  { x: 147, y: 225, angle: 23, scale: .65 },
  { x: 192, y: 212, angle: 15, scale: .79 },
  { x: 242, y: 203, angle: 7, scale: .91 },
  { x: 294, y: 198, angle: 2, scale: 1 },
  { x: 346, y: 198, angle: -2, scale: 1 },
  { x: 398, y: 203, angle: -7, scale: .91 },
  { x: 448, y: 212, angle: -15, scale: .79 },
  { x: 493, y: 225, angle: -23, scale: .65 },
];
const TOOTH = 'M-24-16Q0-23 24-16L25 45Q24 63 0 65Q-24 63-25 45Z';

export default function SmileScene() {
  const id = useId().replace(/:/g, '');
  return <svg className="rd-smile-scene" viewBox="40 40 560 430" role="img" aria-label="Ilustração vetorial de sorriso com dentes e brilho em movimento">
    <defs>
      <linearGradient id={`${id}-enamel`} x1="0" y1="0" x2="1" y2=".5"><stop stopColor="#d2e3d8" /><stop offset=".2" stopColor="#fff" /><stop offset=".55" stopColor="#fff" /><stop offset="1" stopColor="#d0e2d5" /></linearGradient>
      <linearGradient id={`${id}-sheen`}><stop stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <radialGradient id={`${id}-halo`}><stop stopColor="#d2eddf" /><stop offset="1" stopColor="#e8f5ee" stopOpacity="0" /></radialGradient>
      <filter id={`${id}-soft`}><feGaussianBlur stdDeviation="7" /></filter>
      <clipPath id={`${id}-teeth`}>{TEETH.map(({x,y,angle,scale},i)=><path key={i} d={TOOTH} transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`} />)}</clipPath>
    </defs>
    <circle cx="320" cy="251" r="213" fill={`url(#${id}-halo)`} />
    <g className="rd-smile-orbit" fill="none" stroke="#72a98c" strokeWidth=".8"><ellipse cx="320" cy="248" rx="237" ry="143" transform="rotate(-12 320 248)" opacity=".3" /><path d="M109 311Q138 390 299 404Q461 411 535 327" strokeDasharray="2 8" opacity=".5" /><circle cx="116" cy="301" r="4" fill="#509b75" /></g>
    <ellipse cx="320" cy="352" rx="164" ry="14" fill="#95bca5" opacity=".17" filter={`url(#${id}-soft)`} />
    <g className="rd-smile-arch">
      <path d="M111 219C184 182 239 164 286 170Q320 181 354 170C416 164 463 183 529 219L509 245Q320 305 131 245Z" fill="#bbdfcb" opacity=".45" />
      <path d="M107 214C179 179 238 173 284 181Q320 197 356 181C408 172 466 181 533 214" fill="none" stroke="#75b69a" strokeWidth="2.2" strokeLinecap="round" />
      {TEETH.map(({x,y,angle,scale},i)=><g className="rd-smile-tooth" key={i} style={{animationDelay:`${Math.abs(i-3.5)*.13}s`}}><g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}><path d={TOOTH} fill={`url(#${id}-enamel)`} stroke="#b0cdbb" strokeWidth="1.5" /><path d="M-15-10Q0-13 15-10M-16 3V36" fill="none" stroke="#fff" strokeWidth="3" opacity=".85" strokeLinecap="round" /><path d="M-16 51Q0 60 16 51" stroke="#d5e6da" strokeWidth="1.2" fill="none" /></g></g>)}
      <g clipPath={`url(#${id}-teeth)`}><rect className="rd-smile-sheen" x="70" y="155" width="70" height="195" fill={`url(#${id}-sheen)`} /></g>
      <path className="rd-smile-lip" d="M111 241C183 287 445 291 529 239C455 310 181 307 111 241Z" fill="#238862" opacity=".85" />
      <path d="M133 263Q320 328 507 261" stroke="#7db798" strokeWidth="1" fill="none" opacity=".4" />
    </g>
    <g className="rd-smile-scene-star" fill="#087558"><path d="M491 141Q494 159 512 161Q495 163 493 182Q489 165 473 163Q489 160 491 141Z" /><path d="M163 330Q165 339 174 341Q165 343 163 352Q161 343 152 341Q161 339 163 330Z" opacity=".65" /></g>
    <g className="rd-smile-signal" fill="none" stroke="#429c72"><circle cx="320" cy="113" r="3" fill="#429c72" /><path d="M320 106V90M320 97H335" strokeWidth="1" opacity=".45" /><circle cx="566" cy="282" r="3" opacity=".5" /></g>
  </svg>;
}
