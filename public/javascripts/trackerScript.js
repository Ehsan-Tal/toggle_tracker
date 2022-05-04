// #### CLIENT-SIDE SCRIPT
// ### Variables
const maxCategories = 4;
const maxComponents = 20;
const anForm = document.querySelector('form');
const anDynamic = document.createElement("div");
let togglesObject = {};

// ### Functions
/**
 * this is a function given to each button built to change,
 *  the progress value in the JSON object.
 * Plus, change the CSS.
 * 
 * @param {object HTMLButtonElement} button 
 */
function toggleProgress(button) {
    const category = button.dataset.category; // category
    const component = button.dataset.component; //component
    let decision = 0; // the critical value

    if ( button.getAttribute("class") === "on") {
        button.classList.toggle("on");
        decision = 0;

    } else {
        button.classList.toggle("on");
        decision = 1;

    };
    setJSONProgress(decision, category, component)
};

/**
 * this function checks to see if the name would have any space,
 * it does so by checking if the split name is equal to the name,
 * if not, that means there is space and so it re-assign a space-less value.
 * 
 * @param {String} name - this is the result of removing the space in between.
 * @returns {String} string
 */
function processName(name) {
    return ( name === name.split(' ', 1) ) ? name : name = name.split(' ').join('');
 }; 

/**
 * This is the creme de le creme, unlocking an API-ness for this shamble.
 * 
 * @param {int} newValue 
 * @param {int} category 
 * @param {int} component 
 * @returns {int} newValue
 */
function setJSONProgress (newValue, category, component){
    togglesObject["categories"][category]["components"][component]["progress"] = newValue;
    
    return newValue
};

/**
 * this gets the progress value,
 *  although I am unsure as to what purpose it delivers currently.
 * 
 * @param {int} category 
 * @param {int} component 
 * @returns togglesObject["categories"][category]["components"][component]["progress"];
 */
function getJSONProgress (category, component){
    return togglesObject["categories"][category]["components"][component]["progress"];
};

/**
 * Adds categories to the display.
 * 
 * @param {object JSON} categories 
 * @param {int} category 
 * @returns {object JSON} categories[category]['components']
 */
function addCategory(categories, category) {
    // variables
    const anCategory   = document.createElement("span");
    const anCreate     = document.createElement("button");
    const anDelete     = document.createElement("button");
    const anDropdown   = document.createElement("button");
    const anUpdateName = document.createElement("input");
    const anUpdateDesc = document.createElement("input"); 
    
    const anWrapper = document.createElement("div");
    const anDropper = document.createElement("span");
    
    // attributes
    anCategory.setAttribute("id", category);
    anCategory.setAttribute('title', categories[category].description || "An Indescribable entry.");
    anCategory.setAttribute("class", "category header");
    anCategory.textContent = categories[category].name || "New Category";
    
    anCreate.setAttribute("type", "button");
    anCreate.setAttribute("onclick", `createComponent(${category})`);
    anCreate.setAttribute("class", "component adder");
    anCreate.textContent = "Create a new component";
    
    anDelete.setAttribute("type", "button");
    anDelete.setAttribute("onclick", `deleteCategory(${category})`);
    anDelete.setAttribute("class", "category deleter");
    anDelete.textContent = "Delete";

    anDropdown.setAttribute("type", "button");
    anDropdown.setAttribute("class", "dropdown");
    anDropdown.setAttribute("onclick", `toggleCategoryOptions(${category})`)
    anDropdown.textContent = "="
    
    anUpdateName.addEventListener("input", setCategoryName);
    anUpdateName.setAttribute("id", "name-" + category);
    anUpdateName.setAttribute("data-relation", category);
    anUpdateName.defaultValue = anCategory.textContent;
    
    anUpdateDesc.addEventListener("input", setCategoryDesc);    
    anUpdateDesc.setAttribute("id", "desc-" + category);
    anUpdateDesc.setAttribute("data-relation", category);
    anUpdateDesc.defaultValue = anCategory.title;

    anWrapper.setAttribute("id", "category-wrapper-" + category);
    anDropper.setAttribute("id", "category-dropper-" + category);
    anWrapper.setAttribute("class", "category-wrapper");
    anDropper.setAttribute("class", "category dropper");
    
    
    // appending
    anDropper.appendChild(anDelete);
    anDropper.appendChild(anUpdateName);
    anDropper.appendChild(anUpdateDesc);
    
    anWrapper.appendChild(anCategory);
    anWrapper.appendChild(anDropdown);
    anWrapper.appendChild(anDropper);
    anWrapper.appendChild(anCreate);
    
    anDynamic.appendChild(anWrapper);  

    return categories[category]['components'];
};

/**
 * adds a component to the display. 
 * @param {togglesObject["categories"][category]['components']} components 
 * @param {int} category 
 * @param {int} component 
 */
function addComponent(components, category, component) {
    // variables
    const anHolder = document.getElementById("category-wrapper-" + category); // we need to decide on this.
    const anWrapper = document.createElement("div");
    const anDropper = document.createElement("span");
    
    const anButton = document.createElement("button");
    const anDelete = document.createElement("button");
    const anDropdown = document.createElement("button");  
    const anUpdateName = document.createElement("input");
    const anUpdateDesc = document.createElement("input"); 
    
    const newName = processName(components[component].name);
    const newId = makeComponentId(newName, category, component);
    
    // attributes
    anButton.setAttribute("class", "off");
    anButton.setAttribute("type", "button");
    anButton.setAttribute("id", newId);
    anButton.setAttribute("name", newName);
    anButton.setAttribute("data-category", String(category)); // to find the item in the JSON.
    anButton.setAttribute("data-component", String(component));
    anButton.setAttribute("title", components[component].description || "A Descriptive passage.");
    anButton.setAttribute("onclick", `toggleProgress(${newId})`);
    anButton.setAttribute("class", "button component");
    anButton.textContent = components[component].name || "New Component";

    anDropdown.setAttribute("type", "button")
    anDropdown.setAttribute("class", "component dropdown")
    anDropdown.setAttribute("onclick", `toggleComponentOptions(${newId})`);
    anDropdown.textContent = "=";

    anDelete.setAttribute("type", "button");
    anDelete.setAttribute("class", "component deleter");
    anDelete.setAttribute("onclick", `deleteComponent(${newId})`);
    anDelete.textContent = "Delete";

    anUpdateName.setAttribute("id", newId + "Name");
    anUpdateName.setAttribute("data-relation", newId);
    anUpdateName.addEventListener("input", setComponentName);
    anUpdateName.defaultValue = anButton.textContent;
    
    anUpdateDesc.setAttribute("id", newId + "Desc");
    anUpdateDesc.setAttribute("data-relation", newId);
    anUpdateDesc.addEventListener("input", setComponentDesc);
    anUpdateDesc.defaultValue = anButton.title;
    
    anWrapper.setAttribute("class", "component wrapper");
    anWrapper.setAttribute("id", "component-wrapper-" + newId);
    anDropper.setAttribute("class", "component dropper");
    anDropper.setAttribute("id", "component-dropper-" + newId);
    
    // appending
    anDropper.appendChild(anUpdateName);
    anDropper.appendChild(anUpdateDesc);
    anDropper.appendChild(anDelete);
    
    anWrapper.appendChild(anButton);
    anWrapper.appendChild(anDropdown);
    anWrapper.appendChild(anDropper);

    anHolder.appendChild(anWrapper);    

};

// ## code for dynamic toggles, CRUD, etc.
/*
all of these functions affect the togglesObject to change display or the outgoing togglesObject.

create ->  J     j
update <>   S   b
read   <-    O o
delete ->     N
*/

function makeCategoryId(name, category) {
    console.warn("Calling a depecrated method !");
    return name + category
};

function makeComponentId(name, category, component) {
    return name + category + component
};

// # C R E A T E
/**
 * carries out creation in the JSON and display.
 * checks first on the limits, which if reached, disables the add button. 
 * checks second on the undefined and writes to the first one it finds.
 * then reflects creation in the JSON and display.
 * 
 * @returns 
 */
function createCategory(){
    // TODO: FIND OUT WHY THIS IS NOT A FUNCTION ACCORDING TO THE HTML ONCLICK.
    // IF NEEDED, OVERWRITE ITS ONCLICK OVER HERE.
    const categories = togglesObject["categories"];
    let category = 0;

    if (categories.length >= maxCategories){
        return console.log("No more: the maximum number of categories has been reached !");
    };

    // figuring out the category number.
    function findCategoryNumber(){
        // a check for undefined.
        for( i = 0; i < categories.length; i++ ){
            if ( categories[i] === undefined ){ return i; };
        };
        // if no undefined item, it returns the length as it is not 0-indexed.
        return categories.length;
    };
    category = findCategoryNumber();

    // reflecting creation in the JSON
    categories[category] = {
        name: "New Category", // mutable, and starts grayscale.
        description: "", // mutable
        components: [] // immutable - with mutable contents
    };

    // reflecting creation in the display  
    addCategory(categories, category);
};

/**
 * carries out creation in the JSON and display.
 * checks first on the limits, which if reached, disables the add button. 
 * checks second on the undefined and writes to the first one it finds.
 * 
 * @param {int} category 
 * @returns {method} log message
 */
function createComponent(category){
    const components = togglesObject["categories"][category]["components"];
    let component = 0;

    // a guard clause against max components
    if (components.length >= maxComponents){
        return console.log("No more: the maximum number of components has been reached !")
    };

    // finding out the component number
    function findComponentNumber() {
        // a check for undefined as we would like to replace them.
        for( j = 0; j < components.length; j++ ){
            if ( components[j] === undefined ){ console.log(j); return j; };
        }
        // if no undefined item, then it returns the components.length
        return components.length;
    };
    component = findComponentNumber();

    // reflecting creation in the JSON
    components[component] = {
        name: "New Component",
        progress: 0,
        description: ""
    };
    
    // reflecting creation in the display
    addComponent(components, category, component)

};

// # R E A D - we do not need to make, e.g., readComponent(), as read functions are already read.

//TODO: add redo and undo.

// # U P D A T E

function toggleCategoryOptions(category){
    document.getElementById("category-dropper-" + category).classList.toggle("show");
};

/**
 * incorporates changes from the display into the JSON - as typed, as changed.
 * 
 * @param {Event} event
 */
function setCategoryName(event){
    document.getElementById(event.target.dataset.relation).textContent = event.target.value;
    togglesObject["categories"][category].name = event.target.value;
};

/**
 * incorporates changes into the JSON and the HTML - as typed, as changed.
 * 
 * @param {Event} event
 */
function setCategoryDesc(event){
    document.getElementById(event.target.dataset.relation).title = event.target.value;
    togglesObject["categories"][category].description = event.target.value;
};

/**
 * toggles the "show" class for the dropper.
 * 
 * @param {object HTMLButtonElement} element 
 */
function toggleComponentOptions(element){
    document.getElementById("component-dropper-" + element.id).classList.toggle("show");
};

/**
 * incorporates the changes into the JSON and the display - as typed, as changed.
 * does not change the id of the component as id is supposed to be unique.
 * 
 * @param {Event} event
 */
function setComponentName(event){
    document.getElementById(event.target.dataset.relation).textContent = event.target.value;
    togglesObject["categories"][category]["components"][component].name = event.target.value;
};

/**
 * incorporates changes into the JSON and display - as typed, as changed.
 * @param {Event} event
 */
function setComponentDesc(event){
    document.getElementById(event.target.dataset.relation).title = event.target.value;
    togglesObject["categories"][category]["components"][component].description = event.target.value;
};

// # D E L E T E

/**
 * carries out the deletion to the JSON and the display.
 * @param {object HTMLButtonElement} element
 */
function deleteCategory(category){
    delete togglesObject["categories"][category];
    (document.getElementById("category-wrapper-" + category)).remove();

};

/**
 * carries out the deletion to the JSON and the display.
 * @param {object HTMLButtonElement} element
 */
function deleteComponent(element){  
    const category = element.dataset.category;
    const component = element.dataset.component;
    
    delete togglesObject["categories"][category]["components"][component];
    (document.getElementById("component-wrapper-" + element.id)).remove();

};

/**
 * sets the date for the HTML.
 * 
 * @returns {Date} the date, only in the ISO format.
 */
function setISO8601Date(){
    return new Date().toISOString().split("T")[0];
};

/**
 * gets the date from the HTML.
 * 
 * @returns {String} the date, only in the ISO format.
 */
function getISO8601Date(){
    return document.getElementById("date").textContent;  
};

/**
 * populateForm takes in a JSON object, and uses it to create headings, buttons, and paragraphs,
 * while also setting their distinguishing values and place in the hierarchy.
 * 
 * The return value should be null.
 * 
 * @param {object} togglesObject
 * @returns null
 */
 function populateForm(togglesObject){
     
    const categories = togglesObject['categories'];
    const anWrapper  = document.createElement("div");
    const anDate     = document.createElement("span");
    const anJournal  = document.createElement("textarea");
    const anSubmit   = document.createElement("button");
    const anCreate   = document.createElement("button");

    anJournal.type         = "text";
    anJournal.name         = "journal";
    anJournal.className    = "journal";
    anJournal.id           = "journal";
    anJournal.defaultValue = "Type text here:"; 

    anSubmit.type        = "submit";
    anSubmit.className   = "submit";
    anSubmit.id          = "submit";
    anSubmit.textContent = "Submit Here";

    anDate.className   = "date";
    anDate.id          = "date";
    anDate.textContent = setISO8601Date();

    anCreate.setAttribute("id", "category-creater");
    anCreate.setAttribute("type", "button");
    anCreate.setAttribute("class", "category-adder");
    anCreate.setAttribute("onclick", "createCategory()");
    anCreate.textContent = "Create a new Category";

    anWrapper.className = "statics-wrapper";
    anDynamic.className = "dynamics-wrapper";
    
    anWrapper.appendChild(anDate);
    anWrapper.appendChild(anCreate);
    anWrapper.appendChild(anJournal);
    anWrapper.appendChild(anSubmit);

    anForm.appendChild(anDynamic);
    anForm.appendChild(anWrapper);

    for ( let i = 0; i < categories.length; i++ ){
               
        const components = addCategory(categories, i);
 
        for (let j = 0; j < components.length; j++) {
            addComponent(components, i, j);
    
            //let anDiv = document.createElement('div');
            //anDiv.setAttribute("class", "description");
            //anDiv.textContent = components[j].description;
            //anForm.appendChild(anDiv);  
        }
    }

};


// #### CLIENT SERVER COMMUNICATION CHANNELS

fetch("/collect")
    .then( res => res.json())
    .then( res => {
        togglesObject = JSON.parse(JSON.stringify(res));
        populateForm(togglesObject);
        //console.log(`${anDisplayName}`)
        makeStatusMessage(`Hello, ${anDisplayName} !`)
    })
    .catch(err => {
        makeErrorMessage(err.message);
        console.log(err);
    })


async function submitData(){
    // if no username, cry.
    let formData = {};
    formData['date'] = getISO8601Date();
    formData['toggles'] = togglesObject;

    await fetch("/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
        },
        body:  JSON.stringify(formData)
    })
    .then( res => res.json())
    .then( res => {
        //console.log("the full res \n", res)
        console.log(res.message)
        makeStatusMessage(res.message);
    })
    .catch(err => {
        console.log(err.message);
        makeErrorMessage(err.message)
    });
};


// ## EVENT LISTNERS
anForm.addEventListener('submit', (event) => {
    event.preventDefault();
    submitData();
});

window.onclick = function(event) {
    if (!event.target.matches(".dropdown")) {
        const dropdowns = document.getElementsByClassName("dropper");

        for (d = 0; d < dropdowns.length; d++){       
            if (dropdowns[d].classList.contains("show")){
                dropdowns[d].classList.remove("show");
            }
        }
    }
};
