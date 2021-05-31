import { Component } from "./component.js";
import { Project } from "./project.js";
import { AutoBind } from "./helper-functions.js";
import { Draggable } from "./interfaces.js";

// This represents a project item
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  //Properly format string for people
  get personsAssigned() {
    if (this.project.people === 1) {
      return "1 person assigned";
    } else {
      return `${this.project.people} persons assigned`;
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, "beforeend", project.id);
    this.project = project;

    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(event: DragEvent) {
    console.log("DragEnd");
  }

  //This renders the project content to the list
  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title; //Select the title header
    this.element.querySelector("h3")!.textContent = this.personsAssigned; //Select the people header
    this.element.querySelector("p")!.textContent = this.project.description; //Select the description paragraph
  }
}
