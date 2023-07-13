import {CommentType} from "./CommentType";

export type ArticleType = {
    id: string,
    title: string,
    text: string,
    subject: {
        name: string,
        id: string
    },
    author: {
        name: string,
        id: string
    },
    date: string,
    comments: CommentType[]
}
