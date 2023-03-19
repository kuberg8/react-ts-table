import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, type = "button", onClick, className }) => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};

export default Button;
