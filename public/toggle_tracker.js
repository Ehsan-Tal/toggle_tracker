const header = document.querySelector('header');
const section = document.querySelector('section');
//const navbar = document.querySelector('#navbar');
//const image = document.querySelector('#image');
const footer = document.querySelector('footer');
const axios = require('axios');
let JSONobj = {};


function sendJSON(){
    let JSONstring = JSON.stringify(JSONobj);

    axios.post('/index', JSONstring)
};



/**
 * this is a function to upload the JSON object to be used.
 * 
 * author: from a stackOverflow forum answer.
 * 
 */
 async function uploadJSON(){

    if (typeof window.FileReader !== 'function' ){
        console.log("The file API isn't supported on this browser yet.")
    
        return
    };
    
    let file, fileReading;
    const input = document.getElementById('fileInput');
    
    if (!input){
        console.log('There seems to not be an item of id fileInput.');
    }
    else if (!input.files){
        console.log('There is no \'files\' property in the input tag.')
    
    }
    else if (!input.files[0]){
        console.log('There does not seem to be any file input.')
    }
    else {
        file = input.files[0];
        fileReading = new FileReader();
        fileReading.onload = receivedText;
        fileReading.readAsText(file);
        console.log(file);
    };
    
    function receivedText(e){
        let lines = e.target.result;
        const newArr = JSON.parse(lines);
        console.log(newArr, 'newArr !');
        JSONobj = newArr;
    
    }
    await populateSection(JSONobj);
    
    //this should not be here as it creates repeats - also, it messes with it enough that it makes multiple items.
    
    };

    
/**
 * this is a function to commit the changes of the JSON object to the JSON file.
 * stingify stringifies the object into a string.
 * 
 * the rest sets a download and then executes that function.
 * 
 * I would like name to match up with the toggle_tracker.json through the browse file option.
 * 
 * author: Matěj Pokorný from a stackOverflow forum answer.
 * 
 * @param {Object} JSONobj 
 * @param {String} name
 */
function downloadJSON(JSONobj, name){
    !(name) ? name : name = 'toggle_tracker.json';
    //!(JSONobj) ? JSONobj : JSONobj = temp_json;
    console.log(JSONobj)
    const JSONstr = JSON.stringify(JSONobj, null, '    ');
    const element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSONstr));
    element.setAttribute('download', name);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};


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
    
    console.log("Setting this item\'s progress to", setJSONProgress(decision, category, component)); // we use all two c's to find out the right key
    
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
    console.log(name);

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
async function populateSection(JSONobj){
    console.log(JSON['categories', 'populateSection'])
    const categories = JSONobj['categories'];

    for ( let i = 0; i < categories.length; i++ ){
        const anArticle = document.createElement('article');
        
        const anH2 = document.createElement('h2');
        anH2.textContent = categories[i].name;
        anH2.setAttribute('title', categories[i].description);
        anArticle.appendChild(anH2);

        const components = categories[i]['components'];

        
        for ( let j = 0; j < components.length; j++ ){
            console.log(components[j].name);
            console.log(components[j].progress);
            console.log(components[j].description);
            
            let anB = document.createElement('button');
            let anD = document.createElement('div');
            console.log(components[j].name);

            let processedName = concatenator(components[j].name); // captures the value part of the promise object.

            // The description can stay a P - behind the toggle.
            // The description should beneath the button in small viewports.
            // The description should be a "hoverlay" in larger ones.

            // the button's id could go through a function that concatenates them without space - or I could make it standard in the Json
            // Either way would require a function, so do the one that requires less JSON.
            anB.setAttribute("class", "off");
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


/**
 * this is a function to populate the navigation bar,
 * the one that houses the date and the settings button.
 * 
 */
function populateNavbar(){

};


/**
 * this is a function to populate the image portion,
 * an item that may not even load depending on viewport size,
 * but which houses a Napolean painting and a quote beneath.
 * 
 */
function populateImage(){
    const paintings = {};
};


// Date and Calendrical crap.

// Call Database

// Set & Get Templates (Eventual Authorisations)

// Eventual Auto-toggles and hidden view.

// Tests

/**
 * A series of tests.
 * Remember to first think of the fail states !
 */
function testCode(){

};


let temp_json =    {
        "date"      : "10-01-2022",
        "isUsed"     : false,
        "categories" : [
            {
                "name"        : "Virtues",
                "description" : "A Quality of Moral Excellence.",
                "components"  : [
                { 
                    name: "Temperance"   ,
                    progress: 0,
                    description: "Eat not to dullness. Drink not to elevation."
                },
                { 
                    name:  "Silence"     ,
                    progress: 0,
                    description: "Speak not but what may benefit others or yourself. Avoid trifling conversation." 
                },
                { 
                    name:  "Order"       ,
                    progress: 0,
                    description: "Let all your things have their places. Let each part of your business have its time." 
                },
                { 
                    name:  "Resolution"  ,
                    progress: 0,
                    description: "Resolve to perform what you ought. Perform without fail what you resolve." 
                },
                { 
                    name:  "Frugality"   ,
                    progress: 0,
                    description: "Make no expense but to do good to others or yourself." 
                },
                { 
                    name:  "Industry"    ,
                    progress: 0,
                    description: "Lose no time. Be always employed in something useful. Cut off all unnecessary actions." 
                },
                { 
                    name:  "Sincerity"   ,
                    progress: 0,
                    description: "Use no hurtful deceit. Think innocently and justly; and if you speak, speak accordingly." 
                },
                { 
                    name:  "Justice"     ,
                    progress: 0,
                    description: "Wrong none by doing injuries, or omitting the benefits that are your duty." 
                },
                { 
                    name:  "Moderation"  ,
                    progress: 0,
                    description: "Avoid extremes. Forbear resenting injuries so much as you think they deserve." 
                },
                { 
                    name:  "Cleanliness" ,
                    progress: 0,
                    description: "Tolerate no uncleanness in body, clothes, or habitation." 
                },
                { 
                    name:  "Tranquility" ,
                    progress: 0,
                    description: "Be not disturbed at trifles, or at accidents common or unavoidable." 
                },
                { 
                    name:  "Chastity"    ,
                    progress: 0,
                    description: "Rarely use venery but for health or offspring" 
                },
                { 
                    name:  "Humility"    ,
                    progress: 0,
                    description: "Imitate Muhammed, Isa, Socrates, et al."  
                }
                
                ]
            },
            {
                "name"        : "Goals",
                "description" : "The Object of Effort.",
                "components"  : [
    
                    { 
                        name: "Learn Conversational Shqip" ,
                        progress: 0,
                        description: "Anything that helps unlock the Albanian language in the spoken and/or written word." 
                    },
                    { 
                        name: "Become a Software Engineer" ,
                        progress: 0,
                        description: "Anything that helps develop your skills and creditentials when it comes to software engineering." 
                    },
                    { 
                        name: "Earn More Than Expenses"    ,
                        progress: 0,
                        description: "Earn more than expenses, at least a monthly 5'000 AED as it would help a lot. Next goal would be to earn expenses from \"rents\": i.e., stable & automatic income." 
                    }
    
                ]
            },
            {
                "name"        : "Habits",
                "description" : "An Automatic Tendency.",
                "components"  : [
                    { 
                        name: "Ten Push Ups a Day"        ,
                        progress: 0,
                        description: "Focus on Form; Establish a Routine. Ideal: 1progress: 0progress: 0 per day." 
                    },
                    { 
                        name: "Sleep before Midnight"     ,
                        progress: 0,
                        description: "Focus on Form; Establish a Routine. Ideal: Early enough to wake up before or around the Fajr azan." 
                    },
                    { 
                        name: "Read for 20 minutes a Day" ,
                        progress: 0,
                        description: "Focus on Form; Establish a Routine. Ideal: 4 hours every day." 
                    }
    
                ]
            },
            {
                "name"        : "Projects",
                "description" : "The Achievement of an Aim.",
                "components"  : [
    
                    { 
                        name: "Create a Bug Tracker"        ,
                        progress: 0,
                        description: "Make one that looks and works good since this project is alledgedly valuable to your portfolio." 
                    },
                    { 
                        name: "Create a Business Scorecard" ,
                        progress: 0,
                        description: "Learn how to make and implement a business scorecard." 
                    },
                    { 
                        name: "Learn Basic Shqip Grammar"   ,
                        progress: 0,
                        description: "Learn the Albanian Grammar rules when it comes to plural, adjectives, sex, ordinals, tense, and definites." 
                    },
                    { 
                        name: "Low Poly Skyrim"             ,
                        progress: 0,
                        description: "Add the ENBs and mods to play Skyrim in low-poly." 
                    },
                    { 
                        name: "Learn the Basics of ClamAV"  ,
                        progress: 0,
                        description: "Learn how to schedule scans, scan new items, update virus-recognition DB." 
                    }
    
                ]
            }
        ]
    }

//populateSection();