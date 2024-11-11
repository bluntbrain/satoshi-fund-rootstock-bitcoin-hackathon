import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  gradient?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  gradient = true,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300';
  
  const variants = {
    primary: gradient
      ? 'bg-gradient-to-r from-bitcoin to-bitcoin-dark hover:from-bitcoin-dark hover:to-bitcoin text-white shadow-lg shadow-bitcoin/20'
      : 'bg-bitcoin hover:bg-bitcoin-dark text-white',
    secondary: gradient
      ? 'bg-gradient-to-r from-dark-700 to-dark-600 hover:from-dark-600 hover:to-dark-700 text-white'
      : 'bg-dark-700 hover:bg-dark-600 text-white',
    danger: gradient
      ? 'bg-gradient-to-r from-accent-red to-accent-red-dark hover:from-accent-red-dark hover:to-accent-red text-white shadow-lg shadow-accent-red/20'
      : 'bg-accent-red hover:bg-accent-red-dark text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} hover:scale-105`}
      {...props}
    >
      {children}
    </button>
  );
};