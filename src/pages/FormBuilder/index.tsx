import React, { useEffect, useState } from 'react';
import ProjectForm from '../../components/ProjectForm';
import FormBuilder from '../../components/FormItem';
import './index.css';
import { postForm } from '../../services/forms';

const FormBuilderPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);

  const handleAddQuestion = (index: number) => (question: any) => {
    const newQuestions = [...questions];
    newQuestions[index]["label"] = question.label;
    newQuestions[index]["type"] = question.type ;
    setQuestions(newQuestions);
  };

  const handleAddNewFormBuilder = () => {
    setQuestions([...questions, {label:"",type:""}]);
  };

  useEffect(()=>{
    console.log({questions})
  },[questions])

  const submitForm = async(projectName: string) => {
    let payload:any = {name:projectName} ;
    payload["fields"] = questions.map(({label,type}:any)=>{
        return {name:label , type} 
    })
    console.log({payload}) ;
    await postForm(payload) ;
  }

  return (
    <div className="form-builder-page">
      <ProjectForm onSubmit={submitForm} />
      {questions.map((question, index) => (
        <FormBuilder
          key={index}
          question={question.label}
          onAddQuestion={handleAddQuestion(index)}
        />
      ))}
      <button className="add-new-form-builder-button" onClick={handleAddNewFormBuilder}>
        + Add New Question
      </button>
    </div>
  );
};

export default FormBuilderPage;
