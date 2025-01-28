import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '@main/pages/Home';
import LayoutDashboard from './layouts/LayoutDashboard';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <BrowserRouter>
      <LayoutDashboard>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </LayoutDashboard>
      <SpeedInsights />
    </BrowserRouter>
  );
}

export default App;
