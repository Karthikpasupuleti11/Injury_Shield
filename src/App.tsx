import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, Activity, Brain, Target, Users, Search, Globe, Menu, X } from 'lucide-react';
import { useScrollAnimation, useParallax } from './hooks/useScrollAnimation';
import PerformanceAnalysis from './components/PerformanceAnalysis';
import About from './components/About';
import Contact from './components/Contact';
import LearnMore from './components/LearnMore';
import TrainingReports from './components/TrainingReports';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg py-4' : 'bg-transparent py-6'}`}>
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3 logo-container group">
                <Shield className="w-8 h-8 text-red-500 logo-icon" />
                <span className="text-xl font-bold transition-colors duration-300 group-hover:text-red-500">INJURYSHIELD</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/about" className="nav-link">ABOUT US</Link>
                <Link to="/analysis" className="nav-link">PERFORMANCE ANALYSIS</Link>
                <Link to="/reports" className="nav-link">TRAINING REPORTS</Link>
                <Link to="/contact" className="nav-link">CONTACT</Link>
              </div>

              <div className="hidden md:flex items-center space-x-6">
                <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                  GET STARTED
                </button>
                <div className="flex items-center space-x-4">
                  <Search className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
                  <Globe className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg py-4">
                <div className="flex flex-col space-y-4 px-6">
                  <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</Link>
                  <Link to="/analysis" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>PERFORMANCE ANALYSIS</Link>
                  <Link to="/reports" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>TRAINING REPORTS</Link>
                  <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>CONTACT</Link>
                  <button className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full transition-all duration-300">
                    GET STARTED
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/analysis" element={<PerformanceAnalysis />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn" element={<LearnMore />} />
          <Route path="/reports" element={<TrainingReports />} />
          <Route path="/" element={<HomeContent />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="reveal-left">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-8 h-8 text-red-500" />
                  <span className="text-xl font-bold">INJURYSHIELD</span>
                </div>
                <p className="text-gray-400">Revolutionizing sports performance through advanced analytics and injury prevention.</p>
              </div>
              <div className="reveal">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/analysis" className="text-gray-400 hover:text-white transition-colors">Performance Analysis</Link></li>
                  <li><Link to="/reports" className="text-gray-400 hover:text-white transition-colors">Training Reports</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div className="reveal">
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              <div className="reveal-right">
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">Stay updated with our latest features and releases.</p>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button className="bg-red-500 px-4 py-2 rounded-r-lg hover:bg-red-600 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} InjuryShield. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function HomeContent() {
  const navigate = useNavigate();
  
  // Initialize scroll animations for the home page
  useScrollAnimation();
  useParallax();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-40 parallax"
            data-rate="0.5"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-4xl">
            <div className="animate-float-text">
              <h1 className="text-5xl md:text-8xl font-bold mb-6">
                <div className="animate-float-slow hover:text-red-500 transition-colors duration-300 cursor-default">
                  FROM THE <span className="text-red-500 hover:text-white transition-colors duration-300">FIELD</span>
                </div>
                <div 
                  className="animate-float hover:text-red-500 transition-colors duration-300 cursor-default" 
                  style={{ animationDelay: '200ms' }}
                >
                  TO THE FUTURE
                </div>
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 hover:text-white mb-8 max-w-2xl animate-float-text delay-200 transition-colors duration-300 cursor-default">
              Created by practitioners, InjuryShield turns data and analytics into your greatest performance advantage.
            </p>
            
            <button 
              onClick={() => navigate('/learn')}
              className="group inline-flex bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full items-center space-x-2 transition-all duration-300 transform hover:scale-105 animate-float-text delay-300"
            >
              <span>Learn More</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Floating Cards */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <div className="grid gap-6">
            {[
              { icon: Activity, label: 'Real-time Analytics' },
              { icon: Brain, label: 'AI-Powered Insights' },
              { icon: Target, label: 'Precision Tracking' },
              { icon: Users, label: 'Team Management' }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer animate-float card-hover"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <item.icon className="w-8 h-8 mb-3 text-red-500" />
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 reveal">Why Choose InjuryShield?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Advanced Analytics',
                description: 'Real-time performance tracking and injury risk assessment powered by AI.',
                icon: Activity
              },
              {
                title: 'Expert Insights',
                description: 'Get personalized recommendations from sports science professionals.',
                icon: Brain
              },
              {
                title: 'Team Integration',
                description: 'Seamlessly connect with your entire sports organization.',
                icon: Users
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 reveal-scale card-hover`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <feature.icon className="w-12 h-12 text-red-500 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center reveal">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Performance?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of athletes and teams who have already elevated their game with InjuryShield.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      </section>
    </>
  );
}

export default App;