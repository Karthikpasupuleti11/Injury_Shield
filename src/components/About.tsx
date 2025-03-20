import React, { useEffect, useState } from 'react';
import { Shield, Award, Users, Target, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, useAnimation, AnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollY, setScrollY] = useState(0);

  // Team members data
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Scientific Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      description: 'Leading our research and development in sports science and biomechanics.',
      skills: ['Biomechanics', 'Data Analysis', 'Research']
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Engineering',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      description: 'Driving innovation in our AI and machine learning systems.',
      skills: ['AI', 'Machine Learning', 'Software Architecture']
    },
    {
      name: 'Emma Thompson',
      role: 'Performance Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
      description: 'Overseeing athlete development and performance optimization.',
      skills: ['Athletic Training', 'Performance Analytics', 'Team Management']
    }
  ];

  // Achievements data
  const achievements = [
    { number: '10K+', label: 'Athletes Monitored', icon: Users },
    { number: '95%', label: 'Injury Prevention Rate', icon: Shield },
    { number: '50+', label: 'Professional Teams', icon: Target },
    { number: '24/7', label: 'Support Available', icon: Award }
  ];

  // Core values data
  const coreValues = [
    {
      icon: Shield,
      title: 'Protection',
      description: 'Safeguarding athlete health and well-being through prevention.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for the highest standards in everything we do.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working together to achieve exceptional results.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Pushing boundaries in sports science and technology.'
    }
  ];

  // Enhanced animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] } 
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] } 
    }
  };

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced scroll animation hook
  const useScrollAnimation = (threshold = 0.2) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ 
      threshold, 
      triggerOnce: false,
      rootMargin: '-100px 0px'
    });

    useEffect(() => {
      if (inView) {
        controls.start('visible');
      } else {
        controls.start('hidden');
      }
    }, [controls, inView]);

    return [ref, controls];
  };

  // Section references for animations
  const [heroRef, heroControls] = useScrollAnimation() as [React.RefObject<HTMLElement>, AnimationControls];
  const [valuesRef, valuesControls] = useScrollAnimation(0.1) as [React.RefObject<HTMLElement>, AnimationControls];
  const [teamRef, teamControls] = useScrollAnimation(0.1) as [React.RefObject<HTMLElement>, AnimationControls];
  const [achievementsRef, achievementsControls] = useScrollAnimation(0.1) as [React.RefObject<HTMLElement>, AnimationControls];

  // Smooth scroll functionality
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="bg-black text-white overflow-hidden scroll-smooth">
      {/* Fixed navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        {['hero', 'values', 'team', 'achievements'].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`block w-3 h-3 my-4 rounded-full transition-all duration-300 ${
              activeSection === section ? 'bg-red-500 scale-150' : 'bg-gray-500 hover:bg-red-400'
            }`}
            aria-label={`Navigate to ${section} section`}
          />
        ))}
      </div>

      {/* Hero Section with Parallax */}
      <motion.section
        id="hero"
        ref={heroRef as React.RefObject<HTMLElement>}
        initial="hidden"
        animate={heroControls}
        variants={fadeInUp}
        className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80)',
            transform: `translateY(${scrollY * 0.5}px)` 
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700"
              variants={itemFade}
            >
              About InjuryShield
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-12" 
              variants={itemFade}
              transition={{ delay: 0.2 }}
            >
              Founded in 2012, InjuryShield has been at the forefront of sports performance analytics and injury prevention technology. Our mission is to empower athletes and teams with data-driven insights for optimal performance.
            </motion.p>
            <motion.button
              className="flex items-center mx-auto text-red-500 hover:text-red-400 transition-colors duration-300"
              variants={itemFade}
              transition={{ delay: 0.4 }}
              onClick={() => scrollToSection('values')}
            >
              <span className="mr-2">Explore Our Values</span>
              <ChevronDown size={20} className="animate-bounce" />
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Core Values with Hover Effects */}
      <motion.section
        id="values"
        ref={valuesRef as any}
        initial="hidden"
        animate={valuesControls}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center" 
            variants={itemFade}
          >
            Our Core <span className="text-red-500">Values</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group"
                variants={scaleUp}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
              >
                <div className="flex justify-center mb-6">
                  <value.icon className="w-12 h-12 text-red-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center">{value.title}</h3>
                <p className="text-gray-400 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section with Card Interactivity */}
      <motion.section
        id="team"
        ref={teamRef}
        initial="hidden"
        animate={teamControls}
        variants={staggerContainer}
        className="py-20 bg-black"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center" 
            variants={itemFade}
          >
            Meet Our <span className="text-red-500">Team</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-900 rounded-xl overflow-hidden group cursor-pointer"
                variants={itemFade}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-red-500 mb-4">{member.role}</p>
                  <p className="text-gray-400 mb-4">{member.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gray-800 text-xs rounded-full text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-800 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center text-red-500 hover:text-red-400">
                    <span className="mr-2">View Profile</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievements with Counter Animation */}
      <motion.section
        id="achievements"
        ref={achievementsRef}
        initial="hidden"
        animate={achievementsControls}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center" 
            variants={itemFade}
          >
            Our <span className="text-red-500">Achievements</span>
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index} 
                className="text-center p-8 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300"
                variants={scaleUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-6">
                  <achievement.icon className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-4xl font-bold text-red-500 mb-2">
                  {achievement.number}
                </h3>
                <p className="text-gray-300">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="py-20 bg-gray-900"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to <span className="text-red-500">Join Us?</span></h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Partner with InjuryShield to transform your approach to sports performance and injury prevention.
          </p>
          <motion.button
            className="px-8 py-4 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
  