let works;

function AfficherProjets(worksFiltre) {
    let gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    for (let i = 0; i < worksFiltre.length; i++) {
        let newFigure = document.createElement("figure");
        let newImage = document.createElement("img");
        newImage.src = worksFiltre[i].imageUrl;
        newImage.alt = worksFiltre[i].title;
        let newFigCaption = document.createElement("figcaption");
        newFigCaption.innerHTML = worksFiltre[i].title;

        newFigure.appendChild(newImage);
        newFigure.appendChild(newFigCaption);
        gallery.appendChild(newFigure);
    }
}

fetch("http://localhost:5678/api/works")
.then(data => {
    if (!data.ok) {
      throw Error(data.status);
     }
     return data.json();
    }).then(data => {
        works = data;
        console.log(works);

        AfficherProjets(works);
        AfficherProjetsModal();
   });

fetch("http://localhost:5678/api/categories")
.then(data => {
    if (!data.ok) {
      throw Error(data.status);
     }
     return data.json();
    }).then(categories => {
        console.log(categories);

        let filters = document.getElementById("filters");

        let buttonTous = document.createElement("button");
        buttonTous.innerHTML = "Tous";
        buttonTous.classList.add("active");
        filters.appendChild(buttonTous);

        buttonTous.addEventListener("click", function(){
            document.getElementsByClassName("active")[0].classList.remove("active");
            buttonTous.classList.add("active");

            AfficherProjets(works);
        });
        
        for (let i = 0; i < categories.length; i++) {
            let button = document.createElement("button");
            button.innerHTML = categories[i].name;
            filters.appendChild(button);

            button.addEventListener("click", function(){
                document.getElementsByClassName("active")[0].classList.remove("active");
                button.classList.add("active");

                AfficherProjets(works.filter(
                    function (work) {
                        return work.categoryId === categories[i].id;
                    }
                ));
            });
        }
        
        
   });

let token = localStorage.getItem("token");
console.log(token);

if (token !== null) {
    document.getElementById("login").innerHTML = "logout";
    let elements = document.getElementsByClassName("connexion-requise");
    for (let i = 0; i < elements.length; i++) {
        elements.item(i).style.display = "flex";
    }
}

const openModal = function (e) {
    e.preventDefault();
    console.log(e);
    modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.close-modal').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

function AfficherProjetsModal () {
    let modalContent = document.querySelector('.modalContent');
    modalContent.innerHTML = "";

    for (let i = 0; i < works.length; i++) {
        let figure = document.createElement("figure");
        let figureImage = document.createElement("img");
        let icone = document.createElement("i");
        let supprImage = document.createElement("div");
        figureImage.src = works[i].imageUrl;
        figureImage.alt = works[i].title;
        supprImage.classList.add("icone");
        icone.classList.add("fa-solid");
        icone.classList.add("fa-trash-can");

        figure.appendChild(figureImage);
        supprImage.appendChild(icone);
        figure.appendChild(supprImage);
        modalContent.appendChild(figure);
    }
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
})