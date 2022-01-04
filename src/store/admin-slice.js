import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import adminService from '../services/adminService';

export const getDocCounter = createAsyncThunk(
    'admin/getDocCounter',
    async (token, thunkApi) => {
        try {
            const response = await adminService.getCollectionDocsCounter({ token: token });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const getUsers = createAsyncThunk(
    'admin/getUsers',
    async ({ pageSize = 10, page = 1, sortBy = 'created', sortOrder = 'desc', query, token }, thunkApi) => {
        try {

            const pageOptions = {
                paginated: true,
                pageSize,
                page,
                sortBy,
                sortOrder
            };

            const response = await adminService.getUsers({ token, pageOptions, query });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const getUser = createAsyncThunk(
    'admin/getUser',
    async ({ token, userId }, thunkApi) => {
        try {
            const response = await adminService.getUser({ token, userId });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({ token, userData }, thunkApi) => {
        try {
            const response = await adminService.updateUser({ token, userData });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const createUser = createAsyncThunk(
    'admin/createUser',
    async ({ token, userData }, thunkApi) => {
        try {
            const response = await adminService.createUser({ token, userData });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async ({ token, userId }, thunkApi) => {
        try {
            const response = await adminService.deleteUser({ token, userId });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue(error);
        }
    }
);

const initialState = {
    totalUsers: 0,
    totalArticles: 0,
    paginatedUsers: {},
    editUser: {},
    isFetchingDocsCounter: false,
    isFetchingUsers: false,
    isFetchingEditUser: false,
    isCreatingUser: false,
    isDeletingUser: false,
    didUpdateUser: false,
    didCreateUser: false,
    didDeleteUser: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
};

const adminSlice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            state = initialState;
            return state;
        },
        clearFetchState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetchingDocsCounter = false;
            state.isFetchingUsers = false;
            state.isFetchingEditUser = false;
            state.isDeletingUser = false;
            state.didCreateUser = false;
            state.isCreatingUser = false;
            state.didUpdateUser = false;
            state.didDeleteUser = false;
            state.errorMessage = '';
        }
    },
    extraReducers: {
        [getDocCounter.fulfilled]: (state, { payload }) => {
            state.totalUsers = payload.users;
            state.totalArticles = payload.articles;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetchingDocsCounter = false;
        },
        [getDocCounter.pending]: (state, { payload }) => {
            state.isFetchingDocsCounter = true;
        },
        [getDocCounter.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetchingDocsCounter = false;
        },
        [getUsers.fulfilled]: (state, { payload }) => {
            state.paginatedUsers = payload;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetchingUsers = false;
        },
        [getUsers.pending]: (state, { payload }) => {
            state.isFetchingUsers = true;
        },
        [getUsers.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetchingUsers = false;
        },
        [getUser.fulfilled]: (state, { payload }) => {
            state.editUser = payload.user;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetchingEditUser = false;
        },
        [getUser.pending]: (state, { payload }) => {
            state.isFetchingEditUser = true;
        },
        [getUser.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetchingEditUser = false;
        },
        [updateUser.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetchingEditUser = false;
            state.didUpdateUser = true;
        },
        [updateUser.pending]: (state, { payload }) => {
            state.isFetchingEditUser = true;
        },
        [updateUser.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetchingEditUser = false;
            state.didUpdateUser = false;
        },
        [createUser.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isCreatingUser = false;
            state.didCreateUser = true;
        },
        [createUser.pending]: (state, { payload }) => {
            state.isCreatingUser = true;
        },
        [createUser.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isCreatingUser = false;
            state.didCreateUser = false;
        },
        [deleteUser.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isDeletingUser = false;
            state.didDeleteUser = true;
        },
        [deleteUser.pending]: (state, { payload }) => {
            state.isDeletingUser = true;
        },
        [deleteUser.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isDeletingUser = false;
            state.didDeleteUser = false;
        }

    }
});

export const adminActions = adminSlice.actions;
export const adminSelector = (state) => state.admin;

export default adminSlice;