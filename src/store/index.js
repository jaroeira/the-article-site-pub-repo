import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import articleSlice from './article-slice';
import adminSlice from './admin-slice';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        article: articleSlice.reducer,
        admin: adminSlice.reducer
    },
    devTools: process.env.NODE_ENV === 'development' ? true : false
});

export default store;