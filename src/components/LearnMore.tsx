import React, { useEffect, useState, useRef } from 'react';
import { Award, Target, Brain, Shield, ChevronRight, ArrowRight, Play, Zap, ChevronDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles
import './LearnMore.css';    // Import the corresponding CSS file

const LearnMore: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
      anchorPlacement: 'top-bottom'
    });

    // Reset scroll position when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Monitor scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
      const totalScroll = docHeight - winHeight;
      const progress = (scrolled / totalScroll) * 100;
      setScrollProgress(progress > 100 ? 100 : progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Toggle FAQ item open state
  const toggleFaq = (index: number) => {
    setFaqOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  // Toggle video modal
  const toggleVideoModal = () => {
    setIsVideoModalOpen(!isVideoModalOpen);
    if (!isVideoModalOpen && videoRef.current) {
      videoRef.current.play();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Case studies data
  const caseStudies = [
    {
      title: "Professional Sports Team",
      description: "Reduced injury rates by 35% and improved player availability by implementing InjuryShield's predictive analytics.",
      stats: { injuries: "-35%", performance: "+22%", recovery: "-28%" }
    },
    {
      title: "University Athletics Program",
      description: "Integrated InjuryShield across 24 sports teams, resulting in better athlete management and performance outcomes.",
      stats: { injuries: "-42%", performance: "+18%", recovery: "-33%" }
    },
    {
      title: "Olympic Training Center",
      description: "Used InjuryShield to prepare elite athletes for international competition, optimizing training loads and recovery protocols.",
      stats: { injuries: "-29%", performance: "+25%", recovery: "-31%" }
    }
  ];

  return (
    <div className="pt-20 bg-black overflow-hidden">
      {/* Floating progress indicator */}
      <div className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 transform -rotate-90">
          <circle
            className="text-gray-700"
            strokeWidth="2"
            stroke="currentColor"
            fill="transparent"
            r="16"
            cx="20"
            cy="20"
          />
          <circle
            className="text-red-500"
            strokeWidth="2"
            strokeDasharray={100}
            strokeDashoffset={100 - scrollProgress}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="16"
            cx="20"
            cy="20"
          />
        </svg>
        <span className="absolute text-xs font-bold">{Math.min(100, Math.round(scrollProgress))}%</span>
      </div>

      {/* Hero Section with Dynamic Background */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center py-20 bg-cover bg-center overflow-hidden"
      >
        {/* Dynamic background with floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-0"></div>
          
          {/* Animated background shapes */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-red-500/10 animate-float-particle"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 10}s`,
                animationDelay: `${Math.random() * 10}s`,
                filter: 'blur(40px)',
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
          
          {/* Animated grid lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative inline-flex mb-4">
              <span className="px-4 py-1 bg-red-500/20 text-red-500 rounded-full text-sm font-semibold tracking-wide">
                ADVANCED SPORTS ANALYTICS
              </span>
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6 relative"
              data-aos="fade-up"
            >
              <span className="block text-stroke-red">Discover</span>
              <span className="relative z-10">
                InjuryShield
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-red-500 transform origin-left animate-extend-line"></span>
              </span>
            </h1>
            
            <p 
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Experience the future of sports performance analytics. Our advanced AI-powered platform helps athletes and teams optimize performance while minimizing injury risks.
            </p>
            
            <div 
              className="flex flex-wrap justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Link
                to="/get-started"
                className="group bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center overflow-hidden relative"
              >
                <span className="relative z-10">Get Started</span>
                <ChevronRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              </Link>
              
              <button
                onClick={toggleVideoModal}
                className="group bg-transparent border border-white/30 hover:border-white text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <Play className="w-5 h-5 mr-2 text-red-500 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            {/* Stats counters */}
            <div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {[ 
                { value: '35%', label: 'Injury Reduction' },
                { value: '200+', label: 'Professional Teams' },
                { value: '24/7', label: 'Real-time Monitoring' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="text-3xl font-bold text-red-500 mb-2 counter-animation">{stat.value}</div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <ChevronDown className="w-6 h-6 text-red-500" />
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fadeIn"
          onClick={toggleVideoModal}
        >
          <div 
            className="w-4/5 max-w-4xl aspect-video bg-gray-900 relative rounded-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://www.example.com/path-to-demo-video.mp4"
              controls
              autoPlay
              loop
              muted
            />
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              onClick={toggleVideoModal}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Core Technology Section */}
      <section
        className="py-20 bg-gray-900 relative overflow-hidden"
        data-aos="fade-up"
      >
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-gray-400 text-sm font-medium">POWERED BY ADVANCED AI</span>
            </div>
          </div>
          
          <h2 
            className="text-4xl font-bold mb-6 text-white"
            data-aos="fade-up"
          >
            Our Core Technology
          </h2>
          
          <p 
            className="text-gray-400 max-w-2xl mx-auto mb-16"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            InjuryShield combines cutting-edge AI, biomechanical analysis, and sports science expertise to deliver unprecedented insights for athletes and teams.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { 
                icon: Brain,
                title: 'AI-Powered Analysis',
                description: 'Advanced machine learning algorithms analyze movement patterns in real-time, providing instant feedback and risk assessment.',
              },
              { 
                icon: Shield,
                title: 'Injury Prevention',
                description: 'Proactive monitoring system that identifies potential injury risks before they become serious problems.',
              },
              { 
                icon: Target,
                title: 'Performance Optimization',
                description: 'Data-driven insights help athletes and teams achieve peak performance through personalized recommendations.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-8 group hover:shadow-xl hover:shadow-red-500/10 transition-all duration-500 transform hover:-translate-y-2"
                data-aos="flip-up"
                data-aos-delay={index * 100}
              >
                <div className="relative mb-6 inline-flex">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md transform group-hover:scale-150 transition-transform duration-500"></div>
                  {React.createElement(feature.icon, { 
                    className: 'w-12 h-12 text-red-500 relative z-10 transform group-hover:scale-110 transition-transform duration-300' 
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-red-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <Link to="#" className="inline-flex items-center text-red-500 hover:text-red-400">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl font-bold mb-6 text-white"
              data-aos="fade-up"
            >
              How InjuryShield Works
            </h2>
            <p
              className="text-gray-400 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Our end-to-end platform seamlessly integrates into your training ecosystem, providing actionable insights at every step.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline connector */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/0 via-red-500 to-red-500/0 transform -translate-x-1/2 hidden md:block"></div>
            
            {/* Timeline steps */}
            {[ 
              {
                title: 'Data Collection',
                description: 'Collect biomechanical data through our non-invasive sensors and existing training equipment.',
              },
              {
                title: 'AI Analysis',
                description: 'Our proprietary algorithms analyze movement patterns and identify potential risk factors.',
              },
              {
                title: 'Risk Assessment',
                description: 'Receive comprehensive reports highlighting areas of concern and injury risk factors.',
              },
              {
                title: 'Personalized Recommendations',
                description: 'Get tailored training modifications and recovery protocols to minimize injury risk.',
              }
            ].map((step, index) => (
              <div 
                key={index}
                className="relative flex flex-col md:flex-row items-center mb-16 last:mb-0"
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 w-12 h-12 bg-black border-4 border-red-500 rounded-full transform -translate-x-1/2 z-10 hidden md:block">
                  <div className="absolute inset-0 bg-red-500/30 rounded-full animate-ping"></div>
                </div>
                
                {/* Content box - alternating left/right */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-16 text-right' : 'md:ml-auto md:pl-16 text-left'}`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300">
                    <div className="text-xl font-bold text-white mb-4">
                      <span className="text-red-500">0{index + 1}.</span> {step.title}
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-6 text-white"
              data-aos="fade-up"
            >
              Success Stories
            </h2>
            <p
              className="text-gray-400 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              See how teams and athletes across the world have transformed their performance with InjuryShield.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-red-500/10 transition-all duration-500"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-red-500 mr-2" />
                    <h3 className="text-xl font-semibold text-white">{study.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-6">{study.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(study.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xl font-bold text-red-500">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to="#"
                    className="inline-flex items-center text-white bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    <span>Read Full Case Study</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="inline-flex items-center text-red-500 hover:text-red-400 font-semibold"
            >
              <span>View All Case Studies</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative z-10">
  <div className="text-center mb-16">
    <h2
      className="text-4xl font-bold mb-6 text-white"
      data-aos="fade-up"
    >
      Key Features
    </h2>
    <p
      className="text-gray-400 max-w-2xl mx-auto"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      Explore the powerful features that make InjuryShield the leading platform for sports performance and injury prevention.
    </p>
  </div>
  
  {/* Tabs navigation */}
  <div
    className="flex flex-wrap justify-center gap-4 mb-12"
    data-aos="fade-up"
    data-aos-delay="300"
  >
    {['Predictive Analytics', 'Real-time Monitoring', 'Team Dashboards', 'Mobile Access'].map((tab, index) => (
      <button
        key={index}
        className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
          activeTab === index
            ? 'bg-red-500 text-white'
            : 'bg-white/5 text-gray-400 hover:bg-white/10'
        }`}
        onClick={() => setActiveTab(index)}
      >
        {tab}
      </button>
    ))}
  </div>
  
  {/* Tab content */}
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
    {activeTab === 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" data-aos="fade-up">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Predictive Analytics</h3>
          <p className="text-gray-400 mb-6">
            Our AI-powered predictive analytics identify potential injury risks before they occur,
            allowing coaches and medical staff to take preventative action.
          </p>
          <ul className="space-y-4">
            {[
              'Machine learning algorithms trained on millions of data points',
              'Personalized risk profiles for each athlete',
              'Trend analysis across teams and sports',
              'Early warning system for potential injuries'
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-3 mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-90"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute text-white text-opacity-30 font-mono text-sm">
                [Predictive Analytics Dashboard Visualization]
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    
    {activeTab === 1 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" data-aos="fade-up">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Real-time Monitoring</h3>
          <p className="text-gray-400 mb-6">
            Monitor athlete performance and biomechanics in real-time during training and competition.
          </p>
          <ul className="space-y-4">
            {[
              'Live data streaming from wearable sensors',
              'Immediate feedback on movement patterns',
              'Automatic alerts for concerning metrics',
              'Session comparison and progress tracking'
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-3 mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-90"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute text-white text-opacity-30 font-mono text-sm">
                [Real-time Monitoring Interface]
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {activeTab === 2 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" data-aos="fade-up">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Team Dashboards</h3>
          <p className="text-gray-400 mb-6">
            Comprehensive team dashboards provide coaches and medical staff with a holistic view of team health and performance.
          </p>
          <ul className="space-y-4">
            {[
              'Team-wide risk assessment',
              'Customizable views for different staff roles',
              'Historical data and trend analysis',
              'Comparative metrics across positions and players'
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-3 mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-90"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute text-white text-opacity-30 font-mono text-sm">
                [Team Dashboard Interface]
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {activeTab === 3 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" data-aos="fade-up">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Mobile Access</h3>
          <p className="text-gray-400 mb-6">
            Access critical data and insights anywhere with our powerful mobile application, designed for coaches, medical staff, and athletes.
          </p>
          <ul className="space-y-4">
            {[
              'Real-time notifications and alerts',
              'Individual athlete profiles and tracking',
              'On-the-field assessment tools',
              'Secure communication between team members'
            ].map((item, i) => (
              <li key={i} className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-3 mt-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black opacity-90"></div>
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="absolute text-white text-opacity-30 font-mono text-sm">
                [Mobile Application Interface]
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-6 text-white"
                data-aos="fade-up"
              >
                What Our Users Say
              </h2>
              <p
                className="text-gray-400 max-w-2xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Hear from coaches, athletes, and medical professionals who have transformed their approach with InjuryShield.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "InjuryShield has completely transformed how we approach player health and performance. It's now an integral part of our training program.",
                  name: "Michael Rodriguez",
                  title: "Head Coach, Professional Soccer Team",
                  rating: 5
                },
                {
                  quote: "The predictive analytics have helped us reduce injuries by over 40% in just one season. The return on investment has been remarkable.",
                  name: "Dr. Sarah Chen",
                  title: "Head of Sports Medicine, University Athletics",
                  rating: 5
                },
                {
                  quote: "As an athlete, having access to my own data has empowered me to take control of my training and recovery in ways I never thought possible.",
                  name: "James Wilson",
                  title: "Professional Basketball Player",
                  rating: 4
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-8 relative group hover:shadow-xl hover:shadow-red-500/10 transition-all duration-500"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="absolute -top-4 -left-4 text-red-500 text-6xl opacity-30">"</div>
                  <p className="text-gray-300 mb-8 relative z-10">{testimonial.quote}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.title}</p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-red-500" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-6 text-white"
                data-aos="fade-up"
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-gray-400 max-w-2xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Find answers to common questions about InjuryShield and how it can benefit your organization.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {[ 
                {
                  question: 'How does InjuryShield collect data?',
                  answer: 'InjuryShield seamlessly integrates with existing wearable technology, force plates, video analysis systems, and other data sources. Our platform is compatible with most industry-standard equipment and can be customized to work with proprietary systems.',
                },
                {
                  question: 'Is InjuryShield suitable for all sports?',
                  answer: 'Yes, InjuryShield has been designed to work across all sports. Our adaptive algorithms can be tailored to the specific movements, stresses, and injury patterns common in different sports, from team-based activities to individual performance sports.',
                },
                {
                  question: 'How accurate are the predictive analytics?',
                  answer: 'Our predictive models have been validated through extensive research and real-world implementation. In controlled studies, InjuryShield has demonstrated up to 85% accuracy in identifying high-risk movement patterns that correlate with injury occurrence.',
                },
                {
                  question: 'What kind of support does InjuryShield provide?',
                  answer: 'We offer comprehensive implementation support, including on-site setup, staff training, and ongoing technical assistance. Our sports science team is also available for consultations on data interpretation and program optimization.',
                },
                {
                  question: 'How quickly can we implement InjuryShield?',
                  answer: 'Most organizations can be fully operational with InjuryShield within 2-4 weeks. This includes system integration, staff training, and initial baseline data collection.',
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="mb-6 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <button
                    className="w-full p-6 text-left flex justify-between items-center"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="text-white font-medium">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-red-500" />
                  </button>
                  {faqOpen[index] && (
                    <div className="p-6 pt-0 text-gray-400">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
          data-aos="fade-up"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-90 bg-red-500/20 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 max-w-5xl mx-auto border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your approach to athlete health?</h2>
                  <p className="text-gray-300 mb-8">
                    Join hundreds of elite teams and organizations already using InjuryShield to optimize performance and reduce injuries.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/get-started"
                      className="group bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center overflow-hidden relative"
                    >
                      <span className="relative z-10">Get Started</span>
                      <ChevronRight className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-red-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
                    </Link>
                    
                    <Link
                      to="/contact"
                      className="border border-white/30 hover:border-white text-white px-8 py-4 rounded-full transition-all duration-300 flex items-center"
                    >
                      <span>Contact Sales</span>
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square max-w-md mx-auto bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-full flex items-center justify-center p-8">
                    <Zap className="w-24 h-24 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

  );
};

export default LearnMore;