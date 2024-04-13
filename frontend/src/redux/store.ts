import { configureStore} from "@reduxjs/toolkit";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { chefApi } from "./api/chefApi";
import { kitchenReducer } from "./reducer/kitchenReducer";
import { orderApi } from "./api/orderApi";
import { dishApi } from "./api/dishApi";
import { adminApi } from "./api/adminApi";
import { kitchenApi } from "./api/kitchenApi";

export const store = configureStore({
    reducer:{
        [userAPI.reducerPath]:userAPI.reducer,
        [userReducer.name]:userReducer.reducer,
        [chefApi.reducerPath]:chefApi.reducer,
        [kitchenReducer.name]:kitchenReducer.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [dishApi.reducerPath]:dishApi.reducer,
        [adminApi.reducerPath]:adminApi.reducer,
        [kitchenApi.reducerPath]:kitchenApi.reducer
    },
    middleware:(mid)=>mid().concat([userAPI.middleware,chefApi.middleware,orderApi.middleware,dishApi.middleware,adminApi.middleware,kitchenApi.middleware])
})

// middleware:(mid)=>mid().concat([userAPI.middleware,chefApi.middleware,orderApi.middleware,dishApi.middleware])