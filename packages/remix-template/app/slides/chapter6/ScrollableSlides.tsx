import { useState, useEffect, useRef } from "react";
import { Slide1 } from "./Slide1";
import { Slide2 } from "./Slide2";
import { Slide3 } from "./Slide3";
import { Slide4 } from "./Slide4";
import { Slide5 } from "./Slide5";
import { Slide6 } from "./Slide6";
import { Slide7 } from "./Slide7";
import { Slide8 } from "./Slide8";
import { Slide9 } from "./Slide9";
import { Slide10 } from "./Slide10";
import { Slide11 } from "./Slide11";
import { Slide12 } from "./Slide12";
import { Slide13 } from "./Slide13";
import { Slide14 } from "./Slide14";
import { Slide15 } from "./Slide15";
import { Slide16 } from "./Slide16";
import { Slide17 } from "./Slide17";
import { Slide18 } from "./Slide18";
import { Slide19 } from "./Slide19";
import { Slide20 } from "./Slide20";

export function ScrollableSlides() {
  const [activeSlide, setActiveSlide] = useState(1);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Slide titles for the table of contents
  const slideTitles = [
    "Kubernetes Patterns - Chapter 6: Automated Placement (扩展版)",
    "章节概述 (1/2)",
    "章节概述 (2/2)",
    "Problem - 放置挑战 (1/2)",
    "Problem - 放置挑战 (2/2)",
    "Solution - 概述 (1/2)",
    "Solution - 概述 (2/2)",
    "Available Node Resources - 概念",
    "Container Demands - 概念",
    "Scheduler Configs - 概念",
    "Process - 概念",
    "Node Selector - 概念",
    "Node Affinity - 概念",
    "Pod Affinity and Anti-Affinity - 概念",
    "Topology Spread Constraints - 概念",
    "Taints and Tolerations - 概念",
    "Node Selector - 配置示例",
    "Node Affinity - 配置示例",
    "Pod Affinity and Anti-Affinity - 配置示例",
    "Topology Spread Constraints - 配置示例"
  ];

  // Render slide component by number
  const renderSlide = (slideNumber: number) => {
    switch (slideNumber) {
      case 1: return <Slide1 />;
      case 2: return <Slide2 />;
      case 3: return <Slide3 />;
      case 4: return <Slide4 />;
      case 5: return <Slide5 />;
      case 6: return <Slide6 />;
      case 7: return <Slide7 />;
      case 8: return <Slide8 />;
      case 9: return <Slide9 />;
      case 10: return <Slide10 />;
      case 11: return <Slide11 />;
      case 12: return <Slide12 />;
      case 13: return <Slide13 />;
      case 14: return <Slide14 />;
      case 15: return <Slide15 />;
      case 16: return <Slide16 />;
      case 17: return <Slide17 />;
      case 18: return <Slide18 />;
      case 19: return <Slide19 />;
      case 20: return <Slide20 />;
      default: return <Slide1 />;
    }
  };

  // Handle scroll to detect active slide
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = 0; i < slideRefs.current.length; i++) {
        const slide = slideRefs.current[i];
        if (slide) {
          const slideTop = slide.offsetTop;
          const slideBottom = slideTop + slide.offsetHeight;
          
          if (scrollPosition >= slideTop && scrollPosition < slideBottom) {
            setActiveSlide(i + 1);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to a specific slide
  const scrollToSlide = (slideNumber: number) => {
    const slide = slideRefs.current[slideNumber - 1];
    if (slide) {
      window.scrollTo({
        top: slide.offsetTop - 20, // Small offset for better visibility
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Floating Table of Contents */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-64 z-20 hidden lg:block border border-gray-200 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white pb-2 border-b border-gray-200 dark:border-gray-700">Chapter 6: Automated Placement</h3>
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
          {slideTitles.map((title, index) => (
            <li key={index}>
              <button
                onClick={() => scrollToSlide(index + 1)}
                className={`text-left w-full px-3 py-2 rounded transition-colors text-sm ${
                  activeSlide === index + 1
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200 font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="font-mono text-xs mr-2">{index + 1}.</span>
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Table of Contents Button */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 lg:hidden">
        <button
          onClick={() => document.getElementById('mobile-toc')?.classList.toggle('hidden')}
          className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Table of Contents Panel */}
      <div id="mobile-toc" className="fixed inset-0 bg-black bg-opacity-50 z-30 hidden lg:hidden">
        <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Chapter 6: Automated Placement</h3>
            <button
              onClick={() => document.getElementById('mobile-toc')?.classList.add('hidden')}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="space-y-2">
            {slideTitles.map((title, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    scrollToSlide(index + 1);
                    document.getElementById('mobile-toc')?.classList.add('hidden');
                  }}
                  className={`text-left w-full px-3 py-2 rounded transition-colors text-sm ${
                    activeSlide === index + 1
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200 font-medium'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="font-mono text-xs mr-2">{index + 1}.</span>
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slides Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ml-0 lg:ml-72">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((slideNumber) => (
          <div
            key={slideNumber}
            ref={(el) => { slideRefs.current[slideNumber - 1] = el; }}
            className="mb-16 scroll-mt-24"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
              {renderSlide(slideNumber)}
            </div>
            <div className="text-center mt-4 text-gray-500 dark:text-gray-400 text-sm">
              Slide {slideNumber} of 20
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-20">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${(activeSlide / 20) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}