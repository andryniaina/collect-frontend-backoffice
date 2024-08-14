import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import FormBuilder from '@/components/FormItem';

const Item: React.FC<any> = ({key, keyValue, question, questions, onAddQuestion, id, label, index, groupId, moveItem }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { id, label, index, groupId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (item: any) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragGroupId = item.groupId;
      const hoverGroupId = groupId;

      if (dragIndex === hoverIndex && dragGroupId === hoverGroupId) {
        return;
      }

      moveItem(item.id, hoverGroupId, hoverIndex);
      item.index = hoverIndex;
      item.groupId = hoverGroupId;
    },
  });

  drag(drop(ref));

  return (
    <div 
      ref={ref}
    >
      <FormBuilder
              key={key}
              keyValue={keyValue}
              question={question}
              questions={questions}
              onAddQuestion={onAddQuestion}
            />
    </div>
  );
};

export default Item;