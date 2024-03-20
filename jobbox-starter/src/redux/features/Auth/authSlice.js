import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email:"",
    role:"",
    isLoading:false,
    isError:false,
    error:"",
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset:(state)=>{
            state.email="";
            state.role="";
            state.isLoading=false;
            state.isError=false;
            state.error="";
        }
    }
})

export default authSlice.reducer