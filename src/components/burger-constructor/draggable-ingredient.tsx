import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import styles from './draggable-ingredient.module.css';

interface IDraggableIngredientProps {
  index: number;
  onMove: (fromIndex: number, toIndex: number) => void;
  children: React.ReactNode;
}

export const DraggableIngredient: React.FC<IDraggableIngredientProps> = ({
  index,
  onMove,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'sortIngredient',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'sortIngredient',
    hover: (item: { index: number }) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      onMove(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div className={`${styles.ingredient} ${isDragging ? styles.dragging : ''}`} ref={ref}>
      {children}
    </div>
  );
};
