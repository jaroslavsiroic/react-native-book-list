import pixabay from '../pixabayAPI.json';
import addCacheInfo from './imageCacheActions';
import { Alert } from 'react-native';
const BASE_URL = 'https://pixabay.com/api/';

function fetchReq(url, request, successCallback=defaultSuccessCallback, errorCallback=defaultErrorCallback) {
    return (dispatch, getState) => {
        fetch(url, request)
        .then((response) => {
            if (response.status >= 400) {
                dispatch(errorCallback(response.status));
            } else {
                try {
                    return response.json();
                } catch(e) { showAlert(e); }
            }
        })
        .then((data) => {
            dispatch(successCallback(data));
        });
    }
}

function getFromPixaBay(querry, image_type='photo') {
    const req = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };
    let params = '?key='+pixabay.key+'&image_type='+image_type;
    if (querry) {
        params +='&q='+encodeURI(querry);
    }

    return fetchReq(BASE_URL+params, req, addCacheInfo);
}

function defaultErrorCallback(code) {
    showAlert(code);
}
function defaultSuccessCallback(data) {
    return {
        type: 'SUCCESS_CALLBACK',
        payload: data
    };
}

function showAlert(code) {
    Alert.alert(
      'Fetch went wrong',
      'Status: '+code,
      [
        {text: 'OK'},
      ],
      { cancelable: true }
    )
}


module.exports = {
    getFromPixaBay,
    fetchReq
};