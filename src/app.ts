//This decorator allows us to autobind our class's element when we call functions
function AutoBind(_: any, __: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn;
        }
    }
    return adjDescriptor;
}


class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        //This represents the template for the form that we want to render to the DOM
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        //This represents the div in which we want to render the templates
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        
        //We import the content of the template and assign it to our form element
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input'

        //We insert our form element into our div
        this.hostElement.insertAdjacentElement('afterbegin', this.element);

        //This represents the title input
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;

        //This represents the description input
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;

        //This represents the people input
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
        
        this.configure();
    }


    @AutoBind
    private handleSubmit(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.element.addEventListener('submit', this.handleSubmit);
    }
}

//Instantiating our class
const projInput = new ProjectInput();