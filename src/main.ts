import BookType from "./types/bookType";
const form = document.querySelector<HTMLFormElement>("form")
const emptyBook:BookType = {
    title: "",
    authorName: "",
    numberOfPages: 0,
    isReaded: false,
}





function errorHandler(errorMessage:string, errorTarget?:string):void{
    console.log(errorMessage, errorTarget);
    
    let id;
    if(!errorTarget){
        id = "error_default"
    }
    else{
        id = `error_${errorTarget}`;
    }

    const target = document.querySelector(`#${id}`)
    if(!target){
        return; 
    }
    target.textContent = errorMessage
}


form?.addEventListener("submit", (e:Event)=> {
    e.preventDefault()
})
form?.addEventListener("input", (e: Event) => {
    let book:BookType = emptyBook
    let nameArray: string[] = ["",""]
    
    if(!e.target){
        return;
    }
    const target = e.target as HTMLInputElement;
    if(target.value === ""){
        return;
    }

    if(target.type === "checkbox"){
        if(target.value === "on"){
            book.isReaded = true
        }
        else{
            book.isReaded = false
        }
    }
    else if(target.type === "text"){
        console.log(target.dataset);
        
        switch(target.dataset.value){
            case "first_name":
                nameArray[0] = target.value;
                console.log("tutaj");
                break;
            case "last_name":
                nameArray[1] = target.value;
                break;
            case "number_of_pages":
                book.numberOfPages = parseInt(target.value)
                break;
            case "title":
                book.title = target.value;
                break;
            default:
                errorHandler("cannot find the correct dataset and data for this input");
                throw new Error("cannot find the correct dataset and data for this input")
        }
    }
})