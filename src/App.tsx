import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { StatsSection } from './components/StatsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { InteractiveDialogs } from './components/InteractiveDialogs';
import { Language, FooterLink } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');

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

  const handleActionClick = (action: string, title?: string, linkData?: FooterLink) => {
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
          onActionClick={handleActionClick}
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
