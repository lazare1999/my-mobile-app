import { createSlice } from "@reduxjs/toolkit";


const initialState={

    // აქ აღიწერება ცვლადები და მათი თავდაპირველი მნიშვნელობები

    productForCart:[],
    lang:'GE'

}

export const functions=createSlice({

        name:"MyLocalStore",
        initialState,
        reducers:{


            setProductForCart:(state,action)=>{

                    state.productForCart=action.payload


            },
            setLang:(state,action)=>{
                state.lang=action.payload

            }

                //აქ აღიწერება სეთერები



        }






})


export const {
    setProductForCart,
    setLang
    // action-ის სახელწოდება


}=functions.actions



export const getProductforCart=(state) => state.functions.productForCart

export const getLang=(state)=>state.functions.lang


export default functions.reducer