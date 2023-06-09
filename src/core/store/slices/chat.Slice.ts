import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatusRequestEnum } from "../../types/enums/StatusRequestEnum";
import { IChat } from "../../types/models/IChat";
import { chat, getChats, renameChat } from "../../utils/ApiUtils/Chat";





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
            return response.data
        } catch (error) {
            
        }
})


export const getAllChat = createAsyncThunk(
    'chat/getChat', 
    async function (userUuid: string) {
        try {
            const response = await getChats(userUuid)
            return response.data
        } catch (error) {
            
        }
})

interface name {
    uuid: string, 
    name: string,
    userUuid: string
}

export const changeChatName = createAsyncThunk(
    'chat/changeChatName', 
    async function ({uuid, name, userUuid}: name) {
        try {
            const response = await renameChat(uuid, name, userUuid)
            return response.data
        } catch (error) {
            
        }
})




const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        setCurrentChat(state, action) {
            state.data.currentChatUuid = action.payload
            return state
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createChat.pending,(state: initialState,)=>{
            state.error=null
            state.status=StatusRequestEnum.LOADING
        }).addCase(createChat.fulfilled,(state: initialState, action: PayloadAction<any>)=>{
            state.status=StatusRequestEnum.SUCCESS
            state.data.chat= action.payload
        }).addCase(createChat.rejected,(state: initialState, )=>{
            state.status=StatusRequestEnum.ERROR
        })
        .addCase(getAllChat.pending,(state: initialState, )=>{
            state.error=null
            state.status=StatusRequestEnum.LOADING
        }).addCase(getAllChat.fulfilled,(state: initialState, action: PayloadAction<any>)=>{
            state.status=StatusRequestEnum.SUCCESS
            state.data.chat= action.payload
        }).addCase(getAllChat.rejected,(state: initialState, )=>{
            state.status=StatusRequestEnum.ERROR
        }).addCase(changeChatName.pending,(state: initialState, )=>{
            state.error=null
            state.status=StatusRequestEnum.LOADING
        }).addCase(changeChatName.fulfilled,(state: initialState, action: PayloadAction<any>)=>{
            state.status=StatusRequestEnum.SUCCESS
            state.data.chat= action.payload
        }).addCase(changeChatName.rejected,(state: initialState, )=>{
            state.status=StatusRequestEnum.ERROR
        })}
        
})



export const {actions, reducer} = chatSlice;
