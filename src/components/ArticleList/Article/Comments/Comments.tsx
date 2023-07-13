import React from 'react';
import s from './comments.module.scss';
import Input from "../../../SharedComponents/Input/Input";
import useInput from "../../../../hooks/useInput";
import Button from "../../../SharedComponents/Button/Button";
import CommentItem from "./CommentItem/CommentItem";
import {addComment} from '../../../../store/store';
import {ArticleType} from "../../../../types/ArticleType";
import {v4} from "uuid";

type CommentsProps = {
    article: ArticleType
}

const Comments = ({article}: CommentsProps) => {
    // const store = useStore($store);
    const commentInput = useInput({initialValue: ''});

    const onAddComment = () => {
        const newComment = {
            articleId: article.id,
            comment: {
                id: v4(),
                author: 'Guest User',
                text: commentInput.value,
                date: new Date().toLocaleString('ru')
            }
        }
        addComment(newComment);
        commentInput.reset();
    }
    return (
        <div className={s.comments}>
            <div>
                {article.comments.map(item => {
                    return <CommentItem data={item} key={item.id}/>
                })}
            </div>
            <div className={s.sendBlock}>
                <div className={s.input}>
                    <Input value={commentInput.value} onChange={commentInput.onChange} placeholder='Написать комментарий' type='text'/>
                </div>
                <Button disabled={!commentInput.value} onClick={onAddComment}>Отправить</Button>
            </div>
        </div>
    );
};

export default Comments;