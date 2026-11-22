import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Home } from './pages/Home';

const AdminLogin = lazy(() => import('./pages/AdminLogin').then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Suspense
            fallback={
              <div className="min-h-screen bg-[#E5E1DA] dark:bg-[#080706] flex items-center justify-center font-mono text-xs uppercase tracking-widest opacity-60">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Home />} />
              <Route path="/projects" element={<Home />} />
              <Route path="/gallery" element={<Home />} />
              <Route path="/experience" element={<Home />} />
              <Route path="/testimonials" element={<Home />} />
              <Route path="/contact" element={<Home />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
};
