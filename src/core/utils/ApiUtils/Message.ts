import { AxiosResponse } from "axios"
import api from "../../http"
import { IMessage } from "../../types/models/IMessage"

export const sendMessages = async (uuid: string,role: string, content: string): Promise<AxiosResponse<IMessage[]>> =>{
    return api.post<IMessage[]>('/sendMessage', {uuid, role, content})
}

export const getMessages = async (uuid: string): Promise<AxiosResponse<IMessage[]>> =>{
    return api.post<IMessage[]>('/getAllMessages', {uuid})
}


export const getGpt = async (uuid: string): Promise<AxiosResponse<IMessage[]>> =>{
    return api.post<IMessage[]>('/getGptAnswer', {uuid})
}