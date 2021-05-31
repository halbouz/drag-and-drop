import { Project, ProjectStatus } from './project.js';
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
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map