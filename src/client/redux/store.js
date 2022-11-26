import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { botReducer } from "./slices/bot";
import { dashboardReducer } from "./slices/dashboard";

const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        bot: botReducer
    }
});

export default store;