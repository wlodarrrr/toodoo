export default function ProjectsPanel({ projects, selectedProject, handleProjectClick }) {
  return (
    <div className="card">
    <div className="card-header text-center">Projects</div>
      <div className=" card-body ">
        <ul className=" list-group gap-2">
          {projects.map((project, index) => (
            <li
              key={index}
              className={'badge btn bg-success' + (selectedProject === project ? ' border border-light border-2' : '')}
              onClick={() => handleProjectClick(project)}
            >
              {'#' + project}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
