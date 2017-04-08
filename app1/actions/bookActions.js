function editBook(book) {
    return {
        type: 'EDIT_BOOK',
        payload: book
    };
}

function deleteBook(id) {
    return {
        type: 'DELETE_BOOK',
        payload: id
    };
}

function addBook(book) {
    return {
        type: 'ADD_BOOK',
        payload: book
    };
}

module.exports = {
    editBook,
    deleteBook,
    addBook
}