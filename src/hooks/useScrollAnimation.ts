import { useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    elements.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return null;
};

export const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.parallax');
      elements.forEach((element) => {
        const scrolled = window.scrollY;
        const rate = (element as HTMLElement).dataset.rate || '0.5';
        const offset = scrolled * parseFloat(rate);
        (element as HTMLElement).style.setProperty('--parallax-offset', `-${offset}px`);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};