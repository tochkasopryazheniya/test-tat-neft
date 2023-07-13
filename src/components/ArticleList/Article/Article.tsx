import React from 'react';
import {ArticleType} from "../../../types/ArticleType";
import s from './article.module.scss';
import Button from "../../SharedComponents/Button/Button";
import {deleteArticle} from "../../../store/store";
import Comments from "./Comments/Comments";
import {showSuccess} from "../../../utils/notifications";

type ArticleProps = {
    data: ArticleType,
    onEdit: (data: ArticleType | null) => void
}

const Article = ({data, onEdit}: ArticleProps) => {
    const onEditArticle = () => {
        onEdit(data);
    }

    const onDeleteArticle = () => {
        deleteArticle(data.id);
        showSuccess('Статья успешно удалена');
    }
    return (
        <div className={s.article}>
            <div className={s.btns}>
                <Button onClick={onEditArticle}>Редактировать</Button>
                <Button red onClick={onDeleteArticle}>Удалить</Button>
            </div>
            <div className={s.title}>{data.title}</div>
            <div className={s.text}>{data.text}</div>
            <div className={s.author}><span>Тема: </span>{data.subject.name}</div>
            <div className={s.author}><span>Автор: </span>{data.author.name}</div>
            <div className={s.date}><span>Дата: </span>{new Date(data.date).toLocaleDateString('ru')}</div>
            <Comments article={data}/>
        </div>
    );
};

export default Article;