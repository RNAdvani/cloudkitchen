import { configureStore} from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { chefApi } from "./api/chefApi";
import { kitchenReducer } from "./reducer/kitchenReducer";
import { orderApi } from "./api/orderApi";

export const store = configureStore({
    reducer:{
        [userAPI.reducerPath]:userAPI.reducer,
        [userReducer.reducerPath]:userReducer.reducer,
        [chefApi.reducerPath]:chefApi.reducer,
        [kitchenReducer.reducerPath]:kitchenReducer.reducer,
        [orderApi.reducerPath]:orderApi.reducer
    },
    middleware:(mid)=>mid().concat([userAPI.middleware,chefApi.middleware,orderApi.middleware])
})