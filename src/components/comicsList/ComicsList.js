import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const setContent = (process, Component, newComicsListLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newComicsListLoading ? <Component/> : <Spinner/>;
        case 'success':
            return <Component/>;
        case 'failure':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(200);
    const [newComicsListLoading, setNewComicsListLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    const {process, setProcess, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewComicsListLoading(false) : setNewComicsListLoading(true);

        getAllComics(offset)
            .then(onLoaded)
            .then(() => setProcess('success'));
    }

    const onLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewComicsListLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const renderItems = (comicsList) => {
        const items = comicsList.map((item, i) => {
            const {id, thumbnail, title, price} = item;

            let imgStyle = {objectFit: 'cover'};
            if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'fill'};
            }

            return (
                <li className="comics__item" key={i} >
                    <Link to={id + '/'} >
                        <img src={thumbnail} alt={title} style={imgStyle} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price ? `${price}$` : 'NOT AVAILABLE'}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comicsList), newComicsListLoading)}

            <button 
                onClick={() => onRequest(offset)}
                className="button button__main button__long"
                disabled={newComicsListLoading}
                style={{display: comicsEnded ? 'none' : 'block'}} >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;