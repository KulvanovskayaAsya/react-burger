import React from 'react';
import styles from './flex-container.module.css';

export interface IFlexContainerProps {
  children: React.ReactNode;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  flexDirection?: 'row' | 'column';
  gap?: string;
  className?: string;
}

export const FlexContainer: React.FC<IFlexContainerProps> = ({
  children,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  flexDirection = 'row',
  gap,
  className = '',
}) => {
  return (
    <div
      className={`${styles.flexContainer} ${className}`}
      style={{ justifyContent, alignItems, flexDirection, gap }}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
