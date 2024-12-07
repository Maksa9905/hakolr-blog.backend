export type WithPagination<T, Multitle extends boolean = true> = {
    data: Multitle extends true ? T[] : T,
    total: number,
    page: number,
    limit: number
}

export type WithParams<T> = T & { page: string, limit: string }

export type WithId<T> = T & { _id: string }

export type WithVersion<T> = T & { __v: number }

export type MongoDocument<T> = WithId<WithVersion<T>>

export type ResponseFormat<T, Multitle extends boolean = true> = WithPagination<MongoDocument<T>, Multitle>
