// ### Variables
const settingsFormData = document.getElementById("settingsForm");
const settingsObject = {};

// ### Functions
function populateSettings(settings){
    console.table(settings)

};

// ### FETCHes
fetch("/settings/collect")
    .then( res => res.json())
    .then( settings => {
        settingsObject["settings"] = settings;
        populateSettings(settings);
    })
    .catch(err => {
        makeErrorMessage(err);
    })

async function submitSettings(){
    const formData = new FormData(settingsFormData);
    
    await fetch("/settings/submit", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then( res => { 
        res.json() 
    })
    .then( res => { 
        makeStatusMessage(res.message) 
    })
    .catch(err => {
        makeErrorMessage(err)
    });
};


// ### Event Listeners
settingsFormData.addEventListener('submit', (event) => {
    event.preventDefault();
    submitSettings();
});
