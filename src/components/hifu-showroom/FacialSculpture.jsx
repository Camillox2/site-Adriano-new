import React from 'react';
import { memo } from 'react';

// Authored curves keep the silhouette and features stable at every viewport size.
const outline = 'M388 88C453 65 519 90 540 146C552 178 547 206 544 231C541 251 544 274 554 294L574 326Q580 340 560 344L546 347Q541 362 550 376Q558 382 547 389Q554 401 544 412L537 416C535 449 514 470 480 480C439 486 403 456 379 426C347 392 322 362 310 317C292 257 299 187 324 141C340 112 362 95 388 88Z';
const neck = 'M363 403C384 455 390 504 369 539C352 563 303 565 261 595L224 635H642C612 592 550 577 511 554C481 536 477 511 484 479C440 486 400 455 363 403Z';
const jaw = 'M358 355C373 416 419 467 463 478C495 487 530 459 537 416';
const parallels = Array.from({length:31},(_,i)=>{
  const y=111+i*12;
  return `M285 ${y}C348 ${y-24} 398 ${y+24} 451 ${y+9}S536 ${y-21} 584 ${y+4}`;
}).join(' ');
const meridians = Array.from({length:23},(_,i)=>{
  const x=302+i*11;
  return `M${x} 67C${x-33} 157 ${x-30} 229 ${x+5} 295S${x+32} 411 ${x-9} 489`;
}).join(' ');
const neckLines=Array.from({length:16},(_,i)=>`M${349+i*10} 417C${390+i*5} 489 ${354+i*9} 539 ${254+i*25} 643`).join(' ');

export default memo(function FacialSculpture(){
  return <div className="face-float"><svg className="face-art facial-sculpture" viewBox="0 0 800 700" role="img" aria-label="Rosto de perfil em escultura vetorial, com olhos, nariz, lábios e linha da mandíbula definidos. Ilustração conceitual de contorno facial, sem previsão de resultado.">
    <defs>
      <linearGradient id="portrait-skin" x1=".15" y1=".2" x2=".9" y2=".7"><stop stopColor="#83b7ca" stopOpacity=".12"/><stop offset=".45" stopColor="#c9e6ef" stopOpacity=".72"/><stop offset=".8" stopColor="#f8fdff"/><stop offset="1" stopColor="#89bed1" stopOpacity=".65"/></linearGradient>
      <linearGradient id="portrait-wire" x1="0" y1="0" x2="1" y2=".3"><stop stopColor="#6398ae" stopOpacity=".05"/><stop offset=".45" stopColor="#467f99" stopOpacity=".45"/><stop offset="1" stopColor="#286686" stopOpacity=".6"/></linearGradient>
      <linearGradient id="portrait-neck" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#8bb9cb" stopOpacity=".55"/><stop offset="1" stopColor="#d5ebf2" stopOpacity="0"/></linearGradient>
      <linearGradient id="portrait-rim"><stop stopColor="#408ba7" stopOpacity="0"/><stop offset=".5" stopColor="#237b9b"/><stop offset="1" stopColor="#80d1e7"/></linearGradient>
      <linearGradient id="portrait-scan"><stop stopColor="#6fcce8" stopOpacity="0"/><stop offset=".6" stopColor="#edfaff"/><stop offset="1" stopColor="#4aafcd" stopOpacity="0"/></linearGradient>
      <clipPath id="portrait-clip"><path d={outline}/></clipPath>
      <clipPath id="portrait-neck-clip"><path d={neck}/></clipPath>
      <clipPath id="portrait-scan-clip"><rect className="face-scan-window" x="240" y="70" width="370" height="55"/></clipPath>
    </defs>
    <path d={neck} fill="url(#portrait-neck)"/>
    <g clipPath="url(#portrait-neck-clip)" fill="none" stroke="#5b96b0" strokeWidth=".7" opacity=".27"><path d={neckLines}/>{[0,1,2,3,4,5].map(i=><path key={i} d={`M230 ${567+i*14}Q413 ${514+i*22} 650 ${600+i*13}`}/>)}</g>
    <path d={outline} fill="url(#portrait-skin)" stroke="url(#portrait-wire)" strokeWidth="1.2"/>
    <g clipPath="url(#portrait-clip)" fill="none" stroke="url(#portrait-wire)" strokeWidth=".75"><path d={parallels}/><path d={meridians}/></g>
    <path d="M368 285C339 266 331 289 343 321C351 344 364 355 374 342M363 301Q343 285 352 317L365 325" fill="none" stroke="#497f97" strokeWidth="1.6" opacity=".65"/>
    <g fill="none" stroke="#30627e" strokeLinecap="round" strokeLinejoin="round">
      <path d="M449 247Q477 229 509 249" strokeWidth="2.7" opacity=".75"/>
      <path d="M449 274Q477 253 504 271Q478 286 451 275" strokeWidth="1.7"/>
      <path d="M478 264Q483 274 477 279" strokeWidth="3"/>
      <path d="M512 272C513 295 522 313 537 326Q544 331 540 335L524 340M539 340Q546 334 552 339" strokeWidth="1.2" opacity=".67"/>
      <path d="M513 380Q532 371 550 381L537 387Q526 384 513 380M513 380Q531 400 547 391" strokeWidth="1.5"/>
      <path d="M510 416Q523 421 535 416M407 302Q438 299 453 321M398 373Q416 405 442 418" strokeWidth="1" opacity=".32"/>
    </g>
    <path d={jaw} fill="none" stroke="url(#portrait-rim)" strokeWidth="2.2"/>
    <path className="portrait-jaw-current" d={jaw} fill="none" stroke="#f5feff" strokeWidth="3.5" pathLength="100"/>
    <g clipPath="url(#portrait-clip)"><g clipPath="url(#portrait-scan-clip)" fill="none" stroke="#e9fcff" strokeWidth="1.5"><path d={parallels}/><path d={meridians}/></g></g>
    <g className="face-scan-beam"><path d="M275 80H592" stroke="url(#portrait-scan)" strokeWidth="1"/></g>
    <path d="M456 466L546 499H656" fill="none" stroke="#5b98b1" strokeWidth="1"/>
    <circle cx="456" cy="466" r="4" fill="#f5fdff" stroke="#398bab"/><circle className="portrait-focus-ring" cx="456" cy="466" r="12" fill="none" stroke="#398bab" opacity=".4"/>
    <text x="566" y="488" className="portrait-caption">CONTORNO</text><text x="566" y="518" className="portrait-caption secondary">MANDIBULAR</text>
    <path d="M312 616Q407 557 508 590" fill="none" stroke="#6a9eb5" strokeWidth=".8" opacity=".4"/>
  </svg></div>;
});
