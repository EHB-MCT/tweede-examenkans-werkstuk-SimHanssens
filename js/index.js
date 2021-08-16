"use strict";

const niewsArtikels = {
    initfields() {
        document.getElementById("form").addEventListener("submit", e=> {
            e.preventDefault();
            let inputValue = document.getElementById("searchKeyword").nodeValue;
            this.dataApi(inputValue);
        });
    },
    dataApi(keyword){

        console.log("start loading sequence");
        document.getElementById("content").innerHTML = "loading";
        fetch('https://thecrew.cc/news/read.php')
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(response);
           const likes = data.docs;
           if(data.numFound == 0){
            
           }
        })
    }

}