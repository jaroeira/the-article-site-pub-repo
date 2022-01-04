const extratExpDateFromJwtToken = (token) => {
    //extract a json object from the base64 encoded token
    const jwtToken = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(jwtToken.exp * 1000);
    console.log('expirationDate', expirationDate);
    //Timeout 1 minute before expiration
    const timeout = expirationDate.getTime() - Date.now() - (60 * 1000);
    return { expirationDate, timeout };
};

const helper = {
    extratExpDateFromJwtToken
};

export default helper;