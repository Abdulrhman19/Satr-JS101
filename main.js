/*
Each book must have the following data
? Book ID, Book title, Author, Price, Quantity


* Required features:
* Search for a book by:
    - Book ID
    - Title
    - Author
* Sell book
    ? if the required book quantity is > 0, then sell, otherwise reject 
* To procude an invoice
    ? This data myst be provided
    - Book title
    - Quantity => How many book do you want to buy
    - Current account balacne

! Validtion must be meet!:
    ! The book must be exist
    ! The quantity must be > 0
    ! The account balance must be > book price
*/

let booksStore = [
  ["1", "Start with why", "Simon Sinek", "80.0", "13"],
  ["2", "But how do it know", "J. Clark Scott", "59.9", "22"],
  ["3", "Clean Code", "Robert Cecil Martin", "50.0", "5"],
  ["4", "Zero to One", "Peter Thiel", "45.0", "12"],
  ["5", "You don't know JS", "Kyle Simpson", "29.9", " 9"],
];

console.log("--- Satr JS101 Bookstore Project ---");

const choices_item = document.querySelector(".choices-items");
const search = document.querySelector("#search");
const buy = document.querySelector("#buy");
const update = document.querySelector("#update");
const add = document.querySelector("#add");
const show_choices = document.querySelector(".show-choices");
const existence = document.getElementById("existence");



document.querySelector(".choices").addEventListener("click", (e) => {
  const clickedElenment = e.target.textContent;
  const pos = clickedElenment.split("").indexOf(" ");
  const requestType = clickedElenment.slice(0, pos);
  if (choices_item.classList.contains("hidden")) {
    choices_item.classList.remove("hidden");
    show_choices.classList.add("hidden");
    search.classList.add("hidden");
    reset(existence)
    update.classList.add("hidden");
    buy.classList.add("hidden");
    add.classList.add("hidden");

  } else {
    choices_item.classList.add("hidden");
    show_choices.classList.remove("hidden");
    if (requestType === "Search") {
      search.classList.remove("hidden");
    } else if (requestType === "Update") {
      update.classList.remove("hidden");
    } else if (requestType === "Buy") {
      buy.classList.remove("hidden");
    } else {
      add.classList.remove("hidden");
    }
  }
});


const displayBooks = (row) => {
  const tbody = document.getElementById("row");
  let newRow = tbody.insertRow(-1);
  for (let i = 0; i < row.length; i++) {
    newRow.insertCell(i).innerHTML = `<td>${row[i]}</td>`;
  }
};

const reset = (element) => {
  // Remove all classes from element
  if(element.classList.length) {
    element.classList.remove(element.classList)
    element.innerText = ''
  }
}


const searchForBook = () => {
  const submitSeach = document.querySelector("#submitSearch");

  submitSeach.addEventListener("click", () => {
    const searchId = document.getElementById("searchId").value.trim();
    const searchTitle = document.getElementById("searchTitle").value.trim();
    const searchAuthor = document.getElementById("searchAuthor").value.trim();

    if (
      searchId.length > 0 ||
      searchTitle.length > 0 ||
      searchAuthor.length > 0
    ) {
      for (let i = 0; i < booksStore.length; i++) {
        if (
          booksStore[i][0] === searchId ||
          booksStore[i][1] === searchTitle ||
          booksStore[i][2] === searchAuthor
        ) {
          existence.classList.remove("not-found");
          existence.classList.add("found");
          existence.innerText = `Book found. Please look at the table above at row number ${
            i + 1
          }`;

          break;
        } else {
          existence.classList.add("not-found");
          existence.innerText = `Book not found!`;
        }
      }
    }
  });
};

const buyBook = () => {};

const addNewBook = () => {

};

const updateExistingBook = () => {};

booksStore.forEach((e, index) => {
  displayBooks(index, e);
});

// Iterate over the books
for (let outter = 0; outter < booksStore.length; outter++) {
  let row = [];
  for (let inner = 0; inner < booksStore.length; inner++) {
    [row.push(booksStore[outter][inner])];
  }
  displayBooks(row);
}
