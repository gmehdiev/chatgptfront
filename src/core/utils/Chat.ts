import { AxiosResponse } from "axios"
import api from "../http"
import { IChat } from "../types/models/IChat"


export const chat = async (userUuid: string): Promise<AxiosResponse<IChat>> =>{
    return api.post('/createChat', {userUuid})
}

export const getChats = async (userUuid: string): Promise<AxiosResponse<IChat>> =>{
    return api.post('/getChat', {userUuid})
}
