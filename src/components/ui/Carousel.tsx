import React, { useState, useEffect } from 'react';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import Image from 'next/image';

interface CarouselItem {
  src: string;
  alt: string;
}

interface CarouselProps {
  items: CarouselItem[];
  onSlideChange?: (index: number) => void;
}

export const Carousel: React.FC<CarouselProps> = ({ items, onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getVisibleItems = () => {
    const itemCount = items.length;
    const prev = (currentIndex - 1 + itemCount) % itemCount;
    const next = (currentIndex + 1) % itemCount;
    return [prev, currentIndex, next];
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(nextIndex);
    onSlideChange?.(nextIndex);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(prevIndex);
    onSlideChange?.(prevIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const visibleItems = getVisibleItems();

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8 border-2 border-white-50">
      <div className="relative h-[300px] md:h-[450px]">
        <div className='z-0'>
          <div className="orange-blur h-[200px] w-[170px] absolute rounded-full top-4 left-2 md:h-[260px] md:w-[230px] md:left-[33%]"></div>
          <div className='yellow-blur h-[200px] w-[170px] absolute rounded-full top-14 right-12 md:h-[260px] md:w-[230px] md:right-[39%] md:top-24'></div>
          <div className='blue-blur h-[200px] w-[170px] absolute rounded-full -bottom-4 right-12 md:h-[260px] md:w-[230px] md:right-[35%] md:-bottom-8'></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {visibleItems.map((itemIndex, position) => {
            const item = items[itemIndex];
            return (
              <div
                key={itemIndex}
                className={`absolute transition-all duration-300 ease-in-out
                  ${position === 0 ? 'md:-translate-x-[75%] md:scale-75 hidden md:block' : ''}
                  ${position === 1 ? 'z-20 scale-100' : ''}
                  ${position === 2 ? 'md:translate-x-[75%]  md:scale-75 hidden md:block' : ''}
                `}
              >
                <Image
                    src={item.src}
                    alt={item.alt}
                    className="w-[250px] h-[250px] md:w-[500px] md:h-[500px] object-contain"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="p-1 md:p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors ml-0 md:ml-4"
          disabled={isAnimating}
        >
          <CircleChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
        </button>
        <button
          onClick={handleNext}
          className="p-1 md:p-2 rounded-full bg-white/80 shadow-lg hover:bg-white transition-colors mr-0 md:mr-4"
          disabled={isAnimating}
        >
          <CircleChevronRight className="w-8 h-8 md:w-12 md:h-12" />
        </button>
      </div>
    </div>
  );
};