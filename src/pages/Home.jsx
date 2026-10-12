import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import { PAGE_META } from '../data/pageMeta';
import RedesignHeader from '../components/redesign/RedesignHeader';
import SafeSuspense from '../components/SafeSuspense';
import lazyWithPreload from '../utils/lazyWithPreload';
import DentalHero from '../components/redesign/DentalHero';
import TreatmentExplorer from '../components/redesign/TreatmentExplorer';
import { HifuFeature, DoctorProfile, OfficeExperience, PatientStories, RedesignFooter } from '../components/redesign/HomeSections';
import AppointmentForm from '../components/redesign/AppointmentForm';
import '../styles/redesign.css';

const ResultsSection = lazyWithPreload(() => import('../components/ResultsSection'));

export default function Home() {
  const location = useLocation();
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const id = location.state?.scrollTo || location.hash.slice(1);
    const target = id;
    if (target) document.getElementById(target)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [location.state, location.hash, reducedMotion]);
  const motionPaused = paused || reducedMotion;
  return (
    <div className={`adriano-redesign${motionPaused ? ' motion-paused' : ''}`}>
      <Seo title={PAGE_META['/'].title} description={PAGE_META['/'].description} path="/" />
      <a className="rd-skip" href="#conteudo">Ir para o conteúdo</a>
      <RedesignHeader />
      <main id="conteudo">
        <DentalHero paused={motionPaused} reducedMotion={reducedMotion} onToggleMotion={() => setPaused(value => !value)} />
        <TreatmentExplorer />
        <HifuFeature />
        <DoctorProfile />
        <OfficeExperience />
        <div className="rd-legacy-results"><SafeSuspense><ResultsSection /></SafeSuspense></div>
        <PatientStories />
        <AppointmentForm />
      </main>
      <RedesignFooter />
    </div>
  );
}

Home.preload = () => ResultsSection.preload();
