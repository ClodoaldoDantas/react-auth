import React from 'react';
import styles from '../styles/components/Center.module.css';

export default function Center({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
