import BookType from "./types/bookType";
import BookTypeWithId from "./types/bookTypeWithId";
import { v4 as uuidV4 } from "uuid";
class Book{
    public bookInfo:BookTypeWithId;
    constructor(bookInfo: BookType){
        this.bookInfo = {
            id: uuidV4(),
            ...bookInfo
        }
    }
}  

export default Book;