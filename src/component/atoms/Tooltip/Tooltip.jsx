import React, { useState, useRef, useEffect } from 'react';
import classes from './Tooltip.module.css';

export const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltipStyle, setTooltipStyle] = useState({});

  const calculatePosition = () => {
    if (!containerRef.current || !tooltipRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const style = {};

    switch (position) {
      case 'top':
        style.bottom = `${window.innerHeight - containerRect.top + 8}px`;
        style.left = `${containerRect.left + containerRect.width / 2}px`;
        style.transform = 'translateX(-50%)';
        break;
      case 'bottom':
        style.top = `${containerRect.bottom + 8}px`;
        style.left = `${containerRect.left + containerRect.width / 2}px`;
        style.transform = 'translateX(-50%)';
        break;
      case 'left':
        style.right = `${window.innerWidth - containerRect.left + 8}px`;
        style.top = `${containerRect.top + containerRect.height / 2}px`;
        style.transform = 'translateY(-50%)';
        break;
      case 'right':
        style.left = `${containerRect.right + 8}px`;
        style.top = `${containerRect.top + containerRect.height / 2}px`;
        style.transform = 'translateY(-50%)';
        break;
      default:
        break;
    }
    setTooltipStyle(style);
  };

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      // Recalculate position on scroll or resize
      window.addEventListener('scroll', calculatePosition);
      window.addEventListener('resize', calculatePosition);
    } else {
      // Clean up event listeners when tooltip is hidden
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    }

    // Clean up on component unmount
    return () => {
      window.removeEventListener('scroll', calculatePosition);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isVisible, position]); // Recalculate if visibility or position changes

  return (
    <div 
      className={classes.tooltipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      ref={containerRef}
    >
      {children}
      {isVisible && (
        <div 
          className={`${classes.tooltip} ${classes[position]}`}
          style={tooltipStyle}
          ref={tooltipRef}
        >
          {content}
        </div>
      )}
    </div>
  );
}; 