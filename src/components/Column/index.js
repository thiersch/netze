import React from 'react';
import clsx from 'clsx';
import styles from './Column.module.css';

export default function Column({ children, className, style, align }) {
  return (
    <div
      className={clsx('col', className, {
        [styles.columnStretch]: align === 'stretch',
      })}
      style={style}
    >
      {children}
    </div>
  );
}