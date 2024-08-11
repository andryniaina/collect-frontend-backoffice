import React, { useEffect, useState } from 'react';
import './index.css';
import { FaEdit, FaCog } from 'react-icons/fa';
import TypesBox from '../TypesBox';
import { SettingsModal } from '@/components/modal/settings-modal';
import { ISettings } from '@/data/types/settingsTypes';

interface FormBuilderProps {
  onAddQuestion: any ;
  question?: string;
  keyValue?: any;
  questions: any[];
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onAddQuestion, question, keyValue, questions }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [questionText, setQuestionText] = useState(question || '');
  const [isChoosingType, setIsChoosingType] = useState(false)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settingsData, setSettingsData] = useState<ISettings>({});

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
    onAddQuestion({label:questionText, type, settingsData});
    setIsEditing(false);
  };

  useEffect(() => {
    onAddQuestion({label:questionText, settingsData});
  } , [settingsData])

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSettingsClick = () => {
    //open modal
    setOpen(true);
  };

  const handleConfirm = () => {
    //close modal
    setOpen(false);
  };

  return (
    <div className="form-builder-container">
      <SettingsModal
        key={keyValue}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
        loading={loading}
        settingsData={settingsData}
        setSettingsData={setSettingsData}
        questions={questions}
      />
      {!isEditing ? (
        <>
          {question ? (
            <>
              <div className="question-text">{question}</div>
              <button className="settings-button" onClick={handleSettingsClick}><FaCog size={15}/></button>
              <button className="edit-question-button" onClick={handleEditClick}><FaEdit size={15}/></button>
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
