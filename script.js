// Source: https://www.freecodecamp.org/news/how-to-make-api-calls-with-fetch/
fetch("http://localhost:5678/api/works")
.then(data => {
    if (!data.ok) {
      throw Error(data.status);
     }
     return data.json();
    }).then(works => {
        console.log(works);

        let gallery = document.getElementById("gallery");

        for (let i = 0; i < works.length; i++) {
            let newFigure = document.createElement("figure");
            let newImage = document.createElement("img");
            newImage.src = works[i].imageUrl;
            newImage.alt = works[i].title;
            let newFigCaption = document.createElement("figcaption");
            newFigCaption.innerHTML = works[i].title;

            newFigure.appendChild(newImage);
            newFigure.appendChild(newFigCaption);

            gallery.appendChild(newFigure);
        }
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

            for (let i = 0; i < categories.length; i++) {
                let Button = document.createElement("button");
                Button.innerHTML = categories[i].name;
                filters.appendChild(Button);

                Button.addEventListener("click", function(){
                    let filters = document.querySelectorAll("#gallery img")

                    document.getElementsByClassName("active")[0].classList.remove("active");
                    document.getElementsByClassName("inactive")[i].classList.add("active");
                })

                
                

            }
        
        
   })

        

   

