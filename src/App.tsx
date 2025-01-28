import { BrowserRouter, Routes, Route } from 'react-router';
import Home from '@main/pages/Home';
import LayoutDashboard from './layouts/LayoutDashboard';

function App() {
  return (
    <BrowserRouter>
      <LayoutDashboard>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </LayoutDashboard>
    </BrowserRouter>
  );
}

export default App;
