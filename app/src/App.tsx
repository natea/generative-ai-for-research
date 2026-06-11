import { HashRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { LessonPage } from './pages/LessonPage';

// HashRouter so the build works from any static host (incl. GitHub Pages) without rewrites.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
      </Routes>
    </HashRouter>
  );
}
