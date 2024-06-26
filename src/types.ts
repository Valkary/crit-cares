export type UserRole = "admin" | "doctor" | "secretary" | "readonly";

export type User = {
    email: string,
    names: string,
    last_names: string,
    role: UserRole,
    phone: string,
    token: string,
};

export type CreationSuccess = {
    success: true,
    msg: string
};

export type CreationError = {
    success: false,
    error_msg: string
};

export type CreationResult = CreationSuccess | CreationError;

export type FetchSuccess<T> = {
    success: true,
    data: T[]
};

export type FetchResult<T> = FetchSuccess<T> | CreationError;