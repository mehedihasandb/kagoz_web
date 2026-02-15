import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';
import cartReducer from './slices/cartSlice';
import ecommerceReducer from './slices/ecommerceSlice';
import wishListReducer from './slices/wishSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'wishlist', 'user'], // Include auth if you want to persist it
};

const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    ecommerce: ecommerceReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
    user: authReducer,
    ui:uiReducer
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
