import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";
import auth from '../../../firebase/firebase.config';

const initialState = {
    email:"",
    role:"",
    isLoading:false,
    isError:false,
    isCreateUserSuccess:false,
    isLoginUserSuccess:false,
    error:"",
}

export const createUser = createAsyncThunk("createUser", async({email,password})=>{
    const data = await createUserWithEmailAndPassword(auth,email,password)

    return data.user.email
})
export const loginUser = createAsyncThunk("loginUser", async({email,password})=>{
    const data = await signInWithEmailAndPassword(auth,email,password)
    console.log(data.user.email)
    return data.user.email
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
        logOut:(state)=>{
            state.email="";
        }
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
                state.email=action.payload;
                state.error="";
            })
            .addCase(createUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isCreateUserSuccess=false;
                state.error="";
            })
            .addCase(loginUser.pending,(state)=>{
                state.isLoading=true;
                state.isError=false;
                state.isLoginUserSuccess=false;
                state.error="";
            })
            .addCase(loginUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isLoginUserSuccess=true;
                state.email=action.payload
                state.error="";
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isLoginUserSuccess=false;
                state.error="";
            })

        }
    
})
export const {reset,logOut} = authSlice.actions
export default authSlice.reducer
