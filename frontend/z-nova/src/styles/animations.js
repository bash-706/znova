import { keyframes } from 'styled-components';

// Fade In
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Fade Out
export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// Slide In from Left
export const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Slide In from Right
export const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

// Slide In from Top
export const slideInTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Slide In from Bottom
export const slideInBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Bounce In
export const bounceIn = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Bounce Out
export const bounceOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.5);
    opacity: 0;
  }
`;

// Rotate In
export const rotateIn = keyframes`
  from {
    transform: rotate(-200deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
`;

// Rotate Out
export const rotateOut = keyframes`
  from {
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(200deg);
    opacity: 0;
  }
`;

// Zoom In
export const zoomIn = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Zoom Out
export const zoomOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0);
    opacity: 0;
  }
`;

// Pulse
export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Swing
export const swing = keyframes`
  20% {
    transform: rotate(15deg);
  }
  40% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

// Shake
export const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(10px);
  }
`;

// Flip
export const flip = keyframes`
  from {
    transform: perspective(400px) rotateY(0);
  }
  to {
    transform: perspective(400px) rotateY(360deg);
  }
`;

// Flash
export const flash = keyframes`
  from, 50%, to {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
`;

// Rubber Band
export const rubberBand = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.25, 0.75);
  }
  40% {
    transform: scale(0.75, 1.25);
  }
  50% {
    transform: scale(1.15, 0.85);
  }
  65% {
    transform: scale(0.95, 1.05);
  }
  75% {
    transform: scale(1.05, 0.95);
  }
  100% {
    transform: scale(1);
  }
`;

// Fade In Up
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Fade In Down
export const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Fade In Left
export const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Fade In Right
export const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Slide Out Left
export const slideOutLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

// Slide Out Right
export const slideOutRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

// Slide Out Up
export const slideOutUp = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

// Slide Out Down
export const slideOutDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

// Bounce In Left
export const bounceInLeft = keyframes`
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  from {
    opacity: 0;
    transform: translateX(-3000px);
  }
  60% {
    opacity: 1;
    transform: translateX(25px);
  }
  75% {
    transform: translateX(-10px);
  }
  90% {
    transform: translateX(5px);
  }
  to {
    transform: translateX(0);
  }
`;

// Bounce In Right
export const bounceInRight = keyframes`
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  from {
    opacity: 0;
    transform: translateX(3000px);
  }
  60% {
    opacity: 1;
    transform: translateX(-25px);
  }
  75% {
    transform: translateX(10px);
  }
  90% {
    transform: translateX(-5px);
  }
  to {
    transform: translateX(0);
  }
`;

// Bounce In Up
export const bounceInUp = keyframes`
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  from {
    opacity: 0;
    transform: translateY(3000px);
  }
  60% {
    opacity: 1;
    transform: translateY(-20px);
  }
  75% {
    transform: translateY(10px);
  }
  90% {
    transform: translateY(-5px);
  }
  to {
    transform: translateY(0);
  }
`;

// Bounce In Down
export const bounceInDown = keyframes`
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  from {
    opacity: 0;
    transform: translateY(-3000px);
  }
  60% {
    opacity: 1;
    transform: translateY(25px);
  }
  75% {
    transform: translateY(-10px);
  }
  90% {
    transform: translateY(5px);
  }
  to {
    transform: translateY(0);
  }
`;

// Flip In X
export const flipInX = keyframes`
  from {
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotateX(-10deg);
  }
  70% {
    transform: perspective(400px) rotateX(10deg);
  }
  100% {
    transform: perspective(400px) rotateX(0deg);
    opacity: 1;
  }
`;

// Flip In Y
export const flipInY = keyframes`
  from {
    transform: perspective(400px) rotateY(90deg);
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotateY(-10deg);
  }
  70% {
    transform: perspective(400px) rotateY(10deg);
  }
  100% {
    transform: perspective(400px) rotateY(0deg);
    opacity: 1;
  }
`;

// Light Speed In Right
export const lightSpeedInRight = keyframes`
  from {
    transform: translateX(100%) skewX(-30deg);
    opacity: 0;
  }
  60% {
    transform: skewX(20deg);
    opacity: 1;
  }
  80% {
    transform: skewX(-5deg);
  }
  to {
    transform: translateX(0) skewX(0);
  }
`;

// Light Speed In Left
export const lightSpeedInLeft = keyframes`
  from {
    transform: translateX(-100%) skewX(30deg);
    opacity: 0;
  }
  60% {
    transform: skewX(-20deg);
    opacity: 1;
  }
  80% {
    transform: skewX(5deg);
  }
  to {
    transform: translateX(0) skewX(0);
  }
`;

// Rotate In Down Left
export const rotateInDownLeft = keyframes`
  from {
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0);
    opacity: 1;
  }
`;

// Rotate In Down Right
export const rotateInDownRight = keyframes`
  from {
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0);
    opacity: 1;
  }
`;

// Rotate In Up Left
export const rotateInUpLeft = keyframes`
  from {
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0);
    opacity: 1;
  }
`;

// Rotate In Up Right
export const rotateInUpRight = keyframes`
  from {
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0);
    opacity: 1;
  }
`;

// Heart Beat
export const heartBeat = keyframes`
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
`;

// Hinge
export const hinge = keyframes`
  0% {
    transform: rotate(0);
    transform-origin: top left;
    animation-timing-function: ease-in-out;
  }
  20%, 60% {
    transform: rotate(80deg);
    transform-origin: top left;
    animation-timing-function: ease-in-out;
  }
  40% {
    transform: rotate(60deg);
    transform-origin: top left;
    animation-timing-function: ease-in-out;
  }
  80% {
    transform: rotate(60deg) translateY(0);
    opacity: 1;
    transform-origin: top left;
    animation-timing-function: ease-in-out;
  }
  to {
    transform: translateY(700px);
    opacity: 0;
  }
`;

// Jello
export const jello = keyframes`
  from, 11.1%, to {
    transform: none;
  }
  22.2% {
    transform: skewX(-12.5deg) skewY(-12.5deg);
  }
  33.3% {
    transform: skewX(6.25deg) skewY(6.25deg);
  }
  44.4% {
    transform: skewX(-3.125deg) skewY(-3.125deg);
  }
  55.5% {
    transform: skewX(1.5625deg) skewY(1.5625deg);
  }
`;
