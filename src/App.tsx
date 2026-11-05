import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { RouterProvider, useRouter } from './context/RouterContext.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Footer } from './components/Footer.tsx';
import { Preloader } from './components/Preloader.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { MyWorkPage } from './pages/MyWorkPage.tsx';
import { ProjectDetailPage } from './pages/ProjectDetailPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { AiChatbot } from './components/AiChatbot.tsx';

const AppContent: React.FC = () => {
  const { currentPath, projectSlug } = useRouter();

  // Route resolver
  const renderPage = () => {
    if (projectSlug) {
      return <ProjectDetailPage slug={projectSlug} />;
    }

    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/services':
        return <ServicesPage />;
      case '/my-work':
        return <MyWorkPage />;
      case '/contact':
        return <ContactPage />;
      default:
        // Direct matching or fallback
        if (currentPath.startsWith('/my-work')) {
          return <MyWorkPage />;
        }
        return <HomePage />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#050806] text-[#F3F6F3]">
      <Preloader />
      <CustomCursor />
      <Navigation />

      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPath}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AiChatbot />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </LanguageProvider>
  );
}
