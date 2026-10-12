import React, { useId } from 'react';

export default function DentalScene({ position = 45 }) {
  const id = useId().replace(/:/g, '');
  const paint = name => `url(#${id}-${name})`;
  return <svg className="rd-dental-scene" viewBox="0 0 640 500" role="img" aria-label="Ilustração interativa de cadeira odontológica com encosto ajustável">
    <defs>
      <linearGradient id={`${id}-green`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#439d84" /><stop offset=".48" stopColor="#147b65" /><stop offset="1" stopColor="#075743" /></linearGradient>
      <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff" /><stop offset=".5" stopColor="#f3f7f4" /><stop offset="1" stopColor="#bdcec6" /></linearGradient>
      <linearGradient id={`${id}-side`}><stop stopColor="#b1c7bc" /><stop offset="1" stopColor="#e8efeb" /></linearGradient>
      <radialGradient id={`${id}-light`}><stop stopColor="#fff" stopOpacity=".9" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      <filter id={`${id}-shadow`} x="-30%" y="-50%" width="160%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
    </defs>
    <circle cx="361" cy="217" r="207" fill="#deeee5" opacity=".62" />
    <circle cx="361" cy="217" r="169" fill="none" stroke="#c4ded0" strokeWidth="1" />
    <path d="M0 396 Q320 372 640 396" fill="none" stroke="#caddd1" />
    <ellipse cx="325" cy="441" rx="210" ry="16" fill="#7caa95" opacity=".15" filter={paint('shadow')} />
    <g aria-hidden="true" className="rd-scene-plant">
      <path d="M76 375V292M76 331Q42 322 43 288Q77 290 76 331M77 315Q110 308 110 277Q77 280 77 315M74 299Q47 279 59 256Q82 269 74 299" fill="#87b8a1" stroke="#5d987c" strokeWidth="2" />
      <path d="M52 364H100L95 407H58Z" fill={paint('metal')} /><path d="M52 364H100" stroke="#b0c6b9" strokeWidth="4" />
    </g>
    <g>
      <path d="M418 420V145Q418 132 409 128L325 93" stroke="#b8c9c1" strokeWidth="16" fill="none" strokeLinecap="round" />
      <path d="M415 416V146Q415 136 406 132L322 96" stroke="#f8fbf9" strokeWidth="9" fill="none" strokeLinecap="round" />
      <circle cx="417" cy="140" r="13" fill={paint('metal')} stroke="#adc6b8" />
      <g className="rd-light-head">
        <path d="M325 94L306 128" stroke="#a6bfb1" strokeWidth="11" strokeLinecap="round" />
        <g transform="rotate(18 293 147)"><rect x="247" y="126" width="96" height="46" rx="18" fill={paint('metal')} stroke="#b3c9bd" strokeWidth="2" /><rect x="260" y="134" width="68" height="29" rx="12" fill="#d2e2d8" />{[275,293,311].map(x=><circle key={x} cx={x} cy="148" r="7" fill="#fff" stroke="#b2c9bb" />)}<path d="M241 138V162M349 138V162" stroke="#f9fcfa" strokeWidth="7" strokeLinecap="round" /></g>
        <ellipse cx="290" cy="214" rx="96" ry="55" fill={paint('light')} />
      </g>
    </g>
    <g>
      <path d="M239 407L324 399L385 431Q392 440 379 444H218Q205 440 212 433Z" fill={paint('side')} stroke="#a9c3b4" />
      <path d="M241 397L320 390L377 424Q383 431 370 434H222Q211 430 218 423Z" fill={paint('metal')} />
      <path d="M272 325H318L313 401H259Z" fill={paint('side')} /><path d="M270 325H311L305 391H258Z" fill={paint('metal')} /><path d="M270 345H311M266 363H309" stroke="#ceddd4" strokeWidth="2" />
      <path d="M227 299L329 289L349 319L243 333Q224 325 227 299Z" fill={paint('metal')} stroke="#aec7b8" />
      <g className="rd-chair-back" style={{ transform: `rotate(${-10 + position * .48}deg)`, transformOrigin: '247px 292px' }}>
        <path d="M203 280L168 196Q160 175 177 165L205 153Q220 150 228 172L264 267Q272 291 249 305L227 309Z" fill={paint('metal')} stroke="#a3bdb0" strokeWidth="2" />
        <path d="M204 274L172 191Q166 177 181 171L206 161Q218 159 223 175L257 264Q264 281 248 291L230 297Q212 303 204 274Z" fill={paint('green')} />
        <path d="M181 184L212 264Q217 279 230 280" stroke="#83bfaa" strokeWidth="3" opacity=".55" fill="none" />
        <path d="M187 157L180 139" stroke="#b0c7ba" strokeWidth="8" /><rect x="153" y="112" width="53" height="48" rx="16" transform="rotate(-21 178 136)" fill={paint('metal')} stroke="#aac3b5" /><rect x="156" y="113" width="45" height="40" rx="13" transform="rotate(-21 178 136)" fill={paint('green')} /><path d="M162 124L172 146" stroke="#82bca5" strokeWidth="2" opacity=".6" />
      </g>
      <path d="M242 286L303 268Q317 264 339 273L375 291L306 316Q280 321 249 308Q237 302 242 286Z" fill={paint('green')} stroke="#0d6954" strokeWidth="2" />
      <path d="M250 286L306 276Q326 273 348 285" stroke="#77b69f" strokeWidth="3" fill="none" opacity=".6" />
      <path d="M306 316L375 291L434 329Q444 339 429 347L394 361Q382 365 373 356Z" fill={paint('metal')} stroke="#acc4b7" />
      <path d="M307 310L373 285L431 319Q442 327 429 334L397 348Q383 353 373 345Z" fill={paint('green')} stroke="#09634e" strokeWidth="2" />
      <path d="M316 309L373 292L420 320" stroke="#64a98c" strokeWidth="3" fill="none" opacity=".5" />
      <path d="M264 288V261Q264 252 254 254L211 264" fill="none" stroke="#acc5b7" strokeWidth="9" strokeLinecap="round" /><path d="M207 260L260 249" stroke="#126d57" strokeWidth="13" strokeLinecap="round" /><path d="M207 257L257 247" stroke="#4c9d81" strokeWidth="5" strokeLinecap="round" />
    </g>
    <g className="rd-scene-tray">
      <path d="M499 398V257L476 242" stroke="#b2c9bc" strokeWidth="9" fill="none" strokeLinecap="round" /><path d="M496 398V260" stroke="#fafffc" strokeWidth="5" />
      <ellipse cx="498" cy="406" rx="29" ry="9" fill={paint('metal')} stroke="#afc8b9" />
      <path d="M442 228L506 219L546 235L480 246Z" fill="#fff" stroke="#b6cdbf" strokeWidth="2" /><path d="M443 230V240L480 255L546 244V235" fill={paint('metal')} stroke="#b6cdbf" />
      <path d="M472 246Q459 317 474 337T492 323V249M490 247Q490 322 506 335T521 317V243" fill="none" stroke="#99b7a5" strokeWidth="3" />
      <path d="M469 228L473 208M484 226L487 205M502 224L505 209" stroke="#86a999" strokeWidth="5" strokeLinecap="round" />
    </g>
    <g className="rd-sparkle rd-sparkle-one" stroke="#349978" strokeWidth="2" fill="none"><path d="M124 136V156M114 146H134" /><circle cx="132" cy="218" r="4" /></g>
    <g className="rd-sparkle rd-sparkle-two" stroke="#349978" strokeWidth="2" fill="none"><path d="M529 133V149M521 141H537" /><circle cx="559" cy="287" r="3" /></g>
  </svg>;
}
