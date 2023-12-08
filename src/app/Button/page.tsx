import React, { ReactNode } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, style }) => {
  return (
    <button className={className} onClick={onClick} style={style}>
      {label}
    </button>
  );
};

export default Button;
