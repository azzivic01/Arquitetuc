/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { siteContent } from './content.ts';
import { MotionProvider, useMotionPreference } from './context/MotionContext';
import { soundManager } from './lib/sound';

import { NavigationMenu } from './components/ui/NavigationMenu';
import { CustomCursor } from './components/ui/CustomCursor';

import { Hero } from './sections/Hero';
import { Capitulos } from './sections/Capitulos';
import { Servicos } from './sections/Servicos';
import { Galeria } from './sections/Galeria';
import { Visite } from './sections/Visite';
import { Faq } from './sections/Faq';
import { CtaFinal } from './sections/CtaFinal';
import { UiKit } from './sections/UiKit';
import { Rodape } from './sections/Rodape';

function MainApp() {
  const { isReducedMotion } = useMotionPreference();
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  // Scroll reading progress bar (item b: scroll-linked animation)
  const { scrollYProgress } = useScroll();

  const handleToggleSound = () => {
    const newState = soundManager.toggle();
    setIsSoundPlaying(newState);
  };

  return (
    <div className="relative min-h-screen bg-[var(--tema-color-bg)] text-[var(--tema-color-text)] selection:bg-[var(--tema-color-accent)] selection:text-[var(--tema-color-on-accent)]">
      {/* Skip to Content link for accessibility */}
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/* Subtle Custom Pointer on fine-pointer devices */}
      <CustomCursor />

      {/* Reading Progress Bar (Fixed at very top) */}
      {!isReducedMotion && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-[var(--tema-color-accent-ink)] z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      )}

      {/* 1. Header fixo com navegação, ação principal e som */}
      {siteContent.header.enabled && (
        <NavigationMenu
          brandName={siteContent.brand.name}
          navItems={siteContent.header.nav}
          primaryAction={siteContent.header.primaryAction}
          soundConfig={siteContent.header.sound}
          isSoundPlaying={isSoundPlaying}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* Main Content Landmark */}
      <main id="conteudo-principal" tabIndex={-1} className="outline-none">
        {/* 2. Hero */}
        <Hero content={siteContent.hero} />

        {/* 3. Capítulos */}
        <Capitulos items={siteContent.capitulos} />

        {/* 4. Serviços */}
        <Servicos items={siteContent.servicos} />

        {/* 5. Galeria */}
        <Galeria items={siteContent.galeria} />

        {/* 6. Visite */}
        <Visite content={siteContent.visite} />

        {/* 7. FAQ */}
        <Faq items={siteContent.faq} />

        {/* 8. CTA Final */}
        <CtaFinal content={siteContent.ctaFinal} />

        {/* 9. Laboratório de componentes (UiKit) */}
        <UiKit />
      </main>

      {/* 10. Rodapé */}
      <Rodape content={siteContent.rodape} />
    </div>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <MainApp />
    </MotionProvider>
  );
}
