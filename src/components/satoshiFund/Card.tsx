import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  gradient = true,
  hover = true,
}) => {
  return (
    <div
      className={`
        ${gradient ? 'card-gradient' : 'bg-dark-800'}
        ${hover ? 'hover-float' : ''}
        border border-dark-600/50 rounded-xl p-6
        backdrop-blur-sm shadow-lg
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};