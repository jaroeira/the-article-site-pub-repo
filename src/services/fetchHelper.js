

const requestHeader = (token, isFormData) => {
    if (isFormData) {
        return token ? { Authorization: `Bearer ${token}` } : {};
    } else {
        return token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            : { 'Content-Type': 'application/json' };
    }


};

const handleResponse = async response => {

    return response.json().then(responseData => {
        if (response.status === 200 || response.status === 201) {
            return { ...responseData, status: response.status, };
        } else {
            const message = responseData.message ? responseData.message : 'An error has occurred';
            return Promise.reject({ ...responseData, status: response.status, message: message });
        }
    });

};

const get = ({ url, token }) => {

    const requestOptions = {
        method: 'GET',
        headers: { ...requestHeader(token) },
    };

    return fetch(url, requestOptions).then(handleResponse);
};

const post = ({ url, body = {}, token, isFormData = false }) => {

    const requestOptions = {
        method: 'POST',
        headers: { ...requestHeader(token, isFormData) },
        credentials: isFormData ? 'same-origin' : 'include',
        body: isFormData ? body : JSON.stringify(body)
    };

    return fetch(url, requestOptions).then(handleResponse);
};

const put = ({ url, body = {}, token, isFormData = false }) => {
    const requestOptions = {
        method: 'PUT',
        headers: { ...requestHeader(token, isFormData) },
        credentials: isFormData ? 'same-origin' : 'include',
        body: isFormData ? body : JSON.stringify(body)
    };

    return fetch(url, requestOptions).then(handleResponse);
};

const deleteMethod = ({ url, body = {}, token }) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...requestHeader(token) },
        credentials: 'include',
        body: JSON.stringify(body)
    };

    return fetch(url, requestOptions).then(handleResponse);
};


const fetchHelper = {
    get,
    post,
    put,
    deleteMethod
};

export default fetchHelper;