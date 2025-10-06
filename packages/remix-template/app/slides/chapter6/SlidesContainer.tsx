import { useState } from "react";
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

export function SlidesContainer() {
  const [currentSlide, setCurrentSlide] = useState(1);
  
  const totalSlides = 20;
  
  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };
  
  const goToSlide = (slideNumber: number) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      setCurrentSlide(slideNumber);
    }
  };
  
  const renderSlide = () => {
    switch (currentSlide) {
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl h-[80vh] overflow-hidden">
          <div className="h-full overflow-y-auto">
            {renderSlide()}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-sm">
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 1}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          上一页
        </button>
        <div className="text-lg font-semibold text-gray-700">
          {currentSlide} / {totalSlides}
        </div>
        <button 
          onClick={nextSlide} 
          disabled={currentSlide === totalSlides}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          下一页
        </button>
      </div>
      <div className="text-center p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Kubernetes Patterns - Chapter 6: Automated Placement</h1>
      </div>
    </div>
  );
}