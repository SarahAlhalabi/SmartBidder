import { useSelector } from "react-redux"
import ProjectList from "./ProjectList"
import ProjectVerification from "./ProjectVerification"
import ProjectAnalytics from "./ProjectAnalytics"

const ProjectsPage = () => {
  const projects = useSelector((state) => state.projects)

  return (
    <div>
      <h1>Projects Management</h1>
      <ProjectVerification />
      <ProjectList projects={projects} />
      <ProjectAnalytics />
    </div>
  )
}

export default ProjectsPage
