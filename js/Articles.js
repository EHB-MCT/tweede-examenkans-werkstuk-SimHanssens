class Artikel {
    constructor(ID, titel, content, imageURL, likes, datum){
        this._ID = ID;
        this._titel = titel;
        this._content = content;
        this._image = imageURL;
        this._likes = likes;
        this._datum = datum;
    }
    set id (ID){
        this._ID = ID;
    }
    get id (){
        return this._ID;
    }
    set titel (titel){
        this._titel = titel;
    }
    get titel (){
        return this._titel;
    }    
    set content (content){
        this._content = content;
    }
    get content (){
        return this.content;
    }
    set image (imageURL){
        this._image = imageURL;
    }
    get image (){
        return this._image;
    }
    set likes (likes){
        this._likes = likes;
    }
    get likes (){
        return this._likes;
    }
    set datum (datum){
        this._datum = datum;
    }
    get datum (){
        return this.datum;
    }
    like (data){
        return fetch("https://thecrew.cc/news/read.php",{method: "POST", body: JSON.stringify(data)});
        //post("", {UUID: artikel.UUID});
    }

}