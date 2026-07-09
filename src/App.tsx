import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* The noise overlay texture */}
        <div className="noise-overlay" />
        
        {/* Theme Toggle Button */}
        <ThemeToggle />

        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        
        {/* Footer with Glowing GitHub Link */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
