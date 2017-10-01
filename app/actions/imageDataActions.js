function deleteImage(image) {
    return {
        type: 'DELETE_IMAGE',
        payload: image
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