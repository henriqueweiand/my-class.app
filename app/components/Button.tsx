'use client';

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  loading = false,
  disabled,
  icon: Icon,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        btn
        ${outline ? 'btn-outline' : ''}
        ${loading ? 'loading' : ''}
        gap-2
      `}
    >
      {Icon && (
        <Icon
          size={24}
        />
      )}
      {label}
    </button>
  );
}

export default Button;