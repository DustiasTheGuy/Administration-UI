export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface PublishData {
    title: string;
    category: string;
    thumbnail: number;
    body: string;
}

export interface UpdatePostData {
    id: number;
    title: string;
    body: string;
    category: string;
    archived: number;
    thumbnail: number;
}