import React, { useRef, forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

// --- Inline useMousePosition hook ---
function useMousePosition() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);
  return mouse;
}

// --- Inline distance function ---
function distance(x1, y1, x2, y2) {
  let a = x1 - x2;
  let b = y1 - y2;
  return Math.hypot(a, b);
}

// Replace theme references with hardcoded values
const BUTTON_COLOR = "#fff";
const BUTTON_BG = "#312b35";
const BUTTON_BORDER = "#315e55";
const BUTTON_COLOR_HOVER = "#fff";
const BUTTON_BG_HOVER = "#315e55";
const BUTTON_BORDER_HOVER = "#315e55";

const Text = styled(motion.span)`
  display: block;
  position: relative;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 50%;
    left: 50%;
    color: ${BUTTON_COLOR};
    white-space: nowrap;
    transform: translate3d(-50%, -50%, 0);
    transition: all 0.65s cubic-bezier(0.23, 1, 0.32, 1);
  }

  &::after {
    color: ${BUTTON_COLOR_HOVER};
    transform: translate3d(-50%, 140%, 0);
  }
`;

const Style = styled.button`
  position: relative;
  display: inline-flex;
  margin: 1em;
  padding: 1em 2em;
  font-size: 1.25em;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.025em;
  color: ${BUTTON_COLOR};
  background: ${BUTTON_BG};
  border: 2px solid ${BUTTON_BORDER};
  border-radius: 0.25em;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.75s cubic-bezier(0.23, 1, 0.32, 1);

  > span {
    z-index: 100;
    position: relative;
    color: transparent;
  }

  &:hover {
    border-color: ${BUTTON_BORDER_HOVER};
    background: ${BUTTON_BG_HOVER};

    ${Text} {
      &::before {
        transform: translate3d(-50%, -300%, 0);
      }

      &::after {
        color: ${BUTTON_COLOR_HOVER};
        transform: translate3d(-50%, -50%, 0);
      }
    }
  }
`;

const Fill = styled(motion.div)`
  pointer-events: none;
  transform: translate3d(0, 80%, 0);
`;

const MagneticButton = forwardRef((props, ref) => {
  const { x: mouseX, y: mouseY } = useMousePosition();
  const textRef = useRef();
  const fillControls = useAnimation();

  useEffect(() => {
    let x = 0;
    let y = 0;

    if (ref) {
      const node = ref.current;

      // New values for the translations
      const rect = node.getBoundingClientRect();
      const distanceToTrigger = rect.width * 0.7;
      const distanceMouseButton = distance(
        mouseX + window.scrollX,
        mouseY + window.scrollY,
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      );

      // Handle magnetic effect
      if (distanceMouseButton < distanceToTrigger) {
        // Translate button position on hover
        x = (mouseX + window.scrollX - (rect.left + rect.width / 2)) * 0.2;
        y = (mouseY + window.scrollY - (rect.top + rect.height / 2)) * 0.2;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        textRef.current.style.transform = `translate3d(${x / 4}px, ${
          y / 4
        }px, 0)`;
      } else {
        // Restore initial position
        node.style.transform = `translate3d(0, 0, 0)`;
        textRef.current.style.transform = `translate3d(0, 0, 0)`;
      }

      const handleMouseEnter = () => {
        // Handle background color animation
        fillControls.start({
          y: ['80%', '-10%'],
          transition: { ease: [0.19, 1, 0.22, 1], duration: 0.55 }
        });
      };

      const handleMouseLeave = () => {
        fillControls.start({
          y: '-80%',
          transition: { ease: [0.19, 1, 0.22, 1], duration: 0.55 }
        });
      };

      if (node) {
        node.addEventListener('mouseenter', handleMouseEnter);
        node.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          node.removeEventListener('mouseenter', handleMouseEnter);
          node.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }
  }, [mouseX, mouseY, ref, textRef, fillControls]);

  return (
    <Style ref={ref} onClick={props.onClick}>
      <span ref={textRef}>
        <Text data-text={props.children}>{props.children}</Text>
      </span>
      <Fill animate={fillControls} />
    </Style>
  );
});

export default MagneticButton;