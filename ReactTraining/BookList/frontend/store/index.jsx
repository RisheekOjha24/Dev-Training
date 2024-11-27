import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userDetails";
import cartSlice from "./cartDetails"

    const store= configureStore({
        reducer:{
            userData:userSlice,
            cartData:cartSlice
        }
    })

export default store;