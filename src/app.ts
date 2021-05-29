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

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

//This represents the 2 possible types of a project
enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  //This adds a listener function to our list of listener functions
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
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
  addProject(title: string, description: string, numOfPeople: number) {
    //Creating a new project with the input
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );

    //Adding the project to the project list
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId)
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners){
      listenerFn(this.projects.slice())
    }
  }
}

//Instantiating
const projectState = ProjectState.getInstance();

//Component class used to render the initial templates, used for project lists and project input form
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertLocation: InsertPosition,
    newElementId?: string
  ) {
    //This gets the template by id
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    //This gets the host by id
    this.hostElement = document.getElementById(hostElementId)! as T;

    //This copies the content of the template
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    //This creates an instance of the template
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    //This inserts the instance into the host, rendering it to the page
    this.hostElement.insertAdjacentElement(insertLocation, this.element);
  }
}

// This represents a project list item
class ProjectItem
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

//This represents the input form
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

//This represents the project lists
class ProjectList
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
    if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable')
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
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

//Instantiating our classes
const projInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
