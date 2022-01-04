import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from '../services/authService';

//Async Thunks

export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ firstName, lastName, email, password }, thunkApi) => {
        console.log('signup thunk');

        try {
            const response = await authService.signupUser({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
            return thunkApi.fulfillWithValue({ userId: response.userId });

        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('signupUser thunk catch error', error);
            return thunkApi.rejectWithValue({ message: message });
        }

    }
);

export const signinUser = createAsyncThunk(
    'auth/signinUser',
    async ({ email, password }, thunkApi) => {
        try {
            const response = await authService.signinUser({ email: email, password: password });
            return thunkApi.fulfillWithValue({ ...response });
        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('signinUser thunk catch error', error);
            return thunkApi.rejectWithValue({ message: message });
        }
    }
);

export const signoutUser = createAsyncThunk(
    'auth/signoutUser',
    async (token, thunkApi) => {
        try {
            await authService.signoutUser(token);
            return thunkApi.fulfillWithValue();
        } catch (error) {
            return thunkApi.rejectWithValue();
        }
    }
);

export const autoLogin = createAsyncThunk(
    'auth/autoLogin',
    async (_, thunkApi) => {
        const authData = authService.autoLogin();
        if (authData) {
            return authData;
        } else {
            return thunkApi.rejectWithValue();
        }
    }
);

export const refreshTokenAction = createAsyncThunk(
    'auth/refreshTokenAction',
    async (_, thunkApi) => {
        try {
            const userAuthData = await authService.refreshToken();
            console.log('refreshTokenAction', userAuthData);
            return thunkApi.fulfillWithValue(userAuthData);
        } catch (error) {
            return thunkApi.rejectWithValue();
        }
    }
);

export const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (token, thunkApi) => {
        try {
            await authService.verifyEmail(token);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const sendResetPasswordEmail = createAsyncThunk(
    'auth/sendResetPasswordEmail',
    async (email, thunkApi) => {
        try {
            await authService.forgotPassword(email);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, thunkApi) => {
        try {
            await authService.resetPassword({ token, password });
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const uploadAvatarImage = createAsyncThunk(
    'auth/uploadAvatarImage',
    async ({ token, formData }, thunkApi) => {
        try {
            const response = await authService.uploadUserAvatarImage({ token, formData });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile',
    async ({ token, userId }, thunkApi) => {
        try {
            const response = await authService.getUser({ token, userId });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async ({ token, userData }, thunkApi) => {
        try {
            const response = await authService.updateUserProfile({ token, userData });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const changeUserPassword = createAsyncThunk(
    'auth/changeUserPassword',
    async ({ token, userData }, thunkApi) => {
        try {
            const response = await authService.changeUserPassword({ token, userData });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const bookmarkArticle = createAsyncThunk(
    'auth/bookmarkArticle',
    async ({ token, articleId }, thunkApi) => {
        try {
            const response = await authService.bookmarkArticle({ token, articleId });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);


const initialState = {
    isAuthenticated: false,
    token: null,
    userId: null,
    displayName: null,
    avatarImageUrl: null,
    userProfile: null,
    bookmarks: [],
    isLoadingBookmarks: false,
    role: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    didUpdateUserProfile: false,
    didChangeUserPassword: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            state = initialState;
            return state;
        },
        clearFetchState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errorMessage = '';
            state.didUpdateUserProfile = false;
            state.didChangeUserPassword = false;
            state.isLoadingBookmarks = false;
        }
    },
    extraReducers: {
        [signupUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMessage = '';
        },
        [signupUser.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [signupUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.isSuccess = false;
            state.errorMessage = payload.message;
        },
        [signinUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.userId = payload.userId;
            state.token = payload.token;
            state.role = payload.role;
            state.displayName = payload.displayName;
            state.avatarImageUrl = payload.avatarImageUrl;
            state.bookmarks = payload.bookmarks;
            state.isAuthenticated = true;
        },
        [signinUser.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [signinUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
            state.displayName = null;
            state.isError = true;
            state.isSuccess = false;
            state.errorMessage = payload.message;
        },
        [signoutUser.fulfilled]: (state, { payload }) => {
            state = initialState;
            return state;
        },
        [signoutUser.rejected]: (state, { payload }) => {
            state = initialState;
            return state;
        },
        [autoLogin.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.displayName = payload.displayName;
            state.userId = payload.userId;
            state.token = payload.token;
            state.role = payload.role;
            state.avatarImageUrl = payload.avatarImageUrl;
            state.bookmarks = payload.bookmarks;
            state.isAuthenticated = true;
        },
        [autoLogin.rejected]: (state, { payload }) => {
            state.userId = null;
            state.token = null;
            state.role = null;
            state.avatarImageUrl = null;
            state.isAuthenticated = false;
            state.bookmarks = [];
        },
        [refreshTokenAction.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.userId = payload.userId;
            state.token = payload.token;
            state.isAuthenticated = true;
        },
        [refreshTokenAction.rejected]: (state, { payload }) => {
            state = initialState;
            return state;
        },
        [verifyEmail.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
        },
        [verifyEmail.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [verifyEmail.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [sendResetPasswordEmail.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
        },
        [sendResetPasswordEmail.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [sendResetPasswordEmail.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [resetPassword.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
        },
        [resetPassword.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [resetPassword.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [uploadAvatarImage.fulfilled]: (state, { payload }) => {
            state.avatarImageUrl = payload.avatarImageUrl;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
        },
        [uploadAvatarImage.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [uploadAvatarImage.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [getUserProfile.fulfilled]: (state, { payload }) => {
            state.userProfile = payload.user;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
        },
        [getUserProfile.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getUserProfile.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [updateUserProfile.fulfilled]: (state, { payload }) => {
            state.userProfile = payload.user;
            state.displayName = payload.user.displayName;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
            state.didUpdateUserProfile = true;
        },
        [updateUserProfile.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [updateUserProfile.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [changeUserPassword.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
            state.didChangeUserPassword = true;
        },
        [changeUserPassword.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [changeUserPassword.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [bookmarkArticle.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isLoadingBookmarks = false;
            state.bookmarks = payload.bookmarks;
        },
        [bookmarkArticle.pending]: (state, { payload }) => {
            state.isLoadingBookmarks = true;
        },
        [bookmarkArticle.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isLoadingBookmarks = false;
        }
    }
});



export const authActions = authSlice.actions;
export const authSelector = (state) => state.auth;

export default authSlice;