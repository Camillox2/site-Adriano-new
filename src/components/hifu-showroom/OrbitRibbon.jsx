import React from 'react';
import { memo } from 'react';

function ribbonPath(row, front) {
  const v = row / 25;
  return Array.from({ length: 81 }, (_, i) => {
    const a = i / 80 * Math.PI + (front ? 0 : Math.PI);
    const x = 400 + (292 + v * 67) * Math.cos(a);
    const y = 485 + (94 + v * 35) * Math.sin(a) - (x - 400) * .38 + Math.sin(a * 2) * 27 + v * 27 * Math.cos(a);
    return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}
const paths = { front: Array.from({length:26},(_,i)=>ribbonPath(i,true)), back: Array.from({length:26},(_,i)=>ribbonPath(i,false)) };

export default memo(function OrbitRibbon({ front = false }) {
  const id = front ? 'hifu-front' : 'hifu-back';
  const arcs = paths[front ? 'front' : 'back'];
  return <div className={`orbit-ribbon ${front ? 'ribbon-front' : 'ribbon-back'}`} aria-hidden="true"><div className="ribbon-drift"><svg viewBox="0 0 800 900" preserveAspectRatio="none">
    <defs><linearGradient id={`ribbon-${id}`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#1387af" stopOpacity=".12"/><stop offset=".26" stopColor="#43acce" stopOpacity=".8"/><stop offset=".52" stopColor="#dbfcff"/><stop offset=".79" stopColor="#308cae" stopOpacity=".74"/><stop offset="1" stopColor="#97d4e8" stopOpacity=".15"/></linearGradient></defs>
    <g fill="none" stroke={`url(#ribbon-${id})`} strokeWidth={front ? '1.3' : '1'}>{arcs.map((d,i)=><path d={d} key={i}/>)}</g>
    <path className="ribbon-current" d={arcs[12]} fill="none" stroke="#edffff" strokeWidth="3" pathLength="100"/>
    <path className="ribbon-current second" d={arcs[20]} fill="none" stroke="#96dcef" strokeWidth="2" pathLength="100"/>
  </svg></div></div>;
});
