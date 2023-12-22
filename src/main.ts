import Book from "./bookClass";
import bookListClass from "./bookListClass";
import BookType from "./types/bookType";
import BookTypeWithId from "./types/bookTypeWithId";
const form = document.querySelector<HTMLFormElement>("form")
const emptyBook:BookType = {
    title: "",
    authorName: "",
    numberOfPages: 0,
    isReaded: false,
}
let book:BookType = emptyBook
let NAME_ARRAY: string[] = ["",""]
const BookList = new bookListClass();
function addBook(book: BookTypeWithId):void{
    const { id, title, authorName, numberOfPages, isReaded } = book;
    const tNumberOfPages:string = numberOfPages+"";
    const tIsReaded:string = isReaded+"";
    const parent = document.querySelector("div.parent-container");
    const bookContainer = document.createElement("div")
    const titleBar = document.createElement("h1");
    titleBar.textContent = title
    bookContainer.classList.add("book")
    const deleteButton = document.createElement("button");
    deleteButton.dataset.delete = id;
    deleteButton.textContent = "Delete"
    bookContainer.setAttribute("id", id)
    bookContainer.appendChild(titleBar)
    bookContainer.appendChild(setParagraph("Author:",authorName));
    bookContainer.appendChild(setParagraph("Number of pages",tNumberOfPages));
    bookContainer.appendChild(setParagraph("Is readed",tIsReaded));
    bookContainer.appendChild(deleteButton);
    parent?.appendChild(bookContainer)
    BookList.addBook(book)
}
function removeBook(id: string){
    BookList.deleteBook(id);
    document.getElementById(`${id}`)?.remove();
}
function setParagraph(prefix:string, content: string):HTMLParagraphElement{
    const paragraph = document.createElement("p");
    paragraph.textContent = `${prefix}: ${content}`;
    return paragraph
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
    book.authorName = NAME_ARRAY.join(" ");
    NAME_ARRAY = [];
    document.querySelectorAll("input").forEach((input:HTMLInputElement )=> {
        input.value = ""
    })
    const bookToInsert = new Book(book)
    addBook(bookToInsert.bookInfo)
})
document.querySelector("article")?.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLButtonElement;
    console.log(target);
    
    if(target === null || target === undefined){
        return;
    }
    console.log(target.dataset);
    
    if(target.dataset.delete !== undefined && target.dataset.delete !== null){
        console.log("remove");
        
        removeBook(target.dataset.delete);
    }

})
form?.addEventListener("input", (e: Event) => {
    
    
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
                NAME_ARRAY[0] = target.value;
                console.log("tutaj");
                break;
            case "last_name":
                NAME_ARRAY[1] = target.value;
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