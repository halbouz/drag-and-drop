//Component class used to render the initial templates, used for project lists and project input form
export class Component {
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
//# sourceMappingURL=component.js.map