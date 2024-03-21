import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from '../../../firebase/firebase.config';

const initialState = {
    email:"",
    role:"",
    isLoading:false,
    isError:false,
    isCreateUserSuccess:false,
    error:"",
}

export const createUser = createAsyncThunk("createUser", async({email,password})=>{
    const data = await createUserWithEmailAndPassword(auth,email,password)

    return data
})

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
        },
        extraReducers:(builder)=>{
            builder
            .addCase(createUser.pending,(state)=>{
                state.isLoading=true;
                state.isError=false;
                state.isCreateUserSuccess=false;
                state.error="";
            })
            .addCase(createUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isCreateUserSuccess=true;
                state.email=action;
                state.error="";
            })
            .addCase(createUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isCreateUserSuccess=false;
                state.error="";
            })

        }
    }
})

export default authSlice.reducer
