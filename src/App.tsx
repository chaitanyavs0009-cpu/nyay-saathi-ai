import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { StatsSection } from './components/StatsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { InteractiveDialogs } from './components/InteractiveDialogs';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { Language, FooterLink } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  
  // Page Routing State: 'home' | 'about' | 'contact'
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#about' || window.location.pathname === '/about') {
        return 'about';
      }
      if (window.location.hash === '#contact' || window.location.pathname === '/contact' || window.location.hash === '#contact-us') {
        return 'contact';
      }
    }
    return 'home';
  });

  // Listen to hash changes (browser Back/Forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (window.location.hash === '#contact' || window.location.hash === '#contact-us') {
        setCurrentPage('contact');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (!window.location.hash || window.location.hash === '#home' || window.location.hash === '#') {
        setCurrentPage('home');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Modal / Interactive Dialog State
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    actionKey: string | null;
    title: string | null;
    linkData?: FooterLink | null;
  }>({
    isOpen: false,
    actionKey: null,
    title: null,
    linkData: null,
  });

  const navigateTo = (page: 'home' | 'about' | 'contact') => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleActionClick = (action: string, title?: string, linkData?: FooterLink) => {
    // Intercept 'about-us' to navigate directly to the separate About Us page
    if (action === 'about-us') {
      navigateTo('about');
      return;
    }

    // Intercept 'contact-us' to navigate directly to the separate Contact Us page
    if (action === 'contact-us' || action === 'contact') {
      navigateTo('contact');
      return;
    }

    // Intercept 'home' to navigate back to homepage
    if (action === 'home') {
      navigateTo('home');
      return;
    }

    setDialogState({
      isOpen: true,
      actionKey: action,
      title: title || null,
      linkData: linkData || null,
    });
  };

  const closeDialog = () => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
  };

  // If on About Us page, render the dedicated separate About Us page layout
  if (currentPage === 'about') {
    return (
      <>
        <AboutUsPage
          language={language}
          onLanguageChange={setLanguage}
          onBackToHome={() => navigateTo('home')}
          onActionClick={handleActionClick}
        />

        {/* Interactive Modal System */}
        <InteractiveDialogs
          isOpen={dialogState.isOpen}
          onClose={closeDialog}
          language={language}
          actionKey={dialogState.actionKey}
          title={dialogState.title}
          linkData={dialogState.linkData}
        />
      </>
    );
  }

  // If on Contact Us page, render the dedicated separate Contact Us page layout
  if (currentPage === 'contact') {
    return (
      <>
        <ContactUsPage
          language={language}
          onLanguageChange={setLanguage}
          onBackToHome={() => navigateTo('home')}
          onActionClick={handleActionClick}
        />

        {/* Interactive Modal System */}
        <InteractiveDialogs
          isOpen={dialogState.isOpen}
          onClose={closeDialog}
          language={language}
          actionKey={dialogState.actionKey}
          title={dialogState.title}
          linkData={dialogState.linkData}
        />
      </>
    );
  }

  // Otherwise, render the unchanged original Homepage
  return (
    <div className="min-h-screen bg-[#F4F9FD] text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Bar */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onActionClick={handleActionClick}
      />

      {/* Main Body (Vertical Structure) */}
      <main className="flex-1 flex flex-col">
        {/* 1. What is it / Hero Section */}
        <HeroSection
          language={language}
          onActionClick={handleActionClick}
        />

        {/* 2. Features We Have */}
        <FeaturesSection
          language={language}
        />

        {/* 3. Stats Section */}
        <StatsSection
          language={language}
        />

        {/* 4. Reviews by User (Rectangular boxes, auto slide & arrows) + Book Appointment CTA below */}
        <ReviewsSection
          language={language}
          onActionClick={handleActionClick}
        />
      </main>

      {/* Footer Section */}
      <Footer
        language={language}
        onActionClick={handleActionClick}
      />

      {/* Interactive Modal System for all clickable elements */}
      <InteractiveDialogs
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        language={language}
        actionKey={dialogState.actionKey}
        title={dialogState.title}
        linkData={dialogState.linkData}
      />
    </div>
  );
}
