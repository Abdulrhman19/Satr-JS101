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
const selection = document.querySelector("#selection");
const addBookId = document.querySelector("#add");
const show_choices = document.querySelector(".show-choices");
const existence = document.getElementById("existence");
const notifications = document.getElementById("notifications")
const invoice = document.querySelector('#invoice')
const updateBookSection = document.querySelector('#updateBookSection')
const deleteBookSection = document.querySelector('#deleteBookSection')


document.querySelector(".choices").addEventListener("click", (e) => {
  const clickedElenment = e.target.textContent;
  const pos = clickedElenment.split("").indexOf(" ");
  const requestType = clickedElenment.slice(0, pos);
  if (choices_item.classList.contains("hidden")) {
    choices_item.classList.remove("hidden");
    show_choices.classList.add("hidden");
    search.classList.add("hidden");
    selection.classList.add("hidden");
    buy.classList.add("hidden");
    addBookId.classList.add("hidden");
    updateBookSection.classList.add('hidden')
    deleteBookSection.classList.add('hidden')

    reset(existence)
    reset(notifications)
    // reset(invoice)
  } else {
    choices_item.classList.add("hidden");
    show_choices.classList.remove("hidden");
    if (requestType === "Search") {
      search.classList.remove("hidden");
    } else if (requestType === "Update") {
      selection.classList.remove("hidden");
    } else if (requestType === "Buy") {
      buy.classList.remove("hidden");
    } else if(requestType === 'Add') {
      addBookId.classList.remove("hidden");
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

const destroyOldRows = () => {
  const tbody = document.getElementById("row");
  row.innerHTML = ''
}

const reset = (element) => {
  // Remove all classes from element
  if (element.classList.length > 0) {
    console.log(element.classList);
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
          existence.innerText = `Book found. Please look at the table above at row number ${i + 1
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

const buyBook = () => {
  const buy = document.querySelector('#submitBuy')
  buy.addEventListener('click', () => {
    const id = document.querySelector('#buyId').value.trim()
    const quantity = document.querySelector('#buyQuantity').value.trim()
    const balance = document.querySelector('#balance').value.trim()

    let record = []
    let rowNumber = 0
    for (let i = 0; i < booksStore.length; i++) {
      if (booksStore[i].includes(id)) {
        record.push(booksStore[i])
        rowNumber = i
      }
    }
    
    // TODO: Refactoring needed here.
    if (id && quantity && balance) {
      const total = eval(`${quantity}*${record[0][3]}`)
      if (parseFloat(balance) > parseFloat(total)) {
        reset(notifications)
        record[0][4] = eval(`${record[0][4]}-${quantity}`)
        console.log(record[0]);
        const title = record[0][1]
        const author = record[0][2]
        const price = record[0][3]
        createInvoice(title, total, quantity, price)
        prepareRowsTodDisplay()
      } else {
        notifications.innerText = "You did not have enough money"
        notifications.classList.add('warning')
      }

    } else {
      notifications.innerText = "Please fill all the fields"
      notifications.classList.add('warning')
    }
  })
};


const addNewBook = () => {
  const addBook = document.querySelector('#addBook')
  const addId = document.getElementById("addId")
  const newId = booksStore.length + 1
  addId.placeholder = `Id: ${newId}`


  addBook.addEventListener('click', (event) => {
    const addTitle = document.getElementById("addTitle").value.trim();
    const addAuthor = document.getElementById("addAuthor").value.trim();
    const addPrice = document.getElementById("addPrice").value.trim();
    const addQuantity = document.getElementById("addQuantity").value.trim();

    if (addTitle && addAuthor && addPrice && addQuantity) {
      const newBook = [newId, addTitle, addAuthor, addPrice, addQuantity]
      booksStore.push(newBook)
      if (booksStore.length === newId) {
        notifications.innerText = `${addTitle} book has been added`
        notifications.classList.add('found')
        // reset(elements=[addId, addTitle, addAuthor, addPrice, addQuantity])
        insertItemToTable(newBook)
      }
    } else {
      notifications.innerText = "To add a new book you should fill all of the fields below!"
      notifications.classList.add('warning')
    }
  })
};

const updateOrDelete = () => {
  document.querySelector('#listenForClick').addEventListener('click', () => {
    if(document.querySelector('#updateBook').checked) {
      updateBook()
    } else if(document.querySelector('#deleteBook').checked) {
      deleteBook()
    }
  })
}

const updateBook= () => { 
  selection.classList.add('hidden')
  updateBookSection.classList.remove('hidden')
  let id
  const updateBookBtn = document.querySelector('#updateBookBtn')
  const updateTitle = document.getElementById("updateTitle")
  const updateAuthor = document.getElementById("updateAuthor")
  const updatePrice = document.getElementById("updatePrice")
  const updateQuantity = document.getElementById("updateQuantity")
  let record = []
  const updateId = document.querySelector('#updateId')


  updateId.addEventListener('input', (event) => {
    id = event.target.value.trim()

    for(let i = 0; i < booksStore.length; i++) {
      if(booksStore[i][0] === id) {
        record.push(booksStore[i])
        console.log("match");
        reset(notifications)
        break
      } else {
        updateTitle.value = ''
        updateAuthor.value = ''
        updatePrice.value = ''
        updateQuantity.value = ''
        notifications.innerText = "book with this id not found"
        notifications.classList.add('warning')
      }
    }
    updateTitle.value = record[0][1]
    updateAuthor.value = record[0][2]
    updatePrice.value = record[0][3]
    updateQuantity.value = record[0][4]  
  })

  updateBookBtn.addEventListener('click', () => {
    if(updateTitle.value !== record[0][1]) {
      record[0][1] = updateTitle.value
    } else if(updateAuthor.value !== record[0][2]) {
      record[0][2] = updateAuthor.value
    } else if(updatePrice.value !== record[0][3]) {
      record[0][3] = updatePrice.value
    } else if(updateQuantity.value !== record[0][4]){
      record[0][4] = updateQuantity.value
    }
    prepareRowsTodDisplay()
  })
};

const deleteBook = () =>{ 
  selection.classList.add('hidden')
  deleteBookSection.classList.remove('hidden')

  const deleteBookBtn = document.querySelector('#deleteBookBtn')
  const bookId = document.getElementById('deleteId')
  deleteBookBtn.addEventListener('click', () => {
    const id = bookId.value.trim()
    const confirmation = confirm(`Are you sure you want to delete book with id ${id}?`)
    if(confirmation) {
      for(let i = 0; i < booksStore.length; i++) {
        if(booksStore[i][0] === id) {
          booksStore.splice(booksStore[i], 1)
          notifications.innerText = "Removed"
          notifications.classList.add('found')
          prepareRowsTodDisplay()
          break
          reset(notifications)
        } else {
          notifications.innerText = "Book with this id not found"
          notifications.classList.add('warning')
          reset(notifications)
        }
      }
    }
  })

}

const insertItemToTable = (item) => {
  const tbody = document.getElementById("row");
  let newRow = tbody.insertRow(-1);
  for (let i = 0; i < item.length; i++) {
    newRow.insertCell(i).innerHTML = `<td>${item[i]}</td>`;
  }
}


const createInvoice = (title, total, quantity, price) => {
  const titleElement = document.querySelector('.title')
  const quantityElement = document.querySelector('.quantity')
  const priceElement = document.querySelector('.price')
  const totalElement = document.querySelector('.total')

  titleElement.innerText = `Book title: ${title}`
  quantityElement.innerText = `Quantity: ${quantity}`
  priceElement.innerText = `Price: ${price}`
  totalElement.innerText = `Total: ${price} * ${quantity} = ${eval(`${price}*${quantity}`)}`
  invoice.classList.remove('hidden')
}


const prepareRowsTodDisplay = () => {
  destroyOldRows()
  for (let outter = 0; outter < booksStore.length; outter++) {
    let row = [];
    for (let inner = 0; inner < booksStore[outter].length; inner++) {
      [row.push(booksStore[outter][inner])];
    }
    displayBooks(row);
  }  
}

prepareRowsTodDisplay()



