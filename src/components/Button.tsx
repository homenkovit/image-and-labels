import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, small, ...attributes }) => (
  <button {...attributes} className={`${styles.button} ${small && styles.small} ${attributes.className}`}>{children}</button>
);
