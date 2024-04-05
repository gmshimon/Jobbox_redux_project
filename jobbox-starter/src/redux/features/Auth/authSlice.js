import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword,GoogleAuthProvider,signInWithEmailAndPassword, signInWithPopup  } from "firebase/auth";
import auth from '../../../firebase/firebase.config';

const initialState = {
    user:{
        email:"",
    role:"",
    },
    isLoading:false,
    isError:false,
    isCreateUserSuccess:false,
    isLoginUserSuccess:false,
    isGoogleLoginSuccess:false,
    error:"",
}

export const createUser = createAsyncThunk("createUser", async({email,password})=>{
    const data = await createUserWithEmailAndPassword(auth,email,password)

    return data.user.email
})

export const fetchUser = createAsyncThunk("fetchUser", async(email)=>{
    const res = await fetch(`${process.env.REACT_APP_DEV}user/${email}`)
    const data = await res.json()
    return data.data
})

export const loginUser = createAsyncThunk("loginUser", async({email,password})=>{
    const data = await signInWithEmailAndPassword(auth,email,password)
    console.log(data.user.email)
    return data.user.email
})
export const googleLogin = createAsyncThunk("googleLogin", async()=>{
    const googleProvider = new GoogleAuthProvider()
    const data = await signInWithPopup(auth,googleProvider)
    return data.user.email
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset:(state)=>{
            state.user.email="";
            state.role="";
            state.isLoading=false;
            state.isError=false;
            state.error="";
        },
        logOut:(state)=>{
            state.user.email="";
        },
        setUser:(state,action)=>{
            state.user.email = action.payload;
            state.isLoading=false;
        },
        toggleLoading:(state)=>{
            state.isLoading=false
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
                state.user.email=action.payload;
                state.error="";
            })
            .addCase(createUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isCreateUserSuccess=false;
                state.error=action.error.message;
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
                state.user.email=action.payload
                state.error="";
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isLoginUserSuccess=false;
                state.error=action.error.message;
            })
            .addCase(googleLogin.pending,(state)=>{
                state.isLoading=true;
                state.isError=false;
                state.isLoginUserSuccess=false;
                state.error="";
            })
            .addCase(googleLogin.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isLoginUserSuccess=true;
                state.user.email=action.payload
                state.error="";
            })
            .addCase(googleLogin.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isLoginUserSuccess=false;
                state.error=action.error.message
            })
            .addCase(fetchUser.pending,(state)=>{
                state.isLoading=true;
                state.isError=false;
                state.isLoginUserSuccess=false;
                state.error="";
            })
            .addCase(fetchUser.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isLoginUserSuccess=true;
                state.user=action.payload
                state.error="";
            })
            .addCase(fetchUser.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isLoginUserSuccess=false;
                state.error=action.error.message
            })

        }
    
})
export const {reset,logOut,setUser,toggleLoading} = authSlice.actions
export default authSlice.reducer
