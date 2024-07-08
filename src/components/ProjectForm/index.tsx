import React from 'react';
import './index.css';

const ProjectForm: React.FC = () => {
  return (
    <div className="project-form">
      <label htmlFor="project-name">Name of project:</label>
      <input type="text" id="project-name" name="project-name" />
      <button className="save-button">Save</button>
    </div>
  );
};

export default ProjectForm;
