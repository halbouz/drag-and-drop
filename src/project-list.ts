import { Component } from "./component";
import { AutoBind } from "./helper-functions";
import { projectState } from "./project-state";
import { Project, ProjectStatus } from "./project";
import { ProjectItem } from "./project-item";
import { DragTarget } from "./interfaces";

//This represents the project lists
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", "beforeend", `${type}-projects`);
    this.assignedProjects = [];

    //We add a function that renders the list of projects to the page
    projectState.addListener((projects: Project[]) => {
      //We only render the relevant projects, meaning the projects that have the same status as the status of the list we're on
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    //We render the list to the page
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @AutoBind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  //This renders the list headers to the page
  private renderContent() {
    const listId = `${this.type}-projects-list`;

    //Give an id to the list header which corresponds to its type
    this.element.querySelector("ul")!.id = listId;

    //Change the text of the list header corresponding to its type
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  //This renders the project list to the page
  private renderProjects() {
    //Retrieving the list header
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    //Clear the list since we're going to add everything again
    listEl.innerHTML = "";

    //Iterate through every project and render it as a list item
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
    }
  }
}
