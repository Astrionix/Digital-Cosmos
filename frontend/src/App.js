import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import EventHorizonScene from './components/EventHorizonScene';
import { useEventHorizonScroll } from './hooks/useEventHorizonScroll';
import { useData } from './hooks/useData';

// Lazy load heavy components
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Blogs = lazy(() => import('./components/Blogs'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { data, loading } = useData();
  const sectionConfig = useMemo(() => ([
    {
      id: 'home',
      position: { x: 0, y: 2.2, z: 7.5 },
      rotation: { x: 0, y: 0, z: 0 },
      start: 'top top',
      end: 'bottom center'
    },
    {
      id: 'about',
      position: { x: -1.5, y: 1.8, z: 6.2 },
      rotation: { x: -0.05, y: -0.12, z: 0 },
      start: 'top center',
      end: 'bottom center'
    },
    {
      id: 'projects',
      position: { x: 1.2, y: 1.6, z: 6.5 },
      rotation: { x: -0.04, y: 0.18, z: 0 },
      start: 'top center',
      end: 'bottom center'
    },
    {
      id: 'skills',
      position: { x: 0, y: 1.4, z: 5.8 },
      rotation: { x: -0.08, y: 0, z: 0 },
      start: 'top center',
      end: 'bottom center'
    }
  ]), []);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEventHorizonScroll(sectionConfig);


  if (isLoading || loading) {
    return <LoadingScreen />;
  }

  return (
    <EventHorizonScene audioElementId="event-horizon-track">
      <div className="min-h-screen bg-space-black/70 text-white relative overflow-hidden">
        {/* Navigation */}
        <Navigation
          data={data}
        />

        {/* Main Content - Single Page Scroll */}
        <main className="relative z-30">
          {/* Hero Section */}
          <section id="home">
            <Hero profile={data.profile} data={data} />
          </section>

          {/* About Section */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="about">
              <About profile={data.profile} socials={data.socials} />
            </section>
          </Suspense>

          {/* Projects Section */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="projects">
              <Projects projects={data.projects} />
            </section>
          </Suspense>

          {/* Skills Section */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="skills">
              <Skills skills={data.skills} />
            </section>
          </Suspense>

          {/* Experience Section */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="experience">
              <Experience experiences={data.experience} />
            </section>
          </Suspense>

          {/* Education Section */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="education">
              <Education education={data.education} />
            </section>
          </Suspense>

          {/* Blogs Section */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="blogs">
              <Blogs blogs={data.blogs} />
            </section>
          </Suspense>

          {/* Contact Section */}
          <Suspense fallback={<div className="min-h-screen" />}>
            <section id="contact">
              <Contact socials={data.socials} />
            </section>
          </Suspense>
        </main>
      </div>
    </EventHorizonScene>
  );
}

export default App;
