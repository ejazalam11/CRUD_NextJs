import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  className: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, className, label, value, onChange }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
