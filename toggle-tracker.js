
// Create JSON - should go to another file

// Get data from JSON.

const section = document.querySelector('section');
// we are still going to need to find a way to get the JSON object in a way that is not web-based.

//let json = JSON.parse('toggle-tracker.json');

// Toggle-able buttons. The button part comes in populateSection()
function toggler(butt){
    console.log(butt);    
    ( butt.getAttribute("class") === "on") ? butt.setAttribute("class", "off") : butt.setAttribute("class", "on");
}


function populateSection(jsonObj){
    const categories = jsonObj['categories'];

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

            // The description can stay a P - behind the toggle.
            // The description should beneath the button in small viewports.
            // The description should be a "hoverlay" in larger ones.

            // the button's id could go through a function that concatenates them without space - or I could make it standard in the Json
            // Either way would require a function, so do the one that requires less JSON.
            anB.setAttribute("class", "off");
            anB.setAttribute("id", components[j].name);
            anB.setAttribute("onclick", `toggler(${components[j].name})`)
            anD.setAttribute("class", "description");
            
            anB.textContent = components[j].name;
            anD.textContent = components[j].description;

            anArticle.appendChild(anB);
            //anArticle.appendChild(anD);
            
            

        }

        section.appendChild(anArticle);
    }
}

// Set data to JSON.


// Date and Calendrical crap.

// Call Database

// Set & Get Templates (Eventual Authorisations)

// Eventual Auto-toggles and hidden view.

// Tests


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
                        name: "10 Push Ups a Day"        ,
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

populateSection(temp_json);