import { FC } from 'react';
import styles from './Header.module.scss';

export const Header: FC = ({ children }) => (
  <header className={styles.header}>
    <h1 className={styles.h1}>Image and labels</h1>
    <p className={styles.hint}>Click on image to make label</p>
    {!!children && <div className={styles['center-portal']}>{children}</div>}
  </header>
);
