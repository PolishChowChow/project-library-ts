
import BookTypeWithId from "./types/bookTypeWithId"

class bookListClass{
    private list:BookTypeWithId[]
    constructor(){
        this.list = []
    }
    addBook(book: BookTypeWithId){
        this.list = [...this.list, book]
    }
    deleteBook(bookId: string){
        this.list = this.list.filter(book => {
            book.id !== bookId
        })
    }
}
export default bookListClass;