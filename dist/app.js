"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//This decorator allows us to autobind our class's element when we call functions
function AutoBind(_, __, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class ProjectInput {
    constructor() {
        //This represents the template for the form that we want to render to the DOM
        this.templateElement = document.getElementById('project-input');
        //This represents the div in which we want to render the templates
        this.hostElement = document.getElementById('app');
        //We import the content of the template and assign it to our form element
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        //We insert our form element into our div
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
        //This represents the title input
        this.titleInputElement = this.element.querySelector('#title');
        //This represents the description input
        this.descriptionInputElement = this.element.querySelector('#description');
        //This represents the people input
        this.peopleInputElement = this.element.querySelector('#people');
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }
    configure() {
        this.element.addEventListener('submit', this.handleSubmit);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "handleSubmit", null);
//Instantiating our class
const projInput = new ProjectInput();
//# sourceMappingURL=app.js.map