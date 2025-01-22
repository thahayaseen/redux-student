import { configureStore } from "@reduxjs/toolkit";
import Userdata from './states/userdata'

export default configureStore({
    reducer:{
        Userdata
    }
})