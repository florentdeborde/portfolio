import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Projects } from '@/pages/Projects';
import { About } from '@/pages/About';
import { Mayleo } from '@/pages/projects/Mayleo';
import { Portfolio } from '@/pages/projects/Portfolio';
import { Energeticienne } from '@/pages/projects/Energeticienne';
import { Fertenergie } from '@/pages/projects/Fertenergie';
import { NotFound } from '@/pages/NotFound';
import './index.css';

import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { ScrollToTopButton } from '@/components/common/ScrollToTopButton';
import { SkipLink } from '@/components/common/SkipLink';
import { ThemeProvider } from '@/context/ThemeContext';

import { ROUTES } from './config/routes';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-wrapper">
          <ScrollToTop />
          <SkipLink />
          <div className="ambient-glow">
            <div className="mouse-glow" />
          </div>
          <Header />
          <main className="app-main" id="main-content">
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.PROJECTS.ROOT} element={<Projects />} />
              <Route path={ROUTES.PROJECTS.MAYLEO} element={<Mayleo />} />
              <Route path={ROUTES.PROJECTS.ENERGETICIENNE} element={<Energeticienne />} />
              <Route path={ROUTES.PROJECTS.FERTENERGIE} element={<Fertenergie />} />
              <Route path={ROUTES.PROJECTS.PORTFOLIO} element={<Portfolio />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
