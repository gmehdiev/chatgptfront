import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatusRequestEnum } from "../../types/enums/StatusRequestEnum";
import { IChat } from "../../types/models/IChat";
import { chat, getChats } from "../../utils/Chat";





interface initialState {
    data: {chat: IChat[], currentChatUuid: string}
    
    status: StatusRequestEnum;
    error: string | null;
}


const initialState: initialState= {
    data: {chat: [], currentChatUuid: ''},
    status: StatusRequestEnum.IDLE,
    error: null
}

export const createChat = createAsyncThunk(
    'chat/createChat', 
    async function (userUuid: string) {
        try {
            const response = await chat(userUuid)
            console.log(response.data)
            return response.data
        } catch (error) {
            
        }
})


export const getChat = createAsyncThunk(
    'chat/getChat', 
    async function (userUuid: string) {
        try {
            console.log('asdasdasdasdasd')
            const response = await getChats(userUuid)
            console.log(response.data)
            return response.data
        } catch (error) {
            
        }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(createChat.pending,(state: initialState, action: PayloadAction<any>)=>{
            state.error=null
            state.status=StatusRequestEnum.LOADING
        }).addCase(createChat.fulfilled,(state: initialState, action: PayloadAction<any>)=>{
            state.status=StatusRequestEnum.SUCCESS
            state.data.chat= action.payload
        }).addCase(createChat.rejected,(state: initialState, action: PayloadAction<any>)=>{
            state.status=StatusRequestEnum.ERROR
        })
        .addCase(getChat.pending,(state: initialState, action: PayloadAction<any>)=>{
            state.error=null
            console.log('action.payload')
            state.status=StatusRequestEnum.LOADING
        }).addCase(getChat.fulfilled,(state: initialState, action: PayloadAction<any>)=>{
            state.status=StatusRequestEnum.SUCCESS
            console.log(action.payload)
            state.data.chat= action.payload
        }).addCase(getChat.rejected,(state: initialState, action: PayloadAction<any>)=>{
            state.status=StatusRequestEnum.ERROR
        })}
})



export const {actions, reducer} = chatSlice;
