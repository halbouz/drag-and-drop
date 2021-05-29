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

//This represents the 2 possible statuses of a project
enum ProjectStatus {Active, Finished}

class Project {
  constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {
  }
}

type Listener = (items: Project[]) => void

class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  //Every ProjectState class has the same initial values, so we make a getInstance
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  //This adds a listener function to our list of listener functions
  addListener(listenerFn: Listener){
    this.listeners.push(listenerFn);
  }

  //This adds a project to the list
  addProject(title: string, description: string, numOfPeople: number) {
    //Creating a new project with the input
    const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
    //Adding the project to the project list
    this.projects.push(newProject);
    
    //Looping through all listener functions and applying them to the projects array
    for (const listenerFn of this.listeners){
      listenerFn(this.projects.slice());
    }
  }
}

//Instantiating 
const projectState = ProjectState.getInstance();

//ProjectInput class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    //This represents the template for the form that we want to render to the page
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

    //If the input respects all constraints, save the input in an array
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

//ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    this.assignedProjects = []

    //This represents the template for the section we want to render to the page
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;

    //This represents the div in which we want to render the template
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    //We import the content of the template and assign it to our section element
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    //Add a function that renders the list of projects to the page
    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    })

    //We insert our section element into our div
    this.hostElement.insertAdjacentElement("beforeend", this.element);
    this.renderContent();
  }

  //This renders the project list to the page
  private renderProjects() {
    //Retrieving the list header
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement

    //Iterate through every project and render it as a list item
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement('li')
      listItem.textContent = prjItem.title //Display the title of the project
      listEl.appendChild(listItem); //Append the project to the list
    }
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
}

//Instantiating our classes
const projInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
