//This decorator autobinds our class's element when we call functions
function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

//This function checks if a string respects length constraints
function validateString(
  input: string,
  [minLength, maxLength]: [number, number]
) {
  return input.length >= minLength && input.length <= maxLength;
}

//ProjectInput class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    //This represents the template for the form that we want to render to the DOM
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;

    //This represents the div in which we want to render the template
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    //We import the content of the template and assign it to our form element
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";

    //We insert our form element into our div
    this.hostElement.insertAdjacentElement("afterbegin", this.element);

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

    if (
      validateString(title, [5, 40]) &&
      validateString(description, [30, 200]) &&
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

  @AutoBind
  private handleSubmit(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      console.log(title, desc, people);
    }
  }
}

//ProjectList Class
class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;

    constructor(private type: 'active' | 'finished') {
        //This represents the template for the section we want to render to the DOM
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;

        //This represents the div in which we want to render the template
        this.hostElement = document.getElementById('app')! as HTMLDivElement

        //We import the content of the template and assign it to our section element
        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`

        //We insert our section element into our div
        this.hostElement.insertAdjacentElement("beforeend", this.element);
        this.renderContent()
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
    }   

}

//Instantiating our class
const projInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');