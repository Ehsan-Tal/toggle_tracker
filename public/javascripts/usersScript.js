// ### Variables
const createUserFormData = document.getElementById("createUserAccountForm");
const loginUserFormData = document.getElementById("loginUserAccountForm");


// ### Function
async function createUser(){
    const formData = new FormData(createUserFormData);

    await fetch("/user/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData))
    })
    .catch(err => {
        makeErrorMessage(err)
    });
};


async function requestLogin(){
    const formData = new FormData(loginUserFormData);
    
    await fetch("/user/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)) 
        // this is required as FormData is its own object that does not play well with FETCH even though it is fine with XHR
        // this is dumb.
    })
    .catch(err => {
        makeErrorMessage(err)
    });
};


// ### Event Listeners
createUserFormData.addEventListener('submit', (event) => {
    event.preventDefault();
    createUser();
});

loginUserFormData.addEventListener('submit', (event) => {
    event.preventDefault();
    requestLogin();
});
