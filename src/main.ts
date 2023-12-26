import Book from "./bookClass";
import bookListClass from "./bookListClass";
import BookType from "./types/bookType";
import BookTypeWithId from "./types/bookTypeWithId";
import "../scss/style.scss";
import generateCard from "./generateCard";
import emptyBook from "./emptyBook";
const parentContainer = document.querySelector(".parent-container");
const form = document.querySelector<HTMLFormElement>("form");
let book: BookType = emptyBook;
let NAME_ARRAY: string[] = ["", ""];
const BookList = new bookListClass();

function addBook(book: BookTypeWithId): void {
  parentContainer?.appendChild(generateCard(book));
  BookList.addBook(book);
}
function removeBook(id: string) {
  BookList.deleteBook(id);
  document.getElementById(`${id}`)?.remove();
}
function changeStatus(id: string): void {
  const parent = document.getElementById(id);
  if (!parent) {
    return;
  }
  const btn = parent.childNodes[1].childNodes[2] as HTMLButtonElement;
  if (!btn) {
    return;
  }
  console.log(btn);
  btn.textContent = btn?.classList.contains("btn-warning")
    ? "Read"
    : "Not read";
  btn.classList.toggle("btn-warning");
  btn.classList.toggle("btn-success");
  BookList.updateStatus(id);
}

form?.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    return;
  }
  book.authorName = NAME_ARRAY.join(" ");
  NAME_ARRAY = [];
  document.querySelectorAll("input").forEach((input: HTMLInputElement) => {
    input.value = "";
  });
  document
    .querySelectorAll("textarea")
    .forEach((textarea: HTMLTextAreaElement) => {
      textarea.value = "";
    });
  const bookToInsert = new Book(book);
  addBook(bookToInsert.bookInfo);
  book = emptyBook;
});

function clickController(e: Event) {
  const target = e.target as HTMLButtonElement;
  console.log(target);

  if (target === null || target === undefined) {
    return;
  }
  console.log(target.dataset);

  if (target.dataset.delete !== undefined && target.dataset.delete !== null) {
    console.log("remove");
    removeBook(target.dataset.delete);
  }
  if (target.dataset.change !== undefined && target.dataset.change !== null) {
    console.log("update");

    changeStatus(target.dataset.change);
  }
}
function inputController(e: Event) {
  console.log(e.target);

  console.log(book);

  if (!e.target) {
    return;
  }
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;

  if (target.type === "checkbox") {
    const checkbox = target as HTMLInputElement;
    console.log(checkbox.checked);

    if (checkbox.checked) {
      book.isReaded = true;
    } else {
      book.isReaded = false;
    }
  } else if (target.dataset.value !== null) {
    console.log(target.dataset);

    switch (target.dataset.value) {
      case "first_name":
        NAME_ARRAY[0] = target.value;
        console.log("tutaj");
        break;
      case "last_name":
        NAME_ARRAY[1] = target.value;
        break;
      case "number_of_pages":
        book.numberOfPages = isNaN(parseInt(target.value))
          ? 0
          : parseInt(target.value);
        break;
      case "title":
        book.title = target.value;
        break;
      case "description":
        book.description = target.value;
        break;
      default:
        throw new Error(
          "cannot find the correct dataset and data for this input"
        );
    }
  }
}

function loadSampleData() {
  addBook({
    id: "sjdnsajndjsadjsajdnsajdnsaj",
    title: "title1",
    authorName: "Adam Mickiewicz",
    description: "it is a nice book",
    numberOfPages: 32,
    isReaded: false,
  });
  addBook({
    id: "sjdnsajndjsadjsajdnsajdnsak",
    title: "title2",
    authorName: "Adam Mickiewicz",
    numberOfPages: 32,
    isReaded: true,
  });
  addBook({
    id: "sjdnsajndjsadjsajdnsajdnsal",
    title: "title1",
    authorName: "Adam Małysz",
    description: "it is a very nice book",
    numberOfPages: 32,
    isReaded: false,
  });
}

form?.addEventListener("input", inputController);
parentContainer?.addEventListener("click", clickController);
window.addEventListener("load", loadSampleData);
