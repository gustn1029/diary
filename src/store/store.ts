import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import fireStoreSlice from "./fireStoreSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        fireStore: fireStoreSlice
    },
    devTools: import.meta.env.MODE !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;