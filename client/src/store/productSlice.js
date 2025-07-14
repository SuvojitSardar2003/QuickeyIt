import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    allCategory : [],
    subCategory : [],
    product : []
}

const productSlice = createSlice({
    name : 'product',
    initialState : initialValue,
    reducer : {
        setAllCategory : (state,action)=>{
            console.log("all category redux store",action.payload)
            state.allCategory = [...action.payload]
        }
    }
})

export const { setAllCategory } = productSlice.actions

export default productSlice.reducer