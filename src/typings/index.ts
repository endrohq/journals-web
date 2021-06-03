export type ForgerModel = {
    address: string
    username: string
    isConsensusParticipant: boolean
    minActiveHeight: number
    nextForgingTime: number
    totalVotesReceived: string
}

export interface ApiResponse<T> {
    data: T
    meta?: {
        count: number
        offset: number
        total: number
    }
}
