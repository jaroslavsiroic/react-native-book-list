function deleteImage(id) {
    return {
        type: 'DELETE_IMAGE',
        payload: id
    };
}

function addImage(image) {
    return {
        type: 'ADD_IMAGE',
        payload: image
    };
}

module.exports = {
    deleteImage,
    addImage
};