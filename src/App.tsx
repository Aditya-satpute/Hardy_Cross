import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NetworkInput from './pages/NetworkInput';
import Results from './pages/Results';
import About from './pages/About';
import { NetworkProvider } from './context/NetworkContext';

function App() {
  return (
    <NetworkProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/input" element={<NetworkInput />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </NetworkProvider>
  );
}

export default App;