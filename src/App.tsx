import React from 'react';
import './assets/styles/style.scss';
import 'bootstrap/dist/css/bootstrap-grid.css';
import Title from "./components/Title/Title";
import ArticleList from "./components/ArticleList/ArticleList";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className='container'>
            <Title/>
            <ArticleList/>
            <ToastContainer/>
        </div>
    );
}

export default App;
