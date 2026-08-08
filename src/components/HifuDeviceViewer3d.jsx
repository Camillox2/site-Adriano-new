import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { images } from '../assets';

const HifuDeviceViewer3d = () => (
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">
    <div className="grid grid-cols-1 sm:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[24rem] overflow-hidden bg-slate-100">
        <img
          src={images.hifuEquipamento}
          alt="Dr. Adriano Camillo com o equipamento Ultramed HIFU"
          className="absolute inset-0 h-full w-full object-cover object-[55%_52%]"
          loading="lazy"
        />
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary-700">Ultramed HIFU</p>
        <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900">Equipamento real, pronto para a sua clínica</h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          A locação é organizada para que o seu dia de atendimento aconteça com equipamento, ponteiras e orientação alinhados à sua agenda.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-slate-700">
          <li className="flex gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-secondary-600" />Equipamento revisado e higienizado antes da entrega.</li>
          <li className="flex gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-secondary-600" />Ponteiras faciais de 1,5 mm, 3,0 mm e 4,5 mm.</li>
          <li className="flex gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-secondary-600" />Logística e suporte definidos conforme a locação.</li>
        </ul>
      </div>
    </div>
  </div>
);

export default HifuDeviceViewer3d;
