

export interface ShortPostResponseDto {
    _id: string
    title: string,
    description: string,
    date: string,
    views: number,
    likes: number,
    dislikes: number,
    authorId: string,
    authorName: string
}

export interface DetailedPostResponseDto extends ShortPostResponseDto {
    content: string;
}

export interface Post {
    _id: string
    title: string,
    description: string,
    date: string,
    views: number,
    likes: number,
    dislikes: number,
    authorId: string,
    authorName: string
    content: string;
}