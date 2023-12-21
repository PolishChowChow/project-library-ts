
import BookTypeWithId from "./types/bookTypeWithId"

class bookListClass{
    private list:BookTypeWithId[]
    constructor(){
        this.list = []
    }
    addBook(book: BookTypeWithId){
        this.list = [...this.list, book]
    }
    deleteBook(deletedBook: BookTypeWithId){
        this.list = this.list.filter(book => {
            book.id !== deletedBook.id
        })
    }
}
export default bookListClass;