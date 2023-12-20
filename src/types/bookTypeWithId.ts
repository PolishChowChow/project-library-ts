import BookType from "./bookType";
type IdType = {
    id: string
};
type BookTypeWithId = BookType & IdType;
export default BookTypeWithId;