import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X, Package, User, Globe } from 'lucide-react';
import { WEBAPP_URLS } from '@/api/publicApi';

const defaultNavItems = [
  { label: 'Services', page_name: 'Services', hash: '', order: 1 },
  { label: 'About', page_name: 'AboutUs', hash: '', order: 2 },
  { label: 'Careers', page_name: 'Careers', hash: '', order: 3 },
  { label: 'Blog', page_name: 'Blog', hash: '', order: 4 },
  { label: 'Contact', page_name: 'Contact', hash: '', order: 5 }
];

const PillNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = useCallback((e) => {
    const heroPageUrl = createPageUrl('Hero');
    if (location.pathname === heroPageUrl) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const handleHashLinkClick = useCallback((e, hash) => {
    e.preventDefault();
    const heroPageUrl = createPageUrl('Hero');

    if (location.pathname === heroPageUrl) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(heroPageUrl + hash, { replace: false });
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname, navigate]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguageMenu(false);
  };

  const navItems = useMemo(() => {
    return defaultNavItems.map(item => ({
      label: item.label,
      href: item.hash ? item.hash : createPageUrl(item.page_name)
    }));
  }, []);

  // Redirect to webapp for auth
  const handleLoginClick = () => {
    window.location.href = WEBAPP_URLS.login;
  };

  const handleRegisterClick = () => {
    window.location.href = WEBAPP_URLS.register;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-2 sm:p-4 transition-all duration-300">
      <div className={`
        mx-auto p-3 sm:p-4 rounded-full max-w-7xl flex items-center justify-between
        transition-all duration-300 border
        ${scrolled ?
          'bg-white/95 backdrop-blur-xl shadow-2xl border-gray-200/50' :
          'bg-[#082c59]/95 backdrop-blur-md border-white/20'}
      `}>
        {/* Logo */}
        <Link
          to={createPageUrl('Hero')}
          onClick={handleHomeClick}
          className="flex items-center space-x-1.5 sm:space-x-2 pl-2 sm:pl-3 group cursor-pointer"
          data-testid="logo-link">
          <div className={`
            w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden
            transition-all duration-300 transform group-hover:scale-110
            ${scrolled ? 'bg-[#082c59] shadow-lg' : 'bg-white'}
          `}>
            {!logoError ? (
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68ffab5f9a726762e2e6ad1f/b13fbadac_f6726dae0_logo.png"
                alt="Oryno Logo"
                className="bg-[#082c59] p-2 w-full h-full object-contain scale-150"
                onError={() => setLogoError(true)}
              />
            ) : (
              <Package className={`w-4 h-4 sm:w-6 sm:h-6 ${scrolled ? 'text-white' : 'text-[#082c59]'}`} />
            )}
          </div>
          <span className={`
            font-bold text-sm sm:text-lg tracking-wide hidden sm:block cursor-pointer
            ${scrolled ? 'text-[#082c59]' : 'text-white'}
          `}>
            Oryno
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            const isPageRouteActive = item.href.startsWith('/') && location.pathname === item.href;
            const isHashLinkActive = item.href.startsWith('#') && location.hash === item.href;
            const isActive = isPageRouteActive || isHashLinkActive;
            const isHashLink = item.href.startsWith('#');

            if (isHashLink) {
              return (
                <button
                  key={item.label}
                  onClick={(e) => handleHashLinkClick(e, item.href)}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                  className={`
                    px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium 
                    transition-all duration-200 relative overflow-hidden group
                    ${isActive ?
                      scrolled ? 'bg-[#082c59] text-white shadow-lg' : 'bg-white text-[#082c59] shadow-lg' :
                      scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}
                  `}>
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.href}
                data-testid={`nav-${item.label.toLowerCase()}`}
                className={`
                  px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium 
                  transition-all duration-200 relative overflow-hidden group
                  ${isActive ?
                    scrolled ? 'bg-[#082c59] text-white shadow-lg' : 'bg-white text-[#082c59] shadow-lg' :
                    scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'}
                `}>
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              data-testid="language-selector"
              className={`
                flex items-center gap-2 text-[10px] sm:text-xs font-medium px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full 
                transition-all duration-200 border
                ${scrolled ?
                  'bg-gray-100 text-[#082c59] border-gray-200 hover:bg-gray-200 shadow-sm' :
                  'bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20'}
              `}>
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{selectedLanguage === 'English' ? 'EN' : 'FR'}</span>
            </button>
            
            {showLanguageMenu && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden min-w-[140px] z-50">
                <button
                  onClick={() => handleLanguageSelect('English')}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    selectedLanguage === 'English' ? 'bg-[#082c59] text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  🇬🇧 English
                </button>
                <button
                  onClick={() => handleLanguageSelect('French')}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    selectedLanguage === 'French' ? 'bg-[#082c59] text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}>
                  🇫🇷 Français
                </button>
              </div>
            )}
          </div>

          {/* Get Started Button - Points to webapp auth */}
          <button
            onClick={handleRegisterClick}
            data-testid="register-btn"
            className={`
              flex items-center gap-2 text-[10px] sm:text-xs font-medium px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full 
              transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
              ${scrolled ?
                'bg-[#082c59] text-white hover:bg-[#0a3d7a]' :
                'bg-white text-[#082c59] hover:bg-gray-100'}
            `}>
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Get Started</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-btn"
            className={`
              p-1.5 sm:p-2 rounded-full transition-colors
              ${scrolled ? 'text-[#082c59] hover:bg-gray-100' : 'text-white hover:bg-white/20'}
            `}>
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-xl p-3 sm:p-4 shadow-2xl border border-gray-200/50 mx-2">
          <nav className="flex flex-col space-y-1.5 sm:space-y-2">
            {navItems.map((item) => {
              const isHashLink = item.href.startsWith('#');

              if (isHashLink) {
                return (
                  <button
                    key={item.label}
                    onClick={(e) => handleHashLinkClick(e, item.href)}
                    className="text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 text-xs font-medium transition-colors text-left">
                    {item.label}
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 text-xs font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              );
            })}
            
            {/* Language Selector - Mobile */}
            <div className="border-t border-gray-200 pt-2 mt-2">
              <button
                onClick={() => handleLanguageSelect(selectedLanguage === 'English' ? 'French' : 'English')}
                className="w-full flex items-center gap-3 text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-100 text-xs font-medium transition-colors">
                <Globe className="w-4 h-4" />
                <span>{selectedLanguage === 'English' ? '🇬🇧 English' : '🇫🇷 Français'}</span>
              </button>
            </div>

            {/* Auth Buttons - Mobile */}
            <button
              onClick={handleLoginClick}
              className="w-full text-center text-[#082c59] border border-[#082c59] text-xs font-medium mt-1.5 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full hover:bg-gray-50 transition-colors">
              Login
            </button>
            <button
              onClick={handleRegisterClick}
              className="flex items-center justify-center gap-2 bg-[#082c59] text-white text-center text-xs font-medium mt-1.5 sm:mt-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full hover:bg-[#0a3d7a] transition-colors shadow-lg">
              <User className="w-4 h-4" />
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PillNav;
