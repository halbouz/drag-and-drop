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
//ProjectInput class
class ProjectInput {
    constructor() {
        //This represents the template for the form that we want to render to the DOM
        this.templateElement = document.getElementById("project-input");
        //This represents the div in which we want to render the template
        this.hostElement = document.getElementById("app");
        //We import the content of the template and assign it to our form element
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        //We insert our form element into our div
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
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
        if (validateString(title, [5, 40]) &&
            validateString(description, [30, 200]) &&
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
    handleSubmit(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
        }
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "handleSubmit", null);
//ProjectList Class
class ProjectList {
    constructor(type) {
        this.type = type;
        //This represents the template for the section we want to render to the DOM
        this.templateElement = document.getElementById('project-list');
        //This represents the div in which we want to render the template
        this.hostElement = document.getElementById('app');
        //We import the content of the template and assign it to our section element
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        //We insert our section element into our div
        this.hostElement.insertAdjacentElement("beforeend", this.element);
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}
//Instantiating our class
const projInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
//# sourceMappingURL=app.js.map