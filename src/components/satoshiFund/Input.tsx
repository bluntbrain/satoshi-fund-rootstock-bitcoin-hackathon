import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-200">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2 bg-dark-700 border border-dark-500 rounded-lg
              text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent
              ${error ? 'border-accent-red' : ''}
              ${icon ? 'pl-10' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {(error || helper) && (
          <p className={`text-sm ${error ? 'text-accent-red' : 'text-gray-400'}`}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;