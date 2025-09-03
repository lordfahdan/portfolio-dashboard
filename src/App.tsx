import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '@main/pages/Home';
import LayoutDashboard from './layouts/LayoutDashboard';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Achievement from './pages/Achievement';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <LayoutDashboard>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ComingSoon />} />
          <Route path="/profile" element={<ComingSoon />} />
          <Route path="/achievement" element={<Achievement />} />
        </Routes>
      </LayoutDashboard>
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
