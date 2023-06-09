import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/models/IUser";
import { login, logout, registration } from "../../utils/ApiUtils/Auth";
import { StatusRequestEnum } from "../../types/enums/StatusRequestEnum";
import axios from "axios";
import { AuthResponse } from "../../types/models/response/AuthResponse";
import { API_URL } from "../../http";

interface authInfo {
    user: IUser,
    isAuth: boolean | undefined
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
                isAuth: undefined},
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
        } catch (error: any ) {
          console.log(error)
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
        } catch (error: any ) {
            return rejectWithValue(error.message)
        }
    }
)

export const handleLogout = createAsyncThunk(
    'user/handleLogout',
    async function (_,{ rejectWithValue }) {
        try {
            await logout()
            localStorage.removeItem('token')
            
        } catch (error: any ) {
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
    } catch (error: any ) {
      return rejectWithValue(error?.message)
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
        .addCase(handleLogout.pending, handleActionPending)
        .addCase(handleLogin.fulfilled, handleActionFulfilled)
        .addCase(handleRegister.fulfilled, handleActionFulfilled)
        .addCase(checkAuth.fulfilled, handleActionFulfilled)
        .addCase(handleLogout.fulfilled, (state) => {
          state.status = StatusRequestEnum.SUCCESS;
          state.error = null;
          state.authInfo = {} as authInfo;
        })
        .addCase(handleLogin.rejected, handleActionRejected)
        .addCase(handleRegister.rejected, handleActionRejected)
        .addCase(checkAuth.rejected, handleActionRejected)
        .addCase(handleLogout.rejected, handleActionRejected)
      }
})

const handleActionPending = (state: initialState) =>{
  state.status = StatusRequestEnum.LOADING;
  state.error = null;
}

const handleActionFulfilled = (state: initialState, action: PayloadAction<IUser>) => {
  state.status = StatusRequestEnum.SUCCESS;
  state.error = null;
  state.authInfo.user = action.payload;
  state.authInfo.isAuth = true;
}

const handleActionRejected= (state: initialState, action: PayloadAction<any>) => {
  state.status = StatusRequestEnum.ERROR;
  state.error = action.payload;
  state.authInfo.isAuth= false
}



export const {actions, reducer} = userSlice;
