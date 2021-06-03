export interface ApiResponse<T> {
    data: T
    meta?: {
        count: number
        offset: number
        total: number
    }
}

export interface ApiMethods {
    get<T>(options: any): Promise<ApiResponse<T>>
    post<T>(options: any): any
}

export interface RequestOptions {
    url: string
    body: any
    headers: {
        [key: string]: string
    }
}
