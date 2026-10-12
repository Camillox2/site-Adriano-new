import React, { useId } from 'react';

export default function SmileMark() {
  const id = useId().replace(/:/g, '');
  return <svg className="rd-smile-mark" viewBox="0 0 360 88" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-ink`}><stop stopColor="#3b9b78" /><stop offset=".55" stopColor="#047857" /><stop offset="1" stopColor="#238e69" /></linearGradient>
      <clipPath id={`${id}-reveal`}><rect className="rd-smile-reveal" width="360" height="88" /></clipPath>
    </defs>
    <g clipPath={`url(#${id}-reveal)`}>
      <path className="rd-smile-ribbon" d="M19 15C104 70 248 71 337 14C261 93 96 94 19 15Z" fill={`url(#${id}-ink)`} />
      <path className="rd-smile-fine" d="M49 39C127 85 236 85 309 38" fill="none" stroke="#81bba1" strokeWidth="1.1" strokeLinecap="round" />
      <path className="rd-smile-corner" d="M14 10Q21 13 23 24M333 24Q335 14 344 9" fill="none" stroke="#258c66" strokeWidth="2" strokeLinecap="round" />
    </g>
    <path className="rd-smile-star" d="M350 1Q350 10 359 12Q350 13 349 22Q348 13 339 11Q348 10 350 1Z" fill="#047857" />
  </svg>;
}
