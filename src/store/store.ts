import {createEvent, createStore} from 'effector';
import {ArticleType} from "../types/ArticleType";
import {CommentType} from "../types/CommentType";

type AuthorAndSubject = {
    id: string,
    name: string
}

type Store = {
    articles: ArticleType[],
    subjects: AuthorAndSubject[],
    authors: AuthorAndSubject[]
}

const addArticle = (article: ArticleType, allArticles: ArticleType[]) => {
    return [...allArticles, article]
}

const onDeleteArticle = (allArticles: ArticleType[], id: string): ArticleType[] => {
    return allArticles.filter(item => item.id !== id)
}

const onEditArticle = (allArticles: ArticleType[], newArticle: ArticleType): ArticleType[] => {
    return allArticles.map(item => {
        if (item.id === newArticle.id) {
            return newArticle
        } else {
            return item
        }
    })
}

const addAuthor = (article: ArticleType, allAuthors: AuthorAndSubject[]): AuthorAndSubject[] => {
    const isMatch = allAuthors.some(item => item.name === article.author.name);
    if(isMatch) {
        return allAuthors
    }else {
        return [...allAuthors, {name: article.author.name, id: article.author.id}]
    }
}

const addSubject = (article: ArticleType, allSubjects: AuthorAndSubject[]): AuthorAndSubject[] => {
    const isMatch = allSubjects.some(item => item.name === article.subject.name);
    if(isMatch) {
        return allSubjects
    }else {
        return [...allSubjects, {name: article.subject.name, id: article.subject.id}]
    }
}

const deleteAuthor = (allAuthors: AuthorAndSubject[], id: string, allArticles: ArticleType[]) => {
    let authorId = '';
    allArticles.forEach(item => {
        if(item.id === id) {
            authorId = item.author.id;
        }
    })
    const count = allArticles.reduce((accumulator, currentValue) => {
        if(currentValue.author.id === authorId) {
            return accumulator + 1;
        }else {
            return accumulator
        }
    }, 0)

    if(count > 1) {
        return allAuthors
    }else {
        return allAuthors.filter(item => item.id !== authorId)
    }
}

const deleteSubject = (allSubjects: AuthorAndSubject[], id: string, allArticles: ArticleType[]) => {
    let subjectId = '';
    allArticles.forEach(item => {
        if(item.id === id) {
            subjectId = item.subject.id;
        }
    })
    const count = allArticles.reduce((accumulator, currentValue) => {
        if(currentValue.subject.id === subjectId) {
            return accumulator + 1;
        }else {
            return accumulator
        }
    }, 0)

    if(count > 1) {
        return allSubjects
    }else {
        return allSubjects.filter(item => item.id !== subjectId)
    }
}

const editAuthor = (newArticle: ArticleType, allAuthors: AuthorAndSubject[]): AuthorAndSubject[] => {
    const authorId = newArticle.author.id;
    return allAuthors.map(item => {
        if(item.id === authorId) {
            return {...item, name: newArticle.author.name}
        }else {
            return item
        }
    })
}

const editSubject = (newArticle: ArticleType, allSubjects: AuthorAndSubject[]): AuthorAndSubject[] => {
    const subjectId = newArticle.subject.id;
    return allSubjects.map(item => {
        if(item.id === subjectId) {
            return {...item, name: newArticle.subject.name}
        }else {
            return item
        }
    })
}

const onAddComment = (articleId: string, allArticles: ArticleType[], comment: CommentType): ArticleType[] => {
    return allArticles.map(item => {
        if(item.id === articleId) {
            return {
                ...item,
                comments: [
                    ...item.comments, comment
                ]
            }
        }else {
            return item
        }
    })
}

export const addNewArticle = createEvent<ArticleType>();
export const deleteArticle = createEvent<string>();
export const editArticle = createEvent<ArticleType>();
export const addComment = createEvent<{articleId: string, comment: CommentType}>();

export default createStore<Store>({
    articles: [],
    authors: [],
    subjects: []
}).on(addNewArticle, (state, newArticle) => ({
    ...state,
    articles: addArticle(newArticle, state.articles),
    authors: addAuthor(newArticle, state.authors),
    subjects: addSubject(newArticle, state.subjects)
})).on(deleteArticle, (state, id) => ({
    ...state,
    articles: onDeleteArticle(state.articles, id),
    authors: deleteAuthor(state.authors, id, state.articles),
    subjects: deleteSubject(state.subjects, id, state.articles)
})).on(editArticle, (state, newArticle) => ({
    ...state,
    articles: onEditArticle(state.articles, newArticle),
    authors: editAuthor(newArticle, state.authors),
    subjects: editSubject(newArticle, state.subjects)
})).on(addComment, (state, obj) => ({
    ...state,
    articles: onAddComment(obj.articleId, state.articles, obj.comment)
}))