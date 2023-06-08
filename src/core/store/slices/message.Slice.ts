import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { IMessage } from "../../types/models/IMessage";
import { StatusRequestEnum } from "../../types/enums/StatusRequestEnum";
import { getGpt, getMessages, sendMessages } from "../../utils/Message";

interface initialState {
    data: IMessage[];
    status: StatusRequestEnum;
    error: string | null;
}


const initialState: initialState= {
    data: [],
    status: StatusRequestEnum.IDLE,
    error: null
}

interface messages  {
    uuid: string, 
    content: string
}

export const sendMessage = createAsyncThunk(
    'message/sendMessage',
    async ({uuid, content}: messages) => {
    try {
        const role = 'user'
        const response = await sendMessages(uuid, role , content)
        return(response.data)
    } catch (error) {
        console.log(error)
    }
})

export const getAllMessages = createAsyncThunk(
'message/getAllMessages',
    async (uuid:string) => {
        try {
            console.log(uuid)
            const response = await getMessages(uuid)
            console.log(response.data)
            return(response.data)
        } catch (error) {
            
        }
    }
)


export const getGptAnswer = createAsyncThunk(
    'message/getGptAnswer',
        async (uuid:string) => {
            try {

                const response = await getGpt(uuid)
                console.log(response.data)
                return(response.data)
            } catch (error) {
                
            }
        }
    )

    

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(sendMessage.pending,(state)=>{
            state.status=  StatusRequestEnum.LOADING,
            state.error= null
        })
        .addCase(sendMessage.fulfilled,(state, action)=>{
            state.data = action.payload,
            state.status=  StatusRequestEnum.SUCCESS,
            state.error= null
        })
        .addCase(sendMessage.rejected,(state)=>{

        })
        .addCase(getAllMessages.pending,(state)=>{
            state.status=  StatusRequestEnum.LOADING,
            state.error= null
        })
        .addCase(getAllMessages.fulfilled,(state, action)=>{
            state.data = action.payload,
            state.status=  StatusRequestEnum.SUCCESS,
            state.error= null
        })
        .addCase(getAllMessages.rejected,(state)=>{

        })
        .addCase(getGptAnswer.pending,(state)=>{
            state.status=  StatusRequestEnum.LOADING,
            state.error= null
        })
        .addCase(getGptAnswer.fulfilled,(state, action)=>{
            state.data = action.payload,
            state.status=  StatusRequestEnum.SUCCESS,
            state.error= null
        })
        .addCase(getGptAnswer.rejected,(state)=>{

        })}
})





export const {actions, reducer} = messageSlice;