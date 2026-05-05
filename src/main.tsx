import { createRoot } from 'react-dom/client';
import { AlgorithmsPage, BenchmarksPage, ContactPage, HomePage, LicensePage } from './pages';
import type { PageName } from './types';

const page = (document.body.dataset.page as PageName | undefined) || 'home';

const app = {
  home: <HomePage />,
  algorithms: <AlgorithmsPage />,
  benchmarks: <BenchmarksPage />,
  contact: <ContactPage />,
  license: <LicensePage />,
}[page] ?? <HomePage />;

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(app);
}
