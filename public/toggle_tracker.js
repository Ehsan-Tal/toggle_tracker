const section = document.querySelector('section');

/**
 * this is a function given to each button built to change,
 *  the progress value in the JSON object.
 * Plus, change the CSS.
 * 
 * @param {object} button 
 */
function toggler(button) {

    const category = button.dataset.category; // category
    const component = button.dataset.component; //component
    let decision = 0; // the critical value

    if ( button.getAttribute("class") === "on") {
        button.setAttribute("class", "off") 
        decision = 0;
    } else {
        button.setAttribute("class", "on")
        decision = 1;

    };
    
    //console.log("Setting this item\'s progress to", setJSONProgress(decision, category, component)); // we use all two c's to find out the right key
    
    // remember that console.log allows the command inside to alter data - but it uses the return value of that statement.
    
};


/**
 * this function checks to see if the name would have any space,
 * it does so by checking if the split name is equal to the name,
 * if not, that means there is space and so it re-assign a space-less value.
 * 
 * @param {string} name - this is the result of removing the space in between.
 * @returns string
 */
const concatenator = function (name) {

    ( name === name.split(' ', 1) ) ? name : name = name.split(' ').join('');
    //console.log(name);

    return name;

 }; 


/**
 * I might have this be consumed by the toggler.
 * @param {int} newValue 
 * @param {int} category 
 * @param {int} component 
 * @returns newValue
 */
function setJSONProgress (newValue, category, component){

    JSONobj["categories"][category]["components"][component]["progress"] = newValue;
    
    return newValue
};


/**
 * this gets the progress value,
 *  although I am unsure as to what purpose it delivers currently.
 * @param {int} category 
 * @param {int} component 
 * @returns value
 */
function getJSONProgress (category, component){
    
    const value = JSONobj["categories"][category]["components"][component]["progress"];

    return value
};


/**
 * populateSection takes in a JSON object,
 * and uses it to create headings, buttons, and paragraphs,
 * while also setting their distinguishing values and place in the hierarchy.
 * 
 * The return value should be null.
 * 
 * @param {object} JSONobj
 */
function populateSection(JSONobj){
    //console.log(JSONobj);
    const categories = JSONobj['categories'];

    for ( let i = 0; i < categories.length; i++ ){
        const anArticle = document.createElement('article');
        
        const anH2 = document.createElement('h2');
        anH2.textContent = categories[i].name;
        anH2.setAttribute('title', categories[i].description);
        anArticle.appendChild(anH2);

        const components = categories[i]['components'];

        
        for ( let j = 0; j < components.length; j++ ){
            //console.log(components[j].name);
            //console.log(components[j].progress);
            //console.log(components[j].description);
            
            let anB = document.createElement('button');
            let anD = document.createElement('div');
            //console.log(components[j].name);

            let processedName = concatenator(components[j].name); // captures the value part of the promise object.

            // The description can stay a P - behind the toggle.
            // The description should beneath the button in small viewports.
            // The description should be a "hoverlay" in larger ones.

            // the button's id could go through a function that concatenates them without space - or I could make it standard in the Json
            // Either way would require a function, so do the one that requires less JSON.
            anB.setAttribute("class", "off");
            anB.setAttribute("type", "button");
            anB.setAttribute("id", processedName);
            anB.setAttribute("data-category", String(i) );
            anB.setAttribute("data-component", String(j) );
            anB.setAttribute("onclick", `toggler(${processedName})`);
            anD.setAttribute("class", "description");

            anB.textContent = components[j].name;
            anD.textContent = components[j].description;

            anArticle.appendChild(anB);
            //anArticle.appendChild(anD);

        }
        section.appendChild(anArticle);
    }
};
