"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//This decorator autobinds our class's element when we call functions
function AutoBind(_, __, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
//This function checks if a string respects length constraints
function validateString(input, [minLength, maxLength]) {
    return input.length >= minLength && input.length <= maxLength;
}
//This represents the 2 possible types of a project
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    //This adds a listener function to our list of listener functions
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    //Every ProjectState class has the same initial values, so we make a getInstance
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    //This adds a project to the list
    addProject(title, description, numOfPeople) {
        //Creating a new project with the input
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
        //Adding the project to the project list
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
//Instantiating
const projectState = ProjectState.getInstance();
//Component class used to render the initial templates, used for project lists and project input form
class Component {
    constructor(templateId, hostElementId, insertLocation, newElementId) {
        //This gets the template by id
        this.templateElement = document.getElementById(templateId);
        //This gets the host by id
        this.hostElement = document.getElementById(hostElementId);
        //This copies the content of the template
        const importedNode = document.importNode(this.templateElement.content, true);
        //This creates an instance of the template
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        //This inserts the instance into the host, rendering it to the page
        this.hostElement.insertAdjacentElement(insertLocation, this.element);
    }
}
// This represents a project list item
class ProjectItem extends Component {
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
//This represents the input form
class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", "afterbegin", "user-input");
        //This represents the title input
        this.titleInputElement = this.element.querySelector("#title");
        //This represents the description input
        this.descriptionInputElement = this.element.querySelector("#description");
        //This represents the people input
        this.peopleInputElement = this.element.querySelector("#people");
        //We add an event listener that handles submitting the form
        this.element.addEventListener("submit", this.handleSubmit);
    }
    //This function gathers the input in the form and handles it
    gatherUserInput() {
        const title = this.titleInputElement.value;
        const description = this.descriptionInputElement.value;
        const people = this.peopleInputElement.value;
        //If the input respects all constraints, save the input in an array
        if (validateString(title, [5, 40]) &&
            validateString(description, [10, 200]) &&
            people.length !== 0) {
            this.clearInputs();
            return [title, description, +people];
        }
        else {
            alert("Invalid Input, please try again");
            return;
        }
    }
    //This clears the inputs once we submit the form
    clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    //This handles the submit button
    handleSubmit(event) {
        event.preventDefault(); //Preventing the default action of pressing a button
        const userInput = this.gatherUserInput(); //Save the input in the array userInput
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people); //Add the project to the list
            console.log(title, desc, people);
        }
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "handleSubmit", null);
//This represents the project lists
class ProjectList extends Component {
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
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
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
//Instantiating our classes
const projInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
//# sourceMappingURL=app.js.map