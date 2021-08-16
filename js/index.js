"use strict";
let checker = false;

const niewsArtikels = {
    initfields() {
        document.getElementById("likes").addEventListener("click",  e=> {
            e.preventDefault();
            checker = true;
            let inputValue = "";
            this.dataApi(inputValue);
        })
        document.getElementById("form").addEventListener("submit", e=> {
            e.preventDefault();
            let inputValue = document.getElementById("searchKeyword").value;
            this.dataApi(inputValue);
        });
    },
    dataApi(inputValue){
        let url = "https://thecrew.cc/news/read.php";
        //console.log(fetch(url));
        console.log("start loading sequence");
        document.getElementById("content").innerHTML = "loading";
        fetch(url) // ik krijg heel vreemde data binnen via deze fetch en vind geen oplossing. 
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
           const artikels = data.docs;
           if(data.numFound == 0){
            console.log(data);
            this.errorHandler("geen data");
            
           }else{
               if(checker){
                this.sortApi(artikels);
                checker = false;
               }else{
                this.filterApi(artikels);  
            }
               
           }
           console.log("end loading")
        })
        .catch((error) => {
            this.errorHandler(error);
            console.log("Error:", error);
        });
        
    },
    errorHandler(error){
        document.getElementById("content").innerHTML = error;
    },
    filterApi(artikels){
        const filterOnWord = artikels.filter(artikel =>{ // Door vreemde fetch geeft dit "Null" terug en dus geeft dit een error
            console.log(artikel.title);
            if(artikel.title != undefined || artikel.content != undefined){
                return artikel
            }
        })
        this.renderArticles(filterOnWord);
    },
    sortApi(artikels){
        const sortOnLikes = artikels.sortApi((a,b) =>{
            return a.likes - b.likes;
        })
        this.renderArticles(sortOnLikes);
    },
    renderArticles(artikels){
    document.getElementById("content").innerHTML = ""
    artikels.forEach(artikel => {// ik zie via "https://thecrew.cc/news/read.php" dat er html code in de json staat. maar met de fetch dat foutloopt kan ik deze niet toepassen op mijn code.
        
        let nieuwsArtikel = new Artikel(artikel.UUID, artikel.title, artikel.content, artikel.imageURI, artikel.likes, artikel.publicationDate);
        let html = `<article>
        <div class="image_wrapper">
        <img src="${artikel.imageURI}" alt=""> 
        </div>
        <div class="article_content_wrapper">
        <div>
            <h3>${artikel.title}</h3><!-- titel van het artikel-->
            <h4>${artikel.content}</h4><!-- content van het artikel-->
        </div>
        <div>${artikel.likes}</div>
        </div>
    </article>`;
    document.getElementById("content").insertAdjacentHTML("beforeend", html);
    });    
    }

}
niewsArtikels.initfields();