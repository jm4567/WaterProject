import { useState, useEffect } from 'react';
import { Project } from './types/Projects';

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]); //set projects is a function to update the projects array
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Water/AllProjects?pageHowMany=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setProjects(data.projects); //get it from JSON!!!!! so whatever name you get from the json, name it the same way
      setTotalItems(data.totalNumProjects);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };
    fetchProjects(); //fetch projects = pulls the data, if not then empty array
  }, [pageSize, pageNum, totalItems]); //dependency array
  return (
    <>
      <h1>Water Projects</h1>
      <br />
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type: </strong>
                {p.projectType}
              </li>
              <li>
                <strong>Regional Program: </strong>
                {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact: </strong>
                {p.projectImpact} Individuals Served
              </li>
              <li>
                <strong>Project Phase: </strong>
                {p.projectPhase}
              </li>
              <li>
                <strong>Project Status: </strong>
                {p.projectFunctionalityStatus}
              </li>
            </ul>
          </div>
        </div>
      ))}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map(
        (
          _,
          index //index acts as i in the for loop. underscore ignores first value in array
        ) => (
          <button
            key={index + 1}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button> //increment index+1
        )
      )}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
      <br />
    </>
  );
}

export default ProjectList;
