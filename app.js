// BOOK Constructor
function Book(title, author, isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
}


//UI Constructor

function UI() {}

// Add Book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  /*
  const titleData = document.createElement('td');
  const authorData = document.createElement('td');
  const isbnData = document.createElement('td');

  titleData.innerHTML = book.title;
  authorData.innerHTML = book.author;
  isbnData.innerHTML = book.isbn;

  row.appendChild(titleData)
  row.appendChild(authorData);
  row.appendChild(isbnData);

  list.appendChild(row);
  console.log(list);
  */

  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}


// show alert
UI.prototype.showAlert = function(message, className){
      // Create div
      const div = document.createElement('div');
      // Add Classes
      div.className = `alert ${className}`;
      //Add text
      div.appendChild(document.createTextNode(message));
      // Get container
      const container = document.querySelector('.container');
      // Get form
      const form = document.querySelector('#book-form');
      
      setTimeout(function(){
         document.querySelector('.alert').remove();
      }, 3000)

      
      container.insertBefore(div, form);
}

// Delete Book
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete') {
          target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields = function(){
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
}

// Event Listener for add book 
document.getElementById('book-form').addEventListener('submit', function(e){

      // Get form values
      const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value;
      
      
      const book = new Book(title, author, isbn);
      
      // Instantiate UI
      const ui = new UI();
      // Validation 
      if(title === '' || author ==='' || isbn === ''){
            // Error alert 
            ui.showAlert('Please fill in all the fields', 'error');
      } else {

         // Add Book to list
         ui.addBookToList(book);

         // Show success
         ui.showAlert('Book added!', 'success')
         
         // Clear fields
         ui.clearFields();
      }
            
         
      e.preventDefault();
});


// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
  
      const ui = new UI();
      ui.deleteBook(e.target);

      // Show Alert
      ui.showAlert('Book removed!', 'success')
      e.preventDefault();
});