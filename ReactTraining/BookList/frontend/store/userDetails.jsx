import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userDetails",
  initialState: {
      username: localStorage.getItem('username') || '', // Check localStorage
      useremail: localStorage.getItem('useremail') || '', 
  },
  reducers: {
    userData:(state,action)=>{
        state.username=action.payload.username;
        state.useremail=action.payload.useremail;
        console.log("Printing forom state");
        console.log(state.username);
        console.log(state.useremail);
    },
  },
});

export const {userData} = userSlice.actions;
export default userSlice.reducer;