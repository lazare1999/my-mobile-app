import { configureStore } from "@reduxjs/toolkit";
import  functions  from "./localstore/localstore";



const store=configureStore({

    reducer:{

        functions
    }

})

export default store