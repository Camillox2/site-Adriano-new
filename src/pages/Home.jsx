import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { PAGE_META } from '../data/pageMeta';
import SafeSuspense from '../components/SafeSuspense';
import lazyWithPreload from '../utils/lazyWithPreload';

const ResultsSection = lazyWithPreload(() => import('../components/ResultsSection'));
const AboutSection = lazyWithPreload(() => import('../components/AboutSection'));
const HifuSection = lazyWithPreload(() => import('../components/HifuSection'));
const TestimonialsSection = lazyWithPreload(() => import('../components/TestimonialsSection'));
const ServicesSection = lazyWithPreload(() => import('../components/ServicesSection'));
const ContactSection = lazyWithPreload(() => import('../components/ContactSection'));

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
        <SafeSuspense>
          <AboutSection />
        </SafeSuspense>
        <SafeSuspense>
          <ResultsSection />
        </SafeSuspense>
        <SafeSuspense>
          <HifuSection />
        </SafeSuspense>
        <SafeSuspense>
          <TestimonialsSection />
        </SafeSuspense>
        <SafeSuspense>
          <ServicesSection />
        </SafeSuspense>
        <SafeSuspense>
          <ContactSection />
        </SafeSuspense>
      </main>
      <Footer />
    </div>
  );
};

// Usado por preloadRoute (App.jsx) antes de hidratar a página inicial
Home.preload = () => Promise.all(
  [ResultsSection, AboutSection, HifuSection, TestimonialsSection, ServicesSection, ContactSection].map((section) => section.preload())
);

export default Home;
