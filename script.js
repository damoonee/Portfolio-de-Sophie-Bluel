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

// Source: https://www.freecodecamp.org/news/how-to-make-api-calls-with-fetch/
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
        
        
   })

        

   

