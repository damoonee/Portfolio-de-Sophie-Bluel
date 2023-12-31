let works;
let categories;
recupererWorks();

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
    };
};

function recupererWorks() {
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
};

fetch("http://localhost:5678/api/categories")
.then(data => {
    if (!data.ok) {
      throw Error(data.status);
     }
     return data.json();
    }).then(data => {
        categories = data;
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
        };   
   });

let token = localStorage.getItem("token");
console.log(token);

if (token !== null) {
    document.getElementById("login").innerHTML = "logout";
    let elements = document.getElementsByClassName("connexion-requise");
    for (let i = 0; i < elements.length; i++) {
        elements.item(i).style.display = "flex";
    };
};

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    RetourModal();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.close-modal').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
};

const stopPropagation = function (e) {
    e.stopPropagation();
};

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

        supprImage.addEventListener("click", function(event) {    
            let workId = works[i].id;
    
            fetch(`http://localhost:5678/api/works/${workId}`,{
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(function(response){
                if (response.ok) {
                    works.splice(i, 1);
                    AfficherProjetsModal();
                    AfficherProjets(works);
                };
            });
        });
    };
};

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

const RedirectAjoutModal = function (e) {
    document.querySelector(".modal-liste-projet").style.display = "none";
    document.querySelector(".modal-ajout-projet").style.display = null;
    AjoutOptionsCategories();
};

let addWork = document.querySelector(".addImage");

addWork.addEventListener("click", RedirectAjoutModal);

let retour = document.querySelector(".retour-modal");

function RetourModal() {
    form.reset();
    uploadImg = document.querySelector(".upload-img");
    if (uploadImg) {
        uploadImg.innerHTML = "";
        uploadImg.style.display = "none";
    }
    projetModal.style.display = "flex";

    document.querySelector(".modal-liste-projet").style.display = null;
    document.querySelector(".modal-ajout-projet").style.display = "none";
}

retour.addEventListener("click", RetourModal);

function AjoutOptionsCategories() {
    let selectCategories = document.getElementById("categories");
    selectCategories.innerHTML = "<option></option>";

    for (let i = 0; i < categories.length; i++) {
        let option = document.createElement("option");

        option.innerHTML = categories[i].name;
        option.value = categories[i].id;

        selectCategories.appendChild(option);
    };
};

let input = document.getElementById('input-photo');

input.addEventListener('change', function(event){
    const file = event.target.files[0];

    if (file) {
        const fileTypes = ["image/jpeg", "image/png"];
        const fileMaxSize = 4000000;
        if (!fileTypes.includes(file.type) || file.size > fileMaxSize) {
            event.target.value = "";
            return;
        }

        let imageModal = document.createElement('img');
        let container = document.createElement('div');
        let projetModal = document.querySelector('.ajout-photo');
        container.classList.add("upload-img");

        const reader = new FileReader();

        reader.onload = function(event) {
            imageModal.setAttribute('src', event.target.result);
            container.appendChild(imageModal);
            form.insertBefore(container, form.childNodes[0]);
        };

        reader.readAsDataURL(file);
        projetModal.style.display = 'none';
    };
});

let form = document.getElementById('new-projet');
let container = document.querySelector('.upload-img')
let projetModal = document.querySelector('.ajout-photo');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let formData = new FormData();
    let token = localStorage.getItem("token");
    formData.append("image", document.getElementById("input-photo").files[0]);
    formData.append("title", document.getElementById("titre").value);
    formData.append("category", document.querySelector("select").value);

    const response = await fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })
    .then(response =>  {
        response.json();
    })
    .then(data => {
        console.log(data);

        RetourModal();
        recupererWorks();
    });
});


