
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
    updateStatus(bookId: string):void{
        this.list = this.list.map(book => {
            if(book.id === bookId){
                return {
                    ...book,
                    isReaded: !book.isReaded
                }
            }
            return book;
        })
    }
}
export default bookListClass;