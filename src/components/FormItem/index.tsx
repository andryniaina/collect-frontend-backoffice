import React, { useState } from 'react';
import './index.css';
import { FaEdit } from 'react-icons/fa';
import TypesBox from '../TypesBox';

interface FormBuilderProps {
  onAddQuestion: any ;
  question?: string;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onAddQuestion, question }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [questionText, setQuestionText] = useState(question || '');
  const [isChoosingType, setIsChoosingType] = useState(false)

  const handleAddQuestionClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setQuestionText('');
  };

  const handleChooseType = () => {
    setIsChoosingType(true) ;
  }

  const handleSaveClick = (type: string) => {
    onAddQuestion({label:questionText, type});
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="form-builder-container">
      {!isEditing ? (
        <>
          {question ? (
            <>
              <div className="question-text">{question}</div>
              <button className="edit-question-button" onClick={handleEditClick}><FaEdit/></button>
            </>
          ) : (
            <>
              <div className="empty-form-message">
                This form is currently empty.
                You can add questions, notes, prompts, or other fields by clicking on the '+' sign below.
              </div>
              <button className="add-question-button" onClick={handleAddQuestionClick}>+</button>
            </>
          )}
        </>
      ) : (
        <>
          <button className="cancel-button" onClick={handleCancelClick}>x</button>
          <div className="question-input-container">
            <input
              type="text"
              placeholder="Enter your question here..."
              className="question-input"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <button className="add-question-submit-button" onClick={handleChooseType}>+ADD QUESTION</button>
          </div>
          {isChoosingType && <TypesBox onClick={handleSaveClick}/>}
        </>
      )}
    </div>
  );
};

export default FormBuilder;
