localStorage.removeItem("token");

let form = document.querySelector('form');
let pErreurLogin = document.querySelector('.erreurLogin');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    pErreurLogin.style.visibility = "hidden";

    fetch("http://localhost:5678/api/users/login" , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(response => {
        console.log(response);
        if (!response.ok) {
            pErreurLogin.style.visibility = "visible";
            throw Error(response.status);
        }
        return response.json();
    }).then(data => {
        console.log(data);
        localStorage.setItem("token", data.token);
        window.location = "index.html";
    });
});

    
