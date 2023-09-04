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

        let filtresTrier = document.querySelector(".filters");
        filtresTrier.addEventListener("click", function (){
        
   })
})
        

   

