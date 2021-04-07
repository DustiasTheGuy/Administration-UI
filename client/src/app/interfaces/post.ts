import { IMAGE } from './image';

export interface POST {
    id: number;
    body: string;
    title: string;
    category: string;
    created: string;
    archived: number;
    images: IMAGE[];
    thumbnail: number;
    user_id: number;
}