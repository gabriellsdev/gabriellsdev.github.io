import { useState, useEffect } from 'react';

export type Route =
  | { type: 'home' }
  | { type: 'project'; slug: string }
  | { type: 'not-found' };

function parseLocation(): Route {
  // Check hash first (preferred for zero-404 GitHub Pages static compatibility)
  const hash = window.location.hash.replace(/^#\/?/, '');
  const path = window.location.pathname;

  let target = hash;
  if (!target && path) {
    // If no hash, inspect path
    const cleanPath = path.replace(/^\//, '').replace(/\/$/, '');
    if (cleanPath.startsWith('projects/')) {
      target = cleanPath;
    }
  }

  if (!target || target === '' || target === '/') {
    return { type: 'home' };
  }

  const parts = target.split('/').filter(Boolean);
  const validPrefixes = ['projects', 'project', 'projetos', 'projeto'];
  if (validPrefixes.includes(parts[0])) {
    if (parts[1]) {
      return { type: 'project', slug: parts[1] };
    }
  }

  return { type: 'not-found' };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseLocation);

  useEffect(() => {
    const handlePopState = () => {
      const newRoute = parseLocation();
      setRoute(newRoute);
      window.scrollTo(0, 0);

      // Announce route change to screen readers and manage focus
      const mainHeading = document.querySelector('h1');
      if (mainHeading) {
        mainHeading.setAttribute('tabindex', '-1');
        mainHeading.focus({ preventScroll: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    // If it's an external or subfolder static link like ./nfse-nacional/ or ./jardim-web/
    if (path.startsWith('./') || path.startsWith('/') && !path.startsWith('/projects/')) {
      window.location.href = path;
      return;
    }

    if (path === '/' || path === '') {
      window.location.hash = '';
    } else if (path.startsWith('/projects/')) {
      window.location.hash = path.replace(/^\//, '');
    } else {
      window.location.hash = path;
    }
  };

  return { route, navigate };
}
