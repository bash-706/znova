import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaExpand } from 'react-icons/fa';

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 80%;
  border-radius: 0.5rem;
`;

const LightboxClose = styled(FaTimes)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 2rem;
  cursor: pointer;
  color: white;
`;

const LightboxExpand = styled(FaExpand)`
  position: absolute;
  top: 2rem;
  right: 6rem;
  font-size: 2rem;
  cursor: pointer;
  color: white;
`;

const Lightbox = ({ image, onClose }) => {
  const imgRef = useRef();

  const handleFullScreen = () => {
    if (imgRef.current.requestFullscreen) {
      imgRef.current.requestFullscreen();
    } else if (imgRef.current.mozRequestFullScreen) {
      imgRef.current.mozRequestFullScreen();
    } else if (imgRef.current.webkitRequestFullscreen) {
      imgRef.current.webkitRequestFullscreen();
    } else if (imgRef.current.msRequestFullscreen) {
      imgRef.current.msRequestFullscreen();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <LightboxOverlay onClick={handleOverlayClick}>
      <LightboxClose onClick={onClose} />
      <LightboxExpand onClick={handleFullScreen} />
      <LightboxImage
        ref={imgRef}
        src={image}
        alt="Lightbox"
        onClick={(e) => e.stopPropagation()}
      />
    </LightboxOverlay>
  );
};

export default Lightbox;
