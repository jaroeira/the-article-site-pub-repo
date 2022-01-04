
import fetchHelper from './fetchHelper';
import helper from './helper';
import { config } from '../helpers/constants';

const baseUrl = `${config.url.API_BASE_URL}/user`;

const signupUser = userData => {
    return fetchHelper.post({ url: `${baseUrl}/signup`, body: userData });
};

const signinUser = userData => {
    return fetchHelper.post({ url: `${baseUrl}/signin`, body: userData }).then(response => {
        storeAuthData(response);
        return response;
    });
};

const autoLogin = () => {
    const { userId, token, role, displayName, avatarImageUrl, bookmarks } = loadStoredAuthData();
    if (!userId || !token || !role) {
        console.log('Auto Login not possible');
        return null;
    }

    const { timeout } = helper.extratExpDateFromJwtToken(token);
    if (timeout < (2 * 60 * 1000)) {
        console.log('Auto Login not possible: token not valid');
        removeAuthDataFromStorage();
        return null;
    }

    console.log('Auto Login OK!');
    return { userId, token, role, displayName, avatarImageUrl, bookmarks };
};

const signoutUser = (token) => {
    return fetchHelper.post({ url: `${baseUrl}/revoke-token`, token: token }).finally(() => {
        removeAuthDataFromStorage();
    });

};

const refreshToken = () => {
    return fetchHelper.post({ url: `${baseUrl}/refresh-token` });
};

const verifyEmail = (token) => {
    return fetchHelper.get({ url: `${baseUrl}/verify-email?token=${token}` });
};

const forgotPassword = (email) => {
    return fetchHelper.post({ url: `${baseUrl}/forgot-password`, body: { email } });
};

const resetPassword = ({ token, password }) => {
    return fetchHelper.post({ url: `${baseUrl}/reset-password`, body: { token, password } });
};

const uploadUserAvatarImage = ({ token, formData }) => {
    return fetchHelper.post({ url: `${baseUrl}/upload-avatar`, body: formData, token, isFormData: true }).then(response => {
        updateStoredAvatarImageUrl(response.avatarImageUrl);
        return response;
    });
};

const updateUserProfile = ({ token, userData }) => {
    return fetchHelper.put({ url: `${baseUrl}/update-user-profile`, body: { ...userData }, token }).then(response => {
        const authData = {
            userId: response.user.id,
            token: token,
            role: response.user.role,
            displayName: response.user.displayName,
            avatarImageUrl: response.user.avatarImageUrl
        };

        storeAuthData({ ...authData });
        return response;
    });
};

const changeUserPassword = ({ token, userData }) => {
    return fetchHelper.put({ url: `${baseUrl}/change-password`, body: { ...userData }, token });
};

const bookmarkArticle = ({ token, articleId }) => {
    return fetchHelper.post({ url: `${baseUrl}/bookmark-article`, body: { articleId }, token }).then(response => {
        localStorage.setItem('bookmarks', response.bookmarks);
        return response;
    });
};

//helper functions
const storeAuthData = ({ userId, token, role, displayName, avatarImageUrl, bookmarks = [] }) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('bookmarks', bookmarks);

    if (avatarImageUrl) {
        localStorage.setItem('avatarImageUrl', avatarImageUrl);
    }

    console.log('AuthData stored in local storage');
};

const loadStoredAuthData = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const displayName = localStorage.getItem('displayName');
    const avatarImageUrl = localStorage.getItem('avatarImageUrl');
    const bookmarks = localStorage.getItem('bookmarks').length > 0 ? localStorage.getItem('bookmarks').split(',') : [];

    console.log('loadStoredAuthData', bookmarks);

    return { userId, token, role, displayName, avatarImageUrl, bookmarks };
};

const updateStoredAvatarImageUrl = (avatarImageUrl) => {
    console.log('updated updateStoredAvatarImageUrl');
    localStorage.setItem('avatarImageUrl', avatarImageUrl);
};

const getUser = ({ token, userId }) => {
    return fetchHelper.get({ url: `${baseUrl}/get-user?userId=${userId}`, token: token });
};


const removeAuthDataFromStorage = () => {
    localStorage.clear();
    console.log('AuthData removed from local storage');
};


const authService = {
    signupUser,
    signinUser,
    signoutUser,
    autoLogin,
    refreshToken,
    verifyEmail,
    forgotPassword,
    resetPassword,
    uploadUserAvatarImage,
    getUser,
    updateUserProfile,
    changeUserPassword,
    bookmarkArticle
};

export default authService;