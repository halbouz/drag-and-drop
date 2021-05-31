import { Component } from './component.js';
import { validateString, AutoBind } from './helper-functions.js'
import { projectState } from './project-state.js'

//This represents the input form
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
  
    constructor() {
      super("project-input", "app", "afterbegin", "user-input");
      //This represents the title input
      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
  
      //This represents the description input
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
  
      //This represents the people input
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
  
      //We add an event listener that handles submitting the form
      this.element.addEventListener("submit", this.handleSubmit);
    }
  
    //This function gathers the input in the form and handles it
    private gatherUserInput(): [string, string, number] | void {
      const title = this.titleInputElement.value;
      const description = this.descriptionInputElement.value;
      const people = this.peopleInputElement.value;
  
      //If the input respects all constraints, save the input in an array
      if (
        validateString(title, [5, 40]) &&
        validateString(description, [10, 200]) &&
        people.length !== 0
      ) {
        this.clearInputs();
        return [title, description, +people];
      } else {
        alert("Invalid Input, please try again");
        return;
      }
    }
  
    //This clears the inputs once we submit the form
    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }
  
    //This handles the submit button
    @AutoBind
    private handleSubmit(event: Event) {
      event.preventDefault(); //Preventing the default action of pressing a button
      const userInput = this.gatherUserInput(); //Save the input in the array userInput
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people); //Add the project to the list
        console.log(title, desc, people);
      }
    }
  }