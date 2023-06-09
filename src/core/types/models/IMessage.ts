export type IMessage = {
    uuid: string
    role: string
    content: string
    createdAt: Date
    updatedAt: Date
    chatUuid: string | null
}

