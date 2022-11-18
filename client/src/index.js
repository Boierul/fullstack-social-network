import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import authReducer from "./state";

import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// Save global states in localstorage
import {PersistGate} from "redux-persist/integration/react";


// Configure the persistence
const persistConfig = {key: "root", storage, version: 1};
// Persist the state
const persistedReducer = persistReducer(persistConfig, authReducer);
// An obj that creates a Redux store that holds the complete state tree of the app
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistStore(store)}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
