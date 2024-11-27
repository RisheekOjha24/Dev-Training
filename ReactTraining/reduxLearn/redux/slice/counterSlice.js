import {createSlice} from "@reduxjs/toolkit";

const initialState={
    counterVal:0,
    text:"Welcome"
}

const counterSlice=createSlice({
    name:"count",
    initialState,
    reducers:{
        inc:(state,action)=>{
            state.counterVal=state.counterVal+1
        },
        dec:(states,action)=>{
            if(states.counterVal>0)
            states.counterVal=states.counterVal-1
            else return
        },
        chgText:(state,action)=>{
            state.text=action.payload;
        }
    }
    
})

export const {inc,dec,chgText} = counterSlice.actions;
export default counterSlice.reducer;
