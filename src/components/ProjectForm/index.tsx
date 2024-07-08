import React, { useState } from 'react';
import './index.css';

interface Props {
    onSubmit?: any
}

const ProjectForm = ({onSubmit}: Props) => {
    const [name,setName] = useState("") ;
  return (
    <div className="project-form">
      <label htmlFor="project-name">Name of the project:</label>
      <input type="text" id="project-name" name="project-name" value={name} onChange={(e:any)=>setName(e.target.value)} />
      <button className="save-button" onClick={()=>onSubmit(name)}>Save</button>
    </div>
  );
};

export default ProjectForm;
