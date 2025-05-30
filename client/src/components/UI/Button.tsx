import React from 'react';
import clsx from 'clsx';

type Variant = 'default' | 'destructive' | 'outline';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  variant?: Variant;
  disabled?: boolean;
};

const variantClasses: Record<Variant, string> = {
  default: 'bg-tealLight/90 text-white hover:bg-teal',
  destructive: 'bg-grayLight/90 text-white hover:bg-grayDark',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'default',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        variantClasses[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
