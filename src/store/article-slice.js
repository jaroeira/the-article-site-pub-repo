import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import articleService from '../services/articleService';

//Article Thunks

export const createArticle = createAsyncThunk(
    'article/createArticle',
    async ({ token, title, content, description, tags, uploadedImageNames }, thunkApi) => {
        try {
            const response = await articleService.createArticle({ token, title, content, description, tags, uploadedImageNames });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('create article error', error);
            return thunkApi.rejectWithValue({ message: message });
        }
    }
);

export const getLastArticles = createAsyncThunk(
    'article/getLastArticles',
    async ({ limit }, thunkApi) => {
        try {
            const pageSize = limit ? limit : 6;
            const pageOptions = { paginated: true, pageSize, page: 1, sortBy: 'created', sortOrder: 'desc' };
            const response = await articleService.getArticles({ pageOptions });

            return thunkApi.fulfillWithValue(response.docs);
        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('Get articles error', error);
            return thunkApi.rejectWithValue({ message: message });
        }
    }
);

export const getTopArticles = createAsyncThunk(
    'article/getTopArticles',
    async (_, thunkApi) => {
        try {
            const pageOptions = { paginated: true, pageSize: 3, page: 1, sortBy: 'likes', sortOrder: -1 };
            const response = await articleService.getArticles({ pageOptions });

            return thunkApi.fulfillWithValue(response.docs);
        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('Get articles error', error);
            return thunkApi.rejectWithValue({ message: message });
        }
    }
);

export const updateArticle = createAsyncThunk(
    'article/updateArticle',
    async ({ token, formData }, thunkApi) => {
        try {
            const response = await articleService.updateArticle({ formData, token });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('Update articles error', error);
            return thunkApi.rejectWithValue({ message: message });
        }
    }
);

export const getPaginatedArticles = createAsyncThunk(
    'article/getPaginatedArticles',
    async ({ pageSize = 9, page = 1, sortBy = 'created', sortOrder = 'desc', query }, thunkApi) => {

        const pageOptions = {
            paginated: true,
            pageSize,
            page,
            sortBy,
            sortOrder
        };

        try {
            const response = await articleService.getArticles({ pageOptions, query });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('Get My articles error', error);
            return thunkApi.rejectWithValue({ message: message });
        }
    }
);

export const getArticleById = createAsyncThunk(
    'article/getArticleById',
    async ({ articleId, userId }, thunkApi) => {
        try {
            const response = await articleService.getArticleById({ articleId, userId });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('Get articles by id error', error);
            return thunkApi.rejectWithValue({ message: message });
        }
    }
);

export const deleteArticle = createAsyncThunk(
    'article/deleteArticle',
    async ({ token, articleId }, thunkApi) => {
        try {
            const response = await articleService.deleteArticle({ token, articleId });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('Delete articles by id error', error);
            return thunkApi.rejectWithValue({ message: message });
        }
    }
);

export const likeArticle = createAsyncThunk(
    'article/likeArticle',
    async ({ token, articleId }, thunkApi) => {

        try {
            const response = await articleService.likeArticle({ token, articleId });
            return thunkApi.fulfillWithValue(response);
        } catch (error) {
            const message = error.message ? error.message : 'An error has occurred';
            console.log('Like articles by id error', error);
            return thunkApi.rejectWithValue({ message: message });
        }
    }
);

const initialState = {
    lastArticles: [],
    topArticles: [],
    paginatedArticles: {},
    searchTerms: {},
    articleDetail: {},
    articleDetailLiked: false,
    newArticleId: null,
    isFetching: false,
    isLoadingLike: false,
    didUpdateArticle: false,
    didDeleteArticle: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
};

//Reducers

const articleSlice = createSlice({
    name: 'article',
    initialState: initialState,
    reducers: {
        clearState: (state) => {
            state = initialState;
        },
        clearFetchState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.isLoadingLike = false;
            state.errorMessage = '';
            state.newArticleId = null;
            state.didUpdateArticle = false;
            state.didDeleteArticle = false;
        },
        setSearchTerm: (state, action) => {
            state.searchTerms = action.payload;
        }
    },
    extraReducers: {
        [createArticle.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
            state.newArticleId = payload.articleId;
            state.lastArticles = [];
        },
        [createArticle.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [createArticle.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [getLastArticles.fulfilled]: (state, { payload }) => {
            state.lastArticles = payload;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
        },
        [getLastArticles.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getLastArticles.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [getTopArticles.fulfilled]: (state, { payload }) => {
            state.topArticles = payload;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
        },
        [getTopArticles.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getTopArticles.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [getPaginatedArticles.fulfilled]: (state, { payload }) => {
            state.paginatedArticles = payload;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
        },
        [getPaginatedArticles.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getPaginatedArticles.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [getArticleById.fulfilled]: (state, { payload }) => {
            state.articleDetail = payload.article;
            state.articleDetailLiked = payload.likedByUser;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
        },
        [getArticleById.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [getArticleById.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [updateArticle.fulfilled]: (state, { payload }) => {
            state.articleDetail = payload.updatedArticle;
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
            state.didUpdateArticle = true
        },
        [updateArticle.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [updateArticle.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
        },
        [deleteArticle.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isFetching = false;
            state.didDeleteArticle = true;
            state.lastArticles = [];
            state.topArticles = [];
        },
        [deleteArticle.pending]: (state, { payload }) => {
            state.isFetching = true;
        },
        [deleteArticle.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isFetching = false;
            state.didDeleteArticle = false;
        },
        [likeArticle.fulfilled]: (state, { payload }) => {
            state.isSuccess = true;
            state.isError = false;
            state.errorMessage = '';
            state.isLoadingLike = false;
            state.articleDetailLiked = payload.like;
        },
        [likeArticle.pending]: (state, { payload }) => {
            state.isLoadingLike = true;
        },
        [likeArticle.rejected]: (state, { payload }) => {
            state.isSuccess = false;
            state.isError = true;
            state.errorMessage = payload.message;
            state.isLoadingLike = false;
        }
    }
});

export const articleActions = articleSlice.actions;
export const articleSelector = (state) => state.article;

export default articleSlice;