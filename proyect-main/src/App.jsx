import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import { PrivacyPolicy, CookiesPolicy, LegalNotice, Contact } from './pages/LegalPages';
import ToolPage from './pages/ToolPage';
import { SubmitToolPage } from './pages/SubmitToolPage';
import About from './pages/About';
import SuccessPage from './pages/Success';
import BlogDetail from './pages/BlogDetail';
import NotFound from './pages/NotFound';
import { CookieBanner } from './components/CookieBanner';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/tool/:id" element={<ToolPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/submit-tool" element={<SubmitToolPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <CookieBanner />
      <Footer />
    </div>
  );
}

export default App;
