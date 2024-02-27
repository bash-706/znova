import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { HiArrowLeftCircle, HiArrowRightCircle } from 'react-icons/hi2';

const StyledCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 44rem;
  overflow: hidden;
  border-radius: 1rem;
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  height: 100%;
`;

const Slide = styled.img`
  flex: 0 0 auto;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
`;

const ArrowIcon = styled.div`
  position: absolute;
  width: 3rem;
  height: 3rem;
  color: #fff;
  filter: drop-shadow(0 0 2px #555);
  z-index: 1;
  cursor: pointer;

  ${(props) => props.left && 'left: 1rem;'}
  ${(props) => props.right && 'right: 1rem;'}
  top: 50%;
  transform: translateY(-50%);
`;

const Indicators = styled.div`
  display: flex;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active }) => (active ? 'white' : 'gray')};
  box-shadow: 0 0 2px #555;
  margin: 0 0.5rem;
  cursor: pointer;
`;

const Carousel = ({
  slides,
  autoplay = true,
  interval = 5000,
  showDots = true,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const totalSlides = slides.length;

  const nextSlide = () => setSlideIndex((slideIndex + 1) % totalSlides);
  const prevSlide = () =>
    setSlideIndex((slideIndex + totalSlides - 1) % totalSlides);

  const goToSlide = (index) => setSlideIndex(index);

  useEffect(() => {
    let intervalId;

    const handleAutoplay = () => {
      if (!isHovered) {
        intervalId = setInterval(() => {
          nextSlide();
        }, interval);
      }
    };

    if (autoplay) {
      handleAutoplay();
    }

    return () => clearInterval(intervalId);
  }, [slideIndex, isHovered, autoplay, interval, nextSlide]);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  // const transformValue = `translateX(-${slideIndex * (100 / totalSlides)}%)`;

  const transformValue = `translateX(-${slideIndex * 100}%)`;

  return (
    <StyledCarousel onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <ArrowIcon as={HiArrowLeftCircle} left onClick={prevSlide} />
      <SlideContainer ref={containerRef} style={{ transform: transformValue }}>
        {slides.map((slide, index) => (
          <Slide key={index} src={slide.src} alt={`slide-${index}`} />
        ))}
      </SlideContainer>
      <ArrowIcon as={HiArrowRightCircle} right onClick={nextSlide} />
      {showDots && (
        <Indicators>
          {slides.map((_, index) => (
            <Dot
              key={index}
              active={slideIndex === index}
              onClick={() => goToSlide(index)}
            />
          ))}
        </Indicators>
      )}
    </StyledCarousel>
  );
};

export default Carousel;
