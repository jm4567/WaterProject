import { useState, useEffect } from 'react';
import { Project } from './types/Projects';

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]); //set projects is a function to update the projects array
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        'https://localhost:5000/api/Water/AllProjects'
      );
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects(); //fetch projects = pulls the data, if not then empty array
  }, []);
  return (
    <>
      <h1>Water Projects</h1>
      <br />
      {projects.map((p) => (
        <div id="projectCard">
          <h3>{p.projectName}</h3>
          <ul>
            <li>Project Type: {p.projectType}</li>
            <li>Regional Program: {p.projectRegionalProgram}</li>
            <li>Impact: {p.projectImpact} Individuals Served</li>
            <li>Project Phase: {p.projectPhase}</li>
            <li>Project Status: {p.projectFunctionalityStatus}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default ProjectList;
