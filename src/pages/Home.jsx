import React, { useEffect, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { PAGE_META } from '../data/pageMeta';

const ResultsSection = lazy(() => import('../components/ResultsSection'));
const AboutSection = lazy(() => import('../components/AboutSection'));
const HifuSection = lazy(() => import('../components/HifuSection'));
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'));
const ServicesSection = lazy(() => import('../components/ServicesSection'));
const ContactSection = lazy(() => import('../components/ContactSection'));

const Home = () => {
  const location = useLocation();

  // Auto-scroll para a seção pedida pela navegação (menu/rodapé)
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      if (location.state?.scrollTo) {
        window.history.replaceState({}, '');
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white">
      <Seo title={PAGE_META['/'].title} description={PAGE_META['/'].description} path="/" />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={null}>
          <ResultsSection />
        </Suspense>
        <Suspense fallback={null}>
          <HifuSection />
        </Suspense>
        <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={null}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
