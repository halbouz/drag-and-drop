var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./component.js";
import { AutoBind } from "./helper-functions.js";
import { projectState } from "./project-state.js";
import { ProjectStatus } from "./project.js";
import { ProjectItem } from "./project-item.js";
//This represents the project lists
export class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", "beforeend", `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        //We add a function that renders the list of projects to the page
        projectState.addListener((projects) => {
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
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        projectState.moveProject(prjId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    //This renders the list headers to the page
    renderContent() {
        const listId = `${this.type}-projects-list`;
        //Give an id to the list header which corresponds to its type
        this.element.querySelector("ul").id = listId;
        //Change the text of the list header corresponding to its type
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    //This renders the project list to the page
    renderProjects() {
        //Retrieving the list header
        const listEl = document.getElementById(`${this.type}-projects-list`);
        //Clear the list since we're going to add everything again
        listEl.innerHTML = "";
        //Iterate through every project and render it as a list item
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
}
__decorate([
    AutoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=project-list.js.map