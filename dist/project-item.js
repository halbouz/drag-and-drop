var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./component.js";
import { AutoBind } from "./helper-functions.js";
// This represents a project item
export class ProjectItem extends Component {
    constructor(hostId, project) {
        super("single-project", hostId, "beforeend", project.id);
        this.project = project;
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
        this.renderContent();
    }
    //Properly format string for people
    get personsAssigned() {
        if (this.project.people === 1) {
            return "1 person assigned";
        }
        else {
            return `${this.project.people} persons assigned`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(event) {
        console.log("DragEnd");
    }
    //This renders the project content to the list
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title; //Select the title header
        this.element.querySelector("h3").textContent = this.personsAssigned; //Select the people header
        this.element.querySelector("p").textContent = this.project.description; //Select the description paragraph
    }
}
__decorate([
    AutoBind
], ProjectItem.prototype, "dragStartHandler", null);
//# sourceMappingURL=project-item.js.map