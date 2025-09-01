import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Team from './pages/Team';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import GeneratorHub from './pages/GeneratorHub';
import CustomerServiceBot from './pages/CustomerServiceBot';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/team" element={<Team />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Generator Hub Routes - Siloed SEO Architecture */}
            <Route path="/generator-hub" element={<GeneratorHub />} />
            <Route path="/generators/customer-service-bot" element={<CustomerServiceBot />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
