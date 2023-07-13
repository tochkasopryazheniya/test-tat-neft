import React from 'react';
import s from './commentItem.module.scss';
import {BiSolidUserCircle} from 'react-icons/bi'
import {CommentType} from "../../../../../types/CommentType";

type CommentItemProps = {
    data: CommentType
}

const CommentItem = ({data}: CommentItemProps) => {
    return (
        <div className={s.item}>
            <BiSolidUserCircle size={34}/>
            <div className={s.info}>
                <div className={s.name}>{data.author}</div>
                <div className={s.text}>{data.text}</div>
                <div className={s.date}>{data.date}</div>
            </div>
        </div>
    );
};

export default CommentItem;