import createElementWithAttributes from "./createElementWithAttributes";
import BookTypeWithId from "./types/bookTypeWithId";

function generateCard(book:BookTypeWithId):HTMLElement{
    const {id, title, authorName, description, numberOfPages, isReaded } = book;
    const textIsReaded = isReaded ? "Read" : "Not read"
    const content = `${description}, ${numberOfPages} pages`;
    const card = createElementWithAttributes("div", "", "card")
    const cardHeader = createElementWithAttributes("h5", title, "card-header")
    const cardBody = createElementWithAttributes("div", "", "card-body")
    const cardTitle = createElementWithAttributes("h5", authorName, "card-title")
    const cardText = createElementWithAttributes("p",content, "card-text")
    const toggleIsReadedButton = createElementWithAttributes("button",  textIsReaded, "btn", isReaded ? "btn-success" : "btn-warning");
    const deleteButton = createElementWithAttributes("button", "Delete", "btn", "btn-danger");
    deleteButton.dataset.delete = id
    toggleIsReadedButton.dataset.change = id
    card.setAttribute("id", id)
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(toggleIsReadedButton);
    cardBody.appendChild(deleteButton);
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    return card;
}   
export default generateCard