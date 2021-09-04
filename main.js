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

! Validtion requirement:
    ! The book must be exist
    ! The quantity must be > 0
    ! The account balance must be > book price
*/


let booksStore = [
  [1, "Start with why", "Simon Sinek", 80.0, 13],
  [2, "But how do it know", "J. Clark Scott", 59.9, 22],
  [3, "Clean Code", "Robert Cecil Martin", 50.0, 5],
  [4, "Zero to One", "Peter Thiel", 45.0, 12],
  [5, "You don't know JS", "Kyle Simpson", 29.9, 9],
];

console.log("--- Satr JS101 Bookstore Project ---");


const displayBooks = (row) => {
    console.log(row);
    const tbody = document.getElementById("row")
    let newRow = tbody.insertRow(-1)
    for(let i = 0; i < row.length; i++) {
        newRow.insertCell(i).innerHTML = `<td>${row[i]}</td>`
    }
}
 
const getUserChoice = () => {
    console.log("1- Would you like to search for a book ?");
    console.log("2- Would you like to buy a book ? ");
    const choice = prompt("Your choice: ")
    getBookDetailsByChoice(choice)
}

const getBookDetailsByChoice = (choice) => {
    console.log(choice);
}

const searchForBook = (id, title, author) => {
    console.log();
}

const sellBook = (title, quantity, currentBalance) => {
    console.log();
}


booksStore.forEach((e, index) => {
    console.log(index);
    displayBooks(index, e)
})


// Iterate over the books
for(let outter = 0 ; outter < booksStore.length; outter++) {
    let row = []
    for(let inner = 0; inner < booksStore.length; inner++) {[
        row.push(booksStore[outter][inner])
    ]}
    displayBooks(row)
}