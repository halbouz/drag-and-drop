//Component class used to render the initial templates, used for project lists and project input form
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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