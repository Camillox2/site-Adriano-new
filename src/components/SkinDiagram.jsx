import React, { useState } from 'react';

/**
 * Diagrama interativo: onde o ultrassom microfocado atua na pele.
 * O visitante escolhe a profundidade e vê o ponto focal na camada correspondente.
 */
const DEPTHS = [
  {
    id: '1.5',
    label: '1,5 mm',
    layer: 'Derme superficial',
    focusY: 152,
    description:
      'Energia superficial que melhora a qualidade da pele, suaviza linhas finas e dá luminosidade.',
  },
  {
    id: '3.0',
    label: '3,0 mm',
    layer: 'Derme profunda',
    focusY: 208,
    description:
      'Estímulo intenso de colágeno na derme profunda — firmeza e espessura da pele a médio prazo.',
  },
  {
    id: '4.5',
    label: '4,5 mm',
    layer: 'SMAS',
    focusY: 264,
    description:
      'A camada SMAS é a mesma tratada no lifting cirúrgico. Aqui nasce o efeito lifting do HIFU.',
  },
];

const LAYERS = [
  { name: 'Epiderme', y: 120, height: 26, fill: '#fde8d7' },
  { name: 'Derme', y: 146, height: 88, fill: '#f8cfb0' },
  { name: 'SMAS', y: 234, height: 56, fill: '#f0b287' },
  { name: 'Músculo', y: 290, height: 50, fill: '#e28a76' },
];

const SkinDiagram = () => {
  const [active, setActive] = useState(DEPTHS[2]);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 md:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* SVG */}
        <div>
          <svg
            viewBox="0 0 480 360"
            className="w-full h-auto select-none"
            role="img"
            aria-label={`Diagrama das camadas da pele com o ponto focal do HIFU em ${active.label}, na camada ${active.layer}`}
          >
            <defs>
              <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Camadas da pele */}
            {LAYERS.map((layer) => (
              <g key={layer.name}>
                <rect x="40" y={layer.y} width="400" height={layer.height} fill={layer.fill} rx="3" />
                <text
                  x="52"
                  y={layer.y + layer.height / 2 + 4}
                  fontSize="13"
                  fontWeight="600"
                  fill="#7c4a2d"
                  opacity="0.85"
                >
                  {layer.name}
                </text>
              </g>
            ))}

            {/* Ponteira do equipamento */}
            <g style={{ transition: 'transform 0.4s ease' }}>
              <rect x="200" y="52" width="80" height="38" rx="10" fill="#1e293b" />
              <rect x="214" y="90" width="52" height="16" rx="4" fill="#475569" />
              <text x="240" y="76" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">
                HIFU
              </text>
            </g>

            {/* Feixe de ultrassom convergindo até o ponto focal */}
            <polygon
              points={`214,106 266,106 240,${active.focusY}`}
              fill="url(#beam)"
              style={{ transition: 'all 0.45s ease' }}
            />

            {/* Ponto focal pulsante */}
            <circle
              cx="240"
              cy={active.focusY}
              r="6"
              fill="#2563eb"
              className="focal-point"
              style={{ transition: 'cy 0.45s ease' }}
            />
            <circle
              cx="240"
              cy={active.focusY}
              r="14"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.5"
              opacity="0.4"
              style={{ transition: 'cy 0.45s ease' }}
            />

            {/* Régua de profundidade */}
            <line x1="452" y1="120" x2="452" y2="290" stroke="#cbd5e1" strokeWidth="1.5" />
            {DEPTHS.map((d) => (
              <g key={d.id}>
                <line x1="446" y1={d.focusY} x2="458" y2={d.focusY} stroke="#94a3b8" strokeWidth="1.5" />
                <text
                  x="464"
                  y={d.focusY + 4}
                  fontSize="11"
                  fill={active.id === d.id ? '#2563eb' : '#94a3b8'}
                  fontWeight={active.id === d.id ? '700' : '400'}
                  textAnchor="start"
                >
                  {d.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Controles e explicação */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Escolha a profundidade e veja onde o HIFU atua
          </h3>
          <p className="text-slate-600 text-sm mb-6">
            O mesmo equipamento trata três profundidades diferentes — é isso que
            torna o resultado completo.
          </p>

          <div className="flex flex-wrap gap-2.5 mb-6" role="tablist" aria-label="Profundidades de tratamento">
            {DEPTHS.map((depth) => (
              <button
                key={depth.id}
                onClick={() => setActive(depth)}
                role="tab"
                aria-selected={active.id === depth.id}
                className={`px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  active.id === depth.id
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {depth.label}
              </button>
            ))}
          </div>

          <div key={active.id} className="animate-fade-in bg-primary-50/60 border border-primary-100 rounded-2xl p-5">
            <span className="block font-bold text-primary-800">{active.layer}</span>
            <p className="text-slate-700 text-sm md:text-base mt-1.5 leading-relaxed">
              {active.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinDiagram;
