import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/models/IUser";
import { login, logout, registration } from "../../utils/Auth";
import { StatusRequestEnum } from "../../types/enums/StatusRequestEnum";
import axios from "axios";
import { AuthResponse } from "../../types/models/response/AuthResoinse";
import { API_URL } from "../../http";

interface authInfo {
    user: IUser,
    isAuth: boolean
}

interface initialState {
    authInfo: authInfo,
    status: StatusRequestEnum,
    error: {} | null
}

interface authData {
    email: string, password: string
}

const initialState:initialState = {
    authInfo: {user: {
                email: null,
                isActivated: null,
                id: null
                },
                isAuth: false},
    status: StatusRequestEnum.IDLE,
    error: null
}



export const handleLogin = createAsyncThunk(
    'user/handleLogin',
    async function ({email, password}: authData,  { rejectWithValue }) {
        try {
            const response = await login(email, password)
            localStorage.setItem('token', response.data.accsessToken)
            return response.data.user
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const handleRegister = createAsyncThunk(
    'user/handleRegister',
    async function ({email, password}: authData,  { rejectWithValue }) {
        try {
            const response = await registration(email, password)
            localStorage.setItem('token', response.data.accsessToken)
            return response.data.user
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const handleLogout = createAsyncThunk(
    'user/handleLogout',
    async function (_,{ rejectWithValue }) {
        try {
            const response = await logout()
            localStorage.removeItem('token')
            
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async function (_,{ rejectWithValue }) {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accsessToken)
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.message)
    }

  }
)


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(handleLogin.pending, handleActionPending)
        .addCase(handleRegister.pending, handleActionPending)
        .addCase(checkAuth.pending, handleActionPending)
        .addCase(handleLogout.pending, (state) => {
          state.status = StatusRequestEnum.LOADING;
          state.error = null;
          state.authInfo = {} as authInfo;
        })
        .addCase(handleLogin.fulfilled, handleActionFulfilled)
        .addCase(handleRegister.fulfilled, handleActionFulfilled)
        .addCase(checkAuth.fulfilled, handleActionFulfilled)
        .addCase(handleLogout.fulfilled, (state) => {
          state.status = StatusRequestEnum.SUCCESS;
          state.error = null;
          state.authInfo = {} as authInfo;
        })
        // .addDefaultCase((state, action) => {
        //   state.status = StatusRequestEnum.ERROR;
        //   state.error = action.error?.message || "unknown error";
        //   state.authInfo = {} as authInfo;
        // })
          // .addCase(handleLogin.pending, (state) => {
          //   state.status = StatusRequestEnum.LOADING;
          //   state.error = null;
          // })
          // .addCase(handleLogin.fulfilled, (state, action) => {
          //   state.status = StatusRequestEnum.SUCCESS;
          //   state.error = null;
          //   state.authInfo.user = action.payload;
          //   state.authInfo.isAuth = true;
          // })
          .addCase(handleLogin.rejected, (state, action) => {
            state.status = StatusRequestEnum.ERROR;
            console.log(action.payload)
            // state.error = action.payload || "unknown error";
            state.error = "unknown error";
          })
          // .addCase(handleRegister.pending, (state) => {
          //   state.status = StatusRequestEnum.LOADING;
          //   state.error = null;
          // })
          // .addCase(handleRegister.fulfilled, (state, action) => {
          //   state.status = StatusRequestEnum.SUCCESS;
          //   state.error = null;
          //   state.authInfo.user = action.payload;
          //   state.authInfo.isAuth = true;
          // })
          .addCase(handleRegister.rejected, (state, action) => {
            state.status = StatusRequestEnum.ERROR;
            console.log(action.payload)
            state.error = "unknown error";
          })
          // .addCase(handleLogout.pending, (state) => {
          //   state.status = StatusRequestEnum.LOADING;
          //   state.error = null;
          //   state.authInfo = {} as authInfo;
          // })
          // .addCase(handleLogout.fulfilled, (state) => {
          //   state.status = StatusRequestEnum.SUCCESS;
          //   state.error = null;
          //   state.authInfo = {} as authInfo;
          // })
          .addCase(handleLogout.rejected, (state, action) => {
            state.status = StatusRequestEnum.ERROR;
            console.log(action.payload)
            state.error = "unknown error";
            state.authInfo = {} as authInfo;
          })
          // .addCase(checkAuth.pending, (state) => {
          //   state.status = StatusRequestEnum.LOADING;
          //   state.error = null;
          // })
          // .addCase(checkAuth.fulfilled, (state, action) => {
          //   state.status = StatusRequestEnum.SUCCESS;
          //   state.error = null;
          //   state.authInfo.user = action.payload;
          //   state.authInfo.isAuth = true;
          // })
          .addCase(checkAuth.rejected, (state, action) => {
            state.status = StatusRequestEnum.ERROR;
            state.error = "unknown error";
          });
      }
})

const handleActionPending = (state) =>{
  state.status = StatusRequestEnum.LOADING;
  state.error = null;
}

const handleActionFulfilled = (state, action) => {
  state.status = StatusRequestEnum.SUCCESS;
  state.error = null;
  state.authInfo.user = action.payload;
  state.authInfo.isAuth = true;
}



export const {actions, reducer} = userSlice;
