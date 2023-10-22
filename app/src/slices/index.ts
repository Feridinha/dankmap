export type UpdatePayloadType<T, K extends keyof T> = [K, T[K]]
export type Nullable<T> = T | null
