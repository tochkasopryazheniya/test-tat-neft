import React, {useState} from 'react';
import {ArticleType} from "../../types/ArticleType";
import Article from "./Article/Article";
import s from './articleList.module.scss';
import AddArticleForm from "../AddArticleForm/AddArticleForm";
import Button from "../SharedComponents/Button/Button";
import $store from '../../store/store'
import {useStore} from "effector-react";
import useInput from "../../hooks/useInput";
import Input from "../SharedComponents/Input/Input";


const filters: { id: number, value: string }[] = [
    {id: 0, value: 'Выберите вид фильтрации'},
    {id: 1, value: 'По автору'},
    {id: 2, value: 'По теме'},
    {id: 3, value: 'По дате'}
]

const ArticleList = () => {
    const store = useStore($store);
    const [isShownModal, setIsShownModal] = useState(false);
    const [modalData, setModalData] = useState<ArticleType | null>(null);

    const [selectedFilter, setSelectedFilter] = useState('0');
    const [selectedAuthor, setSelectedAuthor] = useState('0');
    const [selectedSubject, setSelectedSubject] = useState('0');
    const date = useInput({initialValue: ''});
    const search = useInput({initialValue: ''});

    const renderCertainFilter = () => {
        switch (selectedFilter) {
            case '0':
                return null;
            case '1':
                return (
                    <select onChange={onChangeSelectedAuthor} className={s.select} value={selectedAuthor}>
                        <option value="0">Выберите автора</option>
                        {store.authors.map(item => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </select>
                )
            case '2':
                return (
                    <select onChange={onChangeSelectedSubject} className={s.select} value={selectedSubject}>
                        <option value="0">Выберите тему</option>
                        {store.subjects.map(item => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })}
                    </select>
                )
            case '3':
                return (
                    <div className={s.inputFilter}>
                        <Input value={date.value} onChange={date.onChange} placeholder='Введите дату' type='date'/>
                    </div>
                )
        }
    }

    const filterItems = (item: ArticleType) => {
        const isMatchTitleOrSubject = item.title.toLowerCase().includes(search.value.toLowerCase()) || item.subject.name.toLowerCase().includes(search.value.toLowerCase());

        if (selectedFilter === '1' && selectedAuthor !== '0') {
            const authorName = store.authors.filter(item => item.id === selectedAuthor)[0].name;
            return item.author.name === authorName && isMatchTitleOrSubject
        } else if (selectedFilter === '2' && selectedSubject !== '0') {
            const subjectName = store.subjects.filter(item => item.id === selectedSubject)[0].name;
            return item.subject.name === subjectName && isMatchTitleOrSubject
        } else if (selectedFilter === '3') {
            return item.date.includes(date.value) && isMatchTitleOrSubject
        } else {
            return item && isMatchTitleOrSubject
        }


    }

    const onEdit = (data: ArticleType | null) => {
        setIsShownModal(true)
        setModalData(data);
    }

    const onAddNewArticle = () => {
        setIsShownModal(true)
        setModalData(null)
    }

    const onHideModal = () => {
        setIsShownModal(false);
    }

    const onChangeSelectedFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilter(e.target.value);
    }
    const onChangeSelectedAuthor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAuthor(e.target.value);
    }

    const onChangeSelectedSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubject(e.target.value);
    }


    return (
        <>
            {isShownModal ? <AddArticleForm shown={isShownModal} onHide={onHideModal} data={modalData}/> : null}
            <div className={s.btn}>
                <Button onClick={onAddNewArticle}>Добавить новую статью</Button>
            </div>
            <div className={s.filterBlock}>
                <select onChange={onChangeSelectedFilter} className={s.select} value={selectedFilter}>
                    {filters.map(item => {
                        return <option key={item.id} value={item.id}>{item.value}</option>
                    })}
                </select>
                {renderCertainFilter()}
            </div>
            <div className={s.searchBlock}>
                <Input value={search.value} onChange={search.onChange} placeholder='Введите название или тему статьи' type='text'/>
            </div>
            <div className={s.articles}>
                {store.articles.length ? (
                    store.articles.filter(filterItems).map(article => {
                        return <Article onEdit={onEdit} key={article.id} data={article}/>
                    })
                ) : (
                    <h1 className={s.title}>Статьи отсутствуют</h1>
                )}
            </div>
        </>
    );
};

export default ArticleList;