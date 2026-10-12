import React, { useId } from 'react';

const ENAMEL_OUTLINE = 'M189 123C226 96 253 128 287 128C321 128 348 97 382 116C441 147 416 213 401 265C387 312 386 427 356 446C333 461 328 418 320 380C314 349 308 318 289 319C269 320 261 350 252 384C243 419 235 454 216 440C190 422 189 324 176 284C153 210 138 158 189 123Z';

export function FaceIllustration({ light = false }) {
  const id = useId().replace(/:/g, '');
  const ink = light ? '#087b61' : '#a4e8c9';
  return <svg viewBox="0 0 600 560" className={`rd-face${light ? ' rd-face-light' : ''}`} role="img" aria-label="Perfil facial em linhas vetoriais com ondas ilustrativas do ultrassom microfocado">
    <defs><radialGradient id={`${id}-aura`}><stop stopColor={light ? '#b5deca' : '#4b9e89'} stopOpacity={light ? '.32' : '.17'} /><stop offset="1" stopColor={light ? '#e6f4ed' : '#0f2330'} stopOpacity="0" /></radialGradient><linearGradient id={`${id}-contour`}><stop stopColor={ink} stopOpacity=".42" /><stop offset=".7" stopColor={ink} /><stop offset="1" stopColor={ink} stopOpacity=".6" /></linearGradient></defs>
    <ellipse cx="351" cy="298" rx="230" ry="244" fill={`url(#${id}-aura)`} />
    <g fill="none" stroke={ink} strokeLinecap="round" strokeLinejoin="round">
      <g className="rd-face-hair" opacity=".28" strokeWidth=".9">{[0,1,2,3,4,5,6].map(i=><path key={i} d={`M${85+i*12} 205 C${98+i*9} ${47+i*9}, ${411-i*7} ${-15+i*9}, ${428-i*2} 181`} />)}</g>
      <path className="rd-face-outline" stroke={`url(#${id}-contour)`} strokeWidth="1.8" d="M110 510C140 483 195 467 217 421C240 373 221 315 233 276C204 267 186 235 196 211C206 190 227 197 236 215C239 147 278 111 338 107C392 105 427 132 430 176C433 198 427 213 436 232L466 269Q473 278 459 284L442 287L438 306Q450 315 442 324L434 331Q439 341 432 350L420 364Q405 385 371 382L340 376Q338 414 363 442C390 472 425 484 476 507" />
      <path strokeWidth="1.7" d="M348 188Q385 170 414 187M363 210Q385 199 414 210Q397 224 374 216M374 210Q392 221 410 211M424 303Q435 307 443 306M417 326Q431 321 442 324M420 337Q430 339 435 334M215 217Q202 211 203 231Q205 251 222 248M224 241Q210 230 220 225M278 168Q285 227 321 255Q359 293 349 337M247 291Q274 345 325 359" />
      <path strokeWidth="1.2" opacity=".45" d="M254 174Q252 210 268 241Q287 276 294 311Q304 338 332 348M265 177Q264 211 279 237Q303 272 311 303Q319 330 342 337M276 178Q276 206 291 232Q312 261 326 291Q336 317 351 326" />
      <path className="rd-face-scan" strokeWidth="2.2" strokeDasharray="25 380" opacity=".75" d="M254 174Q252 210 268 241Q287 276 294 311Q304 338 332 348" />
      {[0,1,2,3].map(i=><path className="rd-ultrasound-wave" key={i} style={{ animationDelay: `${i*.8}s` }} strokeWidth={1.8-i*.2} opacity={.65-i*.1} d={`M${416+i*21} ${364-i*9}C${457+i*24} ${367+i*5} ${466+i*28} ${331-i*4} ${450+i*27} ${302-i*13}`} />)}
      <path d="M87 285H225M80 345H289M86 398H330" strokeWidth=".8" opacity=".5" />
    </g>
    {[[225,285],[289,345],[330,398]].map(([x,y],i)=><g key={i}><circle className="rd-face-dot" style={{animationDelay:`${i*.6}s`}} cx={x} cy={y} r="6" fill={ink} /><circle cx={x} cy={y} r="12" fill="none" stroke={ink} opacity=".18" /></g>)}
    <g fill={ink} fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="2"><text x="82" y="275">PELE</text><text x="77" y="335">COLÁGENO</text><text x="82" y="388">CUIDADO</text></g>
  </svg>;
}

export default function TreatmentIllustration({ mode = 'estetica' }) {
  const uid = useId().replace(/:/g, '');
  if (mode === 'face') return <FaceIllustration light />;
  return <svg className="rd-tooth-scene" viewBox="0 0 580 550" role="img" aria-label={`Ilustração vetorial de ${mode === 'implantes' ? 'implante dentário' : mode === 'ortodontia' ? 'dente com aparelho ortodôntico' : 'dente saudável'}`}>
    <defs>
      <linearGradient id={`${uid}-tooth`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" /><stop offset=".4" stopColor="#fafffc" /><stop offset=".8" stopColor="#e1ebe4" /><stop offset="1" stopColor="#bdcec1" /></linearGradient>
      <linearGradient id={`${uid}-implant`}><stop stopColor="#adc6b8" /><stop offset=".45" stopColor="#fff" /><stop offset="1" stopColor="#7ca78f" /></linearGradient>
      <filter id={`${uid}-blur`}><feGaussianBlur stdDeviation="9" /></filter>
      <linearGradient id={`${uid}-shine`}><stop stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".72" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
      <clipPath id={`${uid}-surface`}><path d={ENAMEL_OUTLINE} /></clipPath>
    </defs>
    <circle cx="290" cy="276" r="197" fill="#e1f0e7" />
    <ellipse cx="290" cy="465" rx="106" ry="14" fill="#83a791" opacity=".22" filter={`url(#${uid}-blur)`} />
    <g className="rd-orbit rd-orbit-back" fill="none" stroke="#348b6a" strokeWidth="1.1"><ellipse cx="290" cy="271" rx="227" ry="96" transform="rotate(-39 290 271)" strokeDasharray="2 7" /><circle cx="122" cy="382" r="5" fill="#087558" /></g>
    <g className="rd-tooth-float">
      <path d={ENAMEL_OUTLINE} fill={`url(#${uid}-tooth)`} stroke="#b5cbbd" strokeWidth="2" />
      <path d="M381 145Q413 162 393 224Q378 269 368 345Q359 407 349 425" fill="none" stroke="#a8c5b2" strokeWidth="3" opacity=".26" strokeLinecap="round" />
      <path d="M183 151Q204 126 241 146Q281 170 314 148Q356 124 383 148" stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M177 176Q171 204 191 258Q205 296 207 335" stroke="#fff" strokeWidth="8" fill="none" strokeLinecap="round" opacity=".7" />
      <path d="M291 152Q283 178 292 197M254 333Q272 292 290 295Q314 292 330 326" fill="none" stroke="#cfdfd3" strokeWidth="2" />
      <g clipPath={`url(#${uid}-surface)`}><rect className="rd-enamel-sheen" x="70" y="80" width="82" height="390" fill={`url(#${uid}-shine)`} /></g>
      {mode === 'ortodontia' ? <g><path d="M168 225Q290 257 412 222" fill="none" stroke="#93b3a2" strokeWidth="5" />{[198,259,320,381].map((x,i)=><g key={x} transform={`translate(${x} ${222+(i===0||i===3?0:12)})`}><rect x="-15" y="-14" width="30" height="27" rx="5" fill="#c0d7c9" stroke="#789e8b" /><path d="M-11 0H11M0-10V10" stroke="#fff" strokeWidth="3" /></g>)}</g> : null}
      {mode === 'implantes' ? <g><path d="M230 271H349L330 329H247Z" fill="#edf7f1" /><path d="M257 276H322L307 421Q287 444 270 422Z" fill={`url(#${uid}-implant)`} stroke="#779d87" strokeWidth="2" />{[300,320,340,360,380,400].map(y=><path key={y} d={`M258 ${y}L317 ${y-9}`} stroke="#799e87" strokeWidth="4" />)}<path d="M259 276V258H320V276" fill="#d0e2d7" stroke="#779d87" strokeWidth="2" /></g> : null}
      {mode === 'dtm' ? <g fill="none" stroke="#4d9776" strokeWidth="2"><circle cx="225" cy="210" r="25" opacity=".5" /><circle className="rd-face-dot" cx="225" cy="210" r="36" opacity=".3" /><circle cx="225" cy="210" r="4" fill="#087558" /></g> : null}
    </g>
    <g className="rd-orbit rd-orbit-front" fill="none" stroke="#348b6a" strokeWidth="1.1"><ellipse cx="290" cy="282" rx="239" ry="94" transform="rotate(29 290 282)" /><circle cx="476" cy="363" r="5" fill="#087558" /></g>
    <g className="rd-sparkle" fill="#087558"><path d="M436 95Q437 118 460 119Q437 120 436 143Q435 120 412 119Q435 118 436 95Z" /><circle cx="145" cy="189" r="4" /><circle cx="396" cy="432" r="4" /></g>
  </svg>;
}
