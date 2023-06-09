import { AxiosResponse } from "axios"
import api from "../../http"
import { IChat } from "../../types/models/IChat"


export const chat = async (userUuid: string): Promise<AxiosResponse<IChat>> =>{
    return api.post<IChat>('/createChat', {userUuid})
}

export const getChats = async (userUuid: string): Promise<AxiosResponse<IChat>> =>{
    return api.post<IChat>('/getChat', {userUuid})
}

export const renameChat = async (uuid: string, name: string, userUuid:string): Promise<AxiosResponse<IChat>> =>{
    return api.post<IChat>('/renameChat', {uuid, name, userUuid})
}
