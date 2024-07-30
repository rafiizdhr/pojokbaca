const apiKey = 'AIzaSyC_Lg52hjifsDDkIt4BBhN8KtrktjrZoh4'; // Replace with your Google Books API key


const categories = ['Fiction', 'Science', 'Technology', 'History', 'Mathematics'];

document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories');
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');
        categoryContainer.innerHTML = `
            <div class="tes">
                <h2 class="category-title" style="margin-right: 10px;margin-bottom: 0px">${category}</h2>
                <a href="see_more.html?category=${category}" class="btn btn-primary" style="border-radius:10px;">lihat buku lain</a>
            </div>
            <div class="row" id="${category}-row"></div>
        `;
        categoriesContainer.appendChild(categoryContainer);
        
        fetchBooks(category);
    });
});

function fetchBooks(category) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&langRestrict=id&maxResults=10&has_fulltext=true&public_scan=true&key=${apiKey}`;
    let loader = `<div class="boxLoading"></div>`;
    document.getElementById(`${category}-row`).innerHTML = loader;
    document.getElementById(`${category}-row`).style = "justify-content: center";
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return response.json();
        })
        .then(data => {
            displayBooks(data.items, category);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            document.getElementById(`${category}-row`).innerHTML = `<p style="color: white;">Error fetching books: ${error.message}</p>`;
        });
}

function displayBooks(books, category) {
    const bookRow = document.getElementById(`${category}-row`);
    bookRow.style = null;
    bookRow.innerHTML = '';
    console.log(books);
    if (books && books.length > 0) {
        
        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');

            const title = book.volumeInfo.title || 'No title';
            const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors';
            const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '';
            const bookLink = book.volumeInfo.previewLink || `https://books.google.com/books?id=${book.id}`;
            
            const bookJson = encodeURIComponent(JSON.stringify(book));

            bookDiv.innerHTML = `
            <div class="card" style="width: 15rem;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);border-radius:10px;">
                <div class="img-box"><img class="card-img-top" style="height:300px;padding:10px;border-radius:20px" src="${thumbnail}" alt="${title}"></div>
                <div class="card-body" >
                    <h5 class="card-title" style="display: -webkit-box;
                            -webkit-line-clamp: 1; /* Number of lines to show */
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;">${title}</h5>
                    <p class="card-text" style="display: -webkit-box;
                            -webkit-line-clamp: 1; /* Number of lines to show */
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            text-overflow: ellipsis;">${authors}</p>
                    <a href="${bookLink}" class="btn btn-primary" target="_blank">Baca Buku</a>
                    <button class="btn btn-primary" style="background-color: #999999;" onclick='bookClick(decodeURIComponent("${bookJson}"))'>Details</button>
                </div>
            </div>
            `;    
            bookRow.appendChild(bookDiv);
            
        });
    } else {
        bookRow.innerHTML = '<p>No books found.</p>';
    }
}


function bookClick(bookStr){
    // Decode the URI component
    const book = JSON.parse(decodeURIComponent(bookStr));

    // Set the title of the modal
    const description = book.volumeInfo.description || 'No description available';

    // Set the title of the modal
    document.getElementById('bookModalLabel').innerText = book.volumeInfo.title || 'No title';
    
    // Set the body content of the modal
    document.querySelector('#bookModal .modal-body').innerHTML = `
    <div style="display:flex; justify-content:center;">
        <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}" alt="${book.volumeInfo.title || 'No title'}">
    </div>
    <p><strong>Authors:</strong> ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'No authors'}</p>
    <p><strong>Description:</strong> ${description}</p>
    `;
    
    document.querySelector('.modal-footer').innerHTML = `
    <a class="btn btn-primary" href="${book.volumeInfo.previewLink}" target="_blank">Baca Buku</a>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    `;

    // Show the modal
    $('#bookModal').modal('show');
}