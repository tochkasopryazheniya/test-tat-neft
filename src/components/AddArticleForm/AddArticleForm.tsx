import React from 'react';
import s from './addArticleForm.module.scss';
import {GrClose} from "react-icons/gr";
import {ArticleType} from "../../types/ArticleType";
import Input from "../SharedComponents/Input/Input";
import useInput from "../../hooks/useInput";
import Textarea from "../SharedComponents/Textarea/Textarea";
import useTextarea from "../../hooks/useTextarea";
import Button from "../SharedComponents/Button/Button";
import {addNewArticle, editArticle} from '../../store/store';
import {v4} from 'uuid';
import {showError, showSuccess} from "../../utils/notifications";

type AddArticleFormType = {
    onHide: () => void,
    data: ArticleType | null
}

const AddArticleForm = ({onHide, data}: AddArticleFormType) => {
    const title = useInput({initialValue: data ? data.title : ''});
    const subject = useInput({initialValue: data ? data.subject.name : ''});
    const date = useInput({initialValue: data ? data.date : ''});
    const author = useInput({initialValue: data ? data.author.name : ''});
    const text = useTextarea({initialValue: data ? data.text : ''});

    const onAddArticle = () => {
        if(!title.value) {
            showError('Поле название статьи обязательно для заполенения');
            return;
        }
        if(!subject.value) {
            showError('Поле тема статьи обязательно для заполенения');
            return;
        }
        if(!author.value) {
            showError('Поле автор статьи обязательно для заполенения');
            return;
        }
        if(!date.value) {
            showError('Поле дата статьи обязательно для заполенения');
            return;
        }

        if(!text.value) {
            showError('Поле текст статьи обязательно для заполенения');
            return;
        }
        if (data) {
            editArticle({
                    ...data,
                    title: title.value,
                    text: text.value,
                    subject: {...data.subject, name: subject.value},
                    author: {...data.author, name: author.value},
                    date: date.value
                }
            )
            showSuccess('Статья успешно отредактирована');
        } else {
            addNewArticle({
                    id: v4(),
                    title: title.value,
                    text: text.value,
                    subject: {name: subject.value, id: v4()},
                    author: {name: author.value, id: v4()},
                    date: date.value,
                    comments: []
                }
            )

            showSuccess('Статья успешно добавлена');
        }

        onHide();
    }


    return (
        <div className={`${s.modal}`}>
            <div className={s.form}>
                <GrClose onClick={onHide} className={s.icon} size={30}/>
                <div className={s.title}>{data ? 'Редактировать статью' : 'Создать статью'}</div>
                <div className={s.input}>
                    <Input value={title.value} onChange={title.onChange} placeholder='Введите название статьи'
                           type='text'/>
                </div>
                <div className={s.input}>
                    <Input value={subject.value} onChange={subject.onChange} placeholder='Введите тему статьи'
                           type='text'/>
                </div>
                <div className={s.input}>
                    <Input value={author.value} onChange={author.onChange} placeholder='Введите автора статьи'
                           type='text'/>
                </div>
                <div className={s.input}>
                    <Input value={date.value} onChange={date.onChange} placeholder='Введите дату статьи' type='date'/>
                </div>
                <div className={s.textarea}>
                    <Textarea value={text.value} onChange={text.onChange} placeholder='Введите текст статьи'/>
                </div>

                <Button onClick={onAddArticle}>Сохранить</Button>
            </div>
        </div>
    );
};

export default AddArticleForm;