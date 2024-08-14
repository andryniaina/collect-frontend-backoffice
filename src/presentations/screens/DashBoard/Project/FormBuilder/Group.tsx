import React, { useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import Item from "./Item";

const Group: React.FC<any> = ({
  questions,
  handleAddQuestion,
  group,
  moveItem,
  updateGroupName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(group.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item: any & { groupId: string | null }, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      if (item.groupId !== group.id) {
        moveItem(item.id, group.id, group.items.length);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (editedName.trim() !== '') {
      updateGroupName(group.id, editedName);
    } else {
      setEditedName(group.name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameBlur();
    }
  };


  return (
    <div
      ref={drop}
      style={{
        margin: "10px 0",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        minWidth: "250px",
        backgroundColor: isOver ? "#e6f7ff" : "white",
        transition: "background-color 0.2s ease",
      }}
    >
     {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editedName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          onKeyDown={handleKeyDown}
          style={{ fontSize: '1.17em', fontWeight: 'bold', width: '100%', marginBottom: '10px' }}
        />
      ) : (
        <h3 onClick={handleNameClick} style={{ cursor: 'pointer' }}>
          {group.name}
        </h3>
      )} 
      {group.items.map((item: any, index: any) => (
        <Item
          key={item.id}
          id={item.id}
          label={item.label}
          index={index}
          groupId={group.id}
          moveItem={moveItem}
          keyValue={index}
          question={item.label}
          questions={questions}
          onAddQuestion={handleAddQuestion(index)}
        />
      ))}
    </div>
  );
};

export default Group;
