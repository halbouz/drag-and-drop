/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/component.ts":
/*!**************************!*\
  !*** ./src/component.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
//Component class used to render the initial templates, used for project lists and project input form
class Component {
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


/***/ }),

/***/ "./src/helper-functions.ts":
/*!*********************************!*\
  !*** ./src/helper-functions.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AutoBind": () => (/* binding */ AutoBind),
/* harmony export */   "validateString": () => (/* binding */ validateString)
/* harmony export */ });
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


/***/ }),

/***/ "./src/project-input.ts":
/*!******************************!*\
  !*** ./src/project-input.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/component.ts");
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper-functions */ "./src/helper-functions.ts");
/* harmony import */ var _project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-state */ "./src/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



//This represents the input form
class ProjectInput extends _component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super("project-input", "app", "afterbegin", "user-input");
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
        //If the input respects all constraints, save the input in an array
        if ((0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.validateString)(title, [5, 40]) &&
            (0,_helper_functions__WEBPACK_IMPORTED_MODULE_1__.validateString)(description, [10, 200]) &&
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
    //This handles the submit button
    handleSubmit(event) {
        event.preventDefault(); //Preventing the default action of pressing a button
        const userInput = this.gatherUserInput(); //Save the input in the array userInput
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            _project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.addProject(title, desc, people); //Add the project to the list
            console.log(title, desc, people);
        }
    }
}
__decorate([
    _helper_functions__WEBPACK_IMPORTED_MODULE_1__.AutoBind
], ProjectInput.prototype, "handleSubmit", null);


/***/ }),

/***/ "./src/project-item.ts":
/*!*****************************!*\
  !*** ./src/project-item.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/component.ts");
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper-functions */ "./src/helper-functions.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// This represents a project item
class ProjectItem extends _component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(hostId, project) {
        super("single-project", hostId, "beforeend", project.id);
        this.project = project;
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
        this.renderContent();
    }
    //Properly format string for people
    get personsAssigned() {
        if (this.project.people === 1) {
            return "1 person assigned";
        }
        else {
            return `${this.project.people} persons assigned`;
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(event) {
        console.log("DragEnd");
    }
    //This renders the project content to the list
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title; //Select the title header
        this.element.querySelector("h3").textContent = this.personsAssigned; //Select the people header
        this.element.querySelector("p").textContent = this.project.description; //Select the description paragraph
    }
}
__decorate([
    _helper_functions__WEBPACK_IMPORTED_MODULE_1__.AutoBind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/project-list.ts":
/*!*****************************!*\
  !*** ./src/project-list.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/component.ts");
/* harmony import */ var _helper_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper-functions */ "./src/helper-functions.ts");
/* harmony import */ var _project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-state */ "./src/project-state.ts");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project */ "./src/project.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





//This represents the project lists
class ProjectList extends _component__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor(type) {
        super("project-list", "app", "beforeend", `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        //We add a function that renders the list of projects to the page
        _project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.addListener((projects) => {
            //We only render the relevant projects, meaning the projects that have the same status as the status of the list we're on
            const relevantProjects = projects.filter((prj) => {
                if (this.type === "active") {
                    return prj.status === _project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Active;
                }
                return prj.status === _project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Finished;
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
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData("text/plain");
        _project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.moveProject(prjId, this.type === "active" ? _project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Active : _project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Finished);
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    //This renders the list headers to the page
    renderContent() {
        const listId = `${this.type}-projects-list`;
        //Give an id to the list header which corresponds to its type
        this.element.querySelector("ul").id = listId;
        //Change the text of the list header corresponding to its type
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    //This renders the project list to the page
    renderProjects() {
        //Retrieving the list header
        const listEl = document.getElementById(`${this.type}-projects-list`);
        //Clear the list since we're going to add everything again
        listEl.innerHTML = "";
        //Iterate through every project and render it as a list item
        for (const prjItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.element.querySelector("ul").id, prjItem);
        }
    }
}
__decorate([
    _helper_functions__WEBPACK_IMPORTED_MODULE_1__.AutoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _helper_functions__WEBPACK_IMPORTED_MODULE_1__.AutoBind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _helper_functions__WEBPACK_IMPORTED_MODULE_1__.AutoBind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/project-state.ts":
/*!******************************!*\
  !*** ./src/project-state.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.ts");

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
        const newProject = new _project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
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
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/project.ts":
/*!************************!*\
  !*** ./src/project.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus),
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
//This represents the 2 possible types of a project
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project-input */ "./src/project-input.ts");
/* harmony import */ var _project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project-list */ "./src/project-list.ts");


//Instantiating our classes
new _project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("active");
new _project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("finished");
console.log("hi");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kcmFnLWFuZC1kcm9wLy4vc3JjL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly9kcmFnLWFuZC1kcm9wLy4vc3JjL2hlbHBlci1mdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vZHJhZy1hbmQtZHJvcC8uL3NyYy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovL2RyYWctYW5kLWRyb3AvLi9zcmMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL2RyYWctYW5kLWRyb3AvLi9zcmMvcHJvamVjdC1saXN0LnRzIiwid2VicGFjazovL2RyYWctYW5kLWRyb3AvLi9zcmMvcHJvamVjdC1zdGF0ZS50cyIsIndlYnBhY2s6Ly9kcmFnLWFuZC1kcm9wLy4vc3JjL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vZHJhZy1hbmQtZHJvcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kcmFnLWFuZC1kcm9wL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmFnLWFuZC1kcm9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhZy1hbmQtZHJvcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RyYWctYW5kLWRyb3AvLi9zcmMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUdBQXFHO0FBQzlGLE1BQWUsU0FBUztJQUszQixZQUNFLFVBQWtCLEVBQ2xCLGFBQXFCLEVBQ3JCLGNBQThCLEVBQzlCLFlBQXFCO1FBRXJCLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQzVDLFVBQVUsQ0FDYSxDQUFDO1FBRTFCLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFP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QUFGLEVBQUUsQ0FBUTtRQUNWLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUMzQixDQUFDO0NBQ0w7Ozs7Ozs7VUNkRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOK0M7QUFDRjtBQUU3QywyQkFBMkI7QUFDM0IsSUFBSSx3REFBWSxFQUFFLENBQUM7QUFDbkIsSUFBSSxzREFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksc0RBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUU1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vQ29tcG9uZW50IGNsYXNzIHVzZWQgdG8gcmVuZGVyIHRoZSBpbml0aWFsIHRlbXBsYXRlcywgdXNlZCBmb3IgcHJvamVjdCBsaXN0cyBhbmQgcHJvamVjdCBpbnB1dCBmb3JtXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICAgIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIGhvc3RFbGVtZW50OiBUO1xyXG4gICAgZWxlbWVudDogVTtcclxuICBcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICB0ZW1wbGF0ZUlkOiBzdHJpbmcsXHJcbiAgICAgIGhvc3RFbGVtZW50SWQ6IHN0cmluZyxcclxuICAgICAgaW5zZXJ0TG9jYXRpb246IEluc2VydFBvc2l0aW9uLFxyXG4gICAgICBuZXdFbGVtZW50SWQ/OiBzdHJpbmdcclxuICAgICkge1xyXG4gICAgICAvL1RoaXMgZ2V0cyB0aGUgdGVtcGxhdGUgYnkgaWRcclxuICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgICB0ZW1wbGF0ZUlkXHJcbiAgICAgICkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgXHJcbiAgICAgIC8vVGhpcyBnZXRzIHRoZSBob3N0IGJ5IGlkXHJcbiAgICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVudElkKSEgYXMgVDtcclxuICBcclxuICAgICAgLy9UaGlzIGNvcGllcyB0aGUgY29udGVudCBvZiB0aGUgdGVtcGxhdGVcclxuICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShcclxuICAgICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICBcclxuICAgICAgLy9UaGlzIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIHRlbXBsYXRlXHJcbiAgICAgIHRoaXMuZWxlbWVudCA9IGltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZCBhcyBVO1xyXG4gICAgICBpZiAobmV3RWxlbWVudElkKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIC8vVGhpcyBpbnNlcnRzIHRoZSBpbnN0YW5jZSBpbnRvIHRoZSBob3N0LCByZW5kZXJpbmcgaXQgdG8gdGhlIHBhZ2VcclxuICAgICAgdGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoaW5zZXJ0TG9jYXRpb24sIHRoaXMuZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfSIsIi8vVGhpcyBkZWNvcmF0b3IgYXV0b2JpbmRzIG91ciBjbGFzcydzIGVsZW1lbnQgd2hlbiB3ZSBjYWxsIGZ1bmN0aW9uc1xyXG5leHBvcnQgZnVuY3Rpb24gQXV0b0JpbmQoXzogYW55LCBfXzogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcclxuICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgY29uc3QgYWRqRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0KCkge1xyXG4gICAgICBjb25zdCBib3VuZEZuID0gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcclxuICAgICAgcmV0dXJuIGJvdW5kRm47XHJcbiAgICB9LFxyXG4gIH07XHJcbiAgcmV0dXJuIGFkakRlc2NyaXB0b3I7XHJcbn1cclxuXHJcbi8vVGhpcyBmdW5jdGlvbiBjaGVja3MgaWYgYSBzdHJpbmcgcmVzcGVjdHMgbGVuZ3RoIGNvbnN0cmFpbnRzXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVN0cmluZyhcclxuICBpbnB1dDogc3RyaW5nLFxyXG4gIFttaW5MZW5ndGgsIG1heExlbmd0aF06IFtudW1iZXIsIG51bWJlcl1cclxuKSB7XHJcbiAgcmV0dXJuIGlucHV0Lmxlbmd0aCA+PSBtaW5MZW5ndGggJiYgaW5wdXQubGVuZ3RoIDw9IG1heExlbmd0aDtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IHZhbGlkYXRlU3RyaW5nLCBBdXRvQmluZCB9IGZyb20gJy4vaGVscGVyLWZ1bmN0aW9ucydcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi9wcm9qZWN0LXN0YXRlJ1xyXG5cclxuLy9UaGlzIHJlcHJlc2VudHMgdGhlIGlucHV0IGZvcm1cclxuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XHJcbiAgICB0aXRsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuICAgIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcGVvcGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgIHN1cGVyKFwicHJvamVjdC1pbnB1dFwiLCBcImFwcFwiLCBcImFmdGVyYmVnaW5cIiwgXCJ1c2VyLWlucHV0XCIpO1xyXG4gICAgICAvL1RoaXMgcmVwcmVzZW50cyB0aGUgdGl0bGUgaW5wdXRcclxuICAgICAgdGhpcy50aXRsZUlucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIFwiI3RpdGxlXCJcclxuICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIFxyXG4gICAgICAvL1RoaXMgcmVwcmVzZW50cyB0aGUgZGVzY3JpcHRpb24gaW5wdXRcclxuICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIFwiI2Rlc2NyaXB0aW9uXCJcclxuICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIFxyXG4gICAgICAvL1RoaXMgcmVwcmVzZW50cyB0aGUgcGVvcGxlIGlucHV0XHJcbiAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgXCIjcGVvcGxlXCJcclxuICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIFxyXG4gICAgICAvL1dlIGFkZCBhbiBldmVudCBsaXN0ZW5lciB0aGF0IGhhbmRsZXMgc3VibWl0dGluZyB0aGUgZm9ybVxyXG4gICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLmhhbmRsZVN1Ym1pdCk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvL1RoaXMgZnVuY3Rpb24gZ2F0aGVycyB0aGUgaW5wdXQgaW4gdGhlIGZvcm0gYW5kIGhhbmRsZXMgaXRcclxuICAgIHByaXZhdGUgZ2F0aGVyVXNlcklucHV0KCk6IFtzdHJpbmcsIHN0cmluZywgbnVtYmVyXSB8IHZvaWQge1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRoaXMudGl0bGVJbnB1dEVsZW1lbnQudmFsdWU7XHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcclxuICAgICAgY29uc3QgcGVvcGxlID0gdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWU7XHJcbiAgXHJcbiAgICAgIC8vSWYgdGhlIGlucHV0IHJlc3BlY3RzIGFsbCBjb25zdHJhaW50cywgc2F2ZSB0aGUgaW5wdXQgaW4gYW4gYXJyYXlcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHZhbGlkYXRlU3RyaW5nKHRpdGxlLCBbNSwgNDBdKSAmJlxyXG4gICAgICAgIHZhbGlkYXRlU3RyaW5nKGRlc2NyaXB0aW9uLCBbMTAsIDIwMF0pICYmXHJcbiAgICAgICAgcGVvcGxlLmxlbmd0aCAhPT0gMFxyXG4gICAgICApIHtcclxuICAgICAgICB0aGlzLmNsZWFySW5wdXRzKCk7XHJcbiAgICAgICAgcmV0dXJuIFt0aXRsZSwgZGVzY3JpcHRpb24sICtwZW9wbGVdO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwiSW52YWxpZCBJbnB1dCwgcGxlYXNlIHRyeSBhZ2FpblwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIC8vVGhpcyBjbGVhcnMgdGhlIGlucHV0cyBvbmNlIHdlIHN1Ym1pdCB0aGUgZm9ybVxyXG4gICAgcHJpdmF0ZSBjbGVhcklucHV0cygpIHtcclxuICAgICAgdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgIHRoaXMuZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgICB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgXHJcbiAgICAvL1RoaXMgaGFuZGxlcyB0aGUgc3VibWl0IGJ1dHRvblxyXG4gICAgQEF1dG9CaW5kXHJcbiAgICBwcml2YXRlIGhhbmRsZVN1Ym1pdChldmVudDogRXZlbnQpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy9QcmV2ZW50aW5nIHRoZSBkZWZhdWx0IGFjdGlvbiBvZiBwcmVzc2luZyBhIGJ1dHRvblxyXG4gICAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpOyAvL1NhdmUgdGhlIGlucHV0IGluIHRoZSBhcnJheSB1c2VySW5wdXRcclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xyXG4gICAgICAgIGNvbnN0IFt0aXRsZSwgZGVzYywgcGVvcGxlXSA9IHVzZXJJbnB1dDtcclxuICAgICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzYywgcGVvcGxlKTsgLy9BZGQgdGhlIHByb2plY3QgdG8gdGhlIGxpc3RcclxuICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSwgZGVzYywgcGVvcGxlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gXCIuL3Byb2plY3RcIjtcclxuaW1wb3J0IHsgQXV0b0JpbmQgfSBmcm9tIFwiLi9oZWxwZXItZnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8vIFRoaXMgcmVwcmVzZW50cyBhIHByb2plY3QgaXRlbVxyXG5leHBvcnQgY2xhc3MgUHJvamVjdEl0ZW1cclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PlxyXG4gIGltcGxlbWVudHMgRHJhZ2dhYmxlXHJcbntcclxuICBwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XHJcblxyXG4gIC8vUHJvcGVybHkgZm9ybWF0IHN0cmluZyBmb3IgcGVvcGxlXHJcbiAgZ2V0IHBlcnNvbnNBc3NpZ25lZCgpIHtcclxuICAgIGlmICh0aGlzLnByb2plY3QucGVvcGxlID09PSAxKSB7XHJcbiAgICAgIHJldHVybiBcIjEgcGVyc29uIGFzc2lnbmVkXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYCR7dGhpcy5wcm9qZWN0LnBlb3BsZX0gcGVyc29ucyBhc3NpZ25lZGA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJvamVjdDogUHJvamVjdCkge1xyXG4gICAgc3VwZXIoXCJzaW5nbGUtcHJvamVjdFwiLCBob3N0SWQsIFwiYmVmb3JlZW5kXCIsIHByb2plY3QuaWQpO1xyXG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBAQXV0b0JpbmRcclxuICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgdGhpcy5wcm9qZWN0LmlkKTtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZCA9IFwibW92ZVwiO1xyXG4gIH1cclxuXHJcbiAgZHJhZ0VuZEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgY29uc29sZS5sb2coXCJEcmFnRW5kXCIpO1xyXG4gIH1cclxuXHJcbiAgLy9UaGlzIHJlbmRlcnMgdGhlIHByb2plY3QgY29udGVudCB0byB0aGUgbGlzdFxyXG4gIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC50aXRsZTsgLy9TZWxlY3QgdGhlIHRpdGxlIGhlYWRlclxyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKSEudGV4dENvbnRlbnQgPSB0aGlzLnBlcnNvbnNBc3NpZ25lZDsgLy9TZWxlY3QgdGhlIHBlb3BsZSBoZWFkZXJcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwicFwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb247IC8vU2VsZWN0IHRoZSBkZXNjcmlwdGlvbiBwYXJhZ3JhcGhcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEF1dG9CaW5kIH0gZnJvbSBcIi4vaGVscGVyLWZ1bmN0aW9uc1wiO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi9wcm9qZWN0LXN0YXRlXCI7XHJcbmltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSBcIi4vcHJvamVjdC1pdGVtXCI7XHJcbmltcG9ydCB7IERyYWdUYXJnZXQgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vL1RoaXMgcmVwcmVzZW50cyB0aGUgcHJvamVjdCBsaXN0c1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3RcclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+XHJcbiAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0XHJcbntcclxuICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W107XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogXCJhY3RpdmVcIiB8IFwiZmluaXNoZWRcIikge1xyXG4gICAgc3VwZXIoXCJwcm9qZWN0LWxpc3RcIiwgXCJhcHBcIiwgXCJiZWZvcmVlbmRcIiwgYCR7dHlwZX0tcHJvamVjdHNgKTtcclxuICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IFtdO1xyXG5cclxuICAgIC8vV2UgYWRkIGEgZnVuY3Rpb24gdGhhdCByZW5kZXJzIHRoZSBsaXN0IG9mIHByb2plY3RzIHRvIHRoZSBwYWdlXHJcbiAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgLy9XZSBvbmx5IHJlbmRlciB0aGUgcmVsZXZhbnQgcHJvamVjdHMsIG1lYW5pbmcgdGhlIHByb2plY3RzIHRoYXQgaGF2ZSB0aGUgc2FtZSBzdGF0dXMgYXMgdGhlIHN0YXR1cyBvZiB0aGUgbGlzdCB3ZSdyZSBvblxyXG4gICAgICBjb25zdCByZWxldmFudFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKChwcmopID0+IHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09PSBcImFjdGl2ZVwiKSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJqLnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5BY3RpdmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gcmVsZXZhbnRQcm9qZWN0cztcclxuICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRsZXIpO1xyXG5cclxuICAgIC8vV2UgcmVuZGVyIHRoZSBsaXN0IHRvIHRoZSBwYWdlXHJcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICB9XHJcblxyXG4gIEBBdXRvQmluZFxyXG4gIGRyYWdPdmVySGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSA9PT0gXCJ0ZXh0L3BsYWluXCIpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XHJcbiAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKFwiZHJvcHBhYmxlXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEF1dG9CaW5kXHJcbiAgZHJvcEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgY29uc3QgcHJqSWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoXCJ0ZXh0L3BsYWluXCIpO1xyXG4gICAgcHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KFxyXG4gICAgICBwcmpJZCxcclxuICAgICAgdGhpcy50eXBlID09PSBcImFjdGl2ZVwiID8gUHJvamVjdFN0YXR1cy5BY3RpdmUgOiBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgQEF1dG9CaW5kXHJcbiAgZHJhZ0xlYXZlSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpITtcclxuICAgIGxpc3RFbC5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcHBhYmxlXCIpO1xyXG4gIH1cclxuXHJcbiAgLy9UaGlzIHJlbmRlcnMgdGhlIGxpc3QgaGVhZGVycyB0byB0aGUgcGFnZVxyXG4gIHByaXZhdGUgcmVuZGVyQ29udGVudCgpIHtcclxuICAgIGNvbnN0IGxpc3RJZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHMtbGlzdGA7XHJcblxyXG4gICAgLy9HaXZlIGFuIGlkIHRvIHRoZSBsaXN0IGhlYWRlciB3aGljaCBjb3JyZXNwb25kcyB0byBpdHMgdHlwZVxyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSEuaWQgPSBsaXN0SWQ7XHJcblxyXG4gICAgLy9DaGFuZ2UgdGhlIHRleHQgb2YgdGhlIGxpc3QgaGVhZGVyIGNvcnJlc3BvbmRpbmcgdG8gaXRzIHR5cGVcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDJcIikhLnRleHRDb250ZW50ID1cclxuICAgICAgdGhpcy50eXBlLnRvVXBwZXJDYXNlKCkgKyBcIiBQUk9KRUNUU1wiO1xyXG4gIH1cclxuXHJcbiAgLy9UaGlzIHJlbmRlcnMgdGhlIHByb2plY3QgbGlzdCB0byB0aGUgcGFnZVxyXG4gIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICAvL1JldHJpZXZpbmcgdGhlIGxpc3QgaGVhZGVyXHJcbiAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YFxyXG4gICAgKSEgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuXHJcbiAgICAvL0NsZWFyIHRoZSBsaXN0IHNpbmNlIHdlJ3JlIGdvaW5nIHRvIGFkZCBldmVyeXRoaW5nIGFnYWluXHJcbiAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAvL0l0ZXJhdGUgdGhyb3VnaCBldmVyeSBwcm9qZWN0IGFuZCByZW5kZXIgaXQgYXMgYSBsaXN0IGl0ZW1cclxuICAgIGZvciAoY29uc3QgcHJqSXRlbSBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcclxuICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhLmlkLCBwcmpJdGVtKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4vcHJvamVjdCdcclxuXHJcbnR5cGUgTGlzdGVuZXI8VD4gPSAoaXRlbXM6IFRbXSkgPT4gdm9pZDtcclxuXHJcbmNsYXNzIFN0YXRlPFQ+IHtcclxuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXN0ZW5lcjxUPltdID0gW107XHJcblxyXG4gIC8vVGhpcyBhZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gdG8gb3VyIGxpc3Qgb2YgbGlzdGVuZXIgZnVuY3Rpb25zXHJcbiAgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbik7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XHJcbiAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICAvL0V2ZXJ5IFByb2plY3RTdGF0ZSBjbGFzcyBoYXMgdGhlIHNhbWUgaW5pdGlhbCB2YWx1ZXMsIHNvIHdlIG1ha2UgYSBnZXRJbnN0YW5jZVxyXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgLy9UaGlzIGFkZHMgYSBwcm9qZWN0IHRvIHRoZSBsaXN0XHJcbiAgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBudW1PZlBlb3BsZTogbnVtYmVyKSB7XHJcbiAgICAvL0NyZWF0aW5nIGEgbmV3IHByb2plY3Qgd2l0aCB0aGUgaW5wdXRcclxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChcclxuICAgICAgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLFxyXG4gICAgICB0aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgIG51bU9mUGVvcGxlLFxyXG4gICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxyXG4gICAgKTtcclxuXHJcbiAgICAvL0FkZGluZyB0aGUgcHJvamVjdCB0byB0aGUgcHJvamVjdCBsaXN0XHJcbiAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xyXG4gIH1cclxuXHJcbiAgbW92ZVByb2plY3QocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cykge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZChwcmogPT4gcHJqLmlkID09PSBwcm9qZWN0SWQpXHJcbiAgICBpZiAocHJvamVjdCAmJiBwcm9qZWN0LnN0YXR1cyAhPT0gbmV3U3RhdHVzKSB7XHJcbiAgICAgIHByb2plY3Quc3RhdHVzID0gbmV3U3RhdHVzO1xyXG4gICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKSB7XHJcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyRm4gb2YgdGhpcy5saXN0ZW5lcnMpe1xyXG4gICAgICBsaXN0ZW5lckZuKHRoaXMucHJvamVjdHMuc2xpY2UoKSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vSW5zdGFudGlhdGluZ1xyXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7IiwiLy9UaGlzIHJlcHJlc2VudHMgdGhlIDIgcG9zc2libGUgdHlwZXMgb2YgYSBwcm9qZWN0XHJcbmV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xyXG4gIEFjdGl2ZSxcclxuICBGaW5pc2hlZCxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGlkOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgcHVibGljIHBlb3BsZTogbnVtYmVyLFxyXG4gICAgcHVibGljIHN0YXR1czogUHJvamVjdFN0YXR1c1xyXG4gICkge31cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSBcIi4vcHJvamVjdC1pbnB1dFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0TGlzdCB9IGZyb20gXCIuL3Byb2plY3QtbGlzdFwiO1xyXG5cclxuLy9JbnN0YW50aWF0aW5nIG91ciBjbGFzc2VzXHJcbm5ldyBQcm9qZWN0SW5wdXQoKTtcclxubmV3IFByb2plY3RMaXN0KFwiYWN0aXZlXCIpO1xyXG5uZXcgUHJvamVjdExpc3QoXCJmaW5pc2hlZFwiKTtcclxuXHJcbmNvbnNvbGUubG9nKFwiaGlcIik7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=