import { createSlice } from "@redux.js/toolkit";

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
            state.allCategory = [...action.payload]
        }
    }
})

export const { setAllCategory } = productSlice.actions

export default productSlice.reducer