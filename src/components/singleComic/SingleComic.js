import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import useMarvelService from '../../services/MarvelService';

import './singleComic.scss';

const SingleComic = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [comicId]);

    const updateChar = () => {
        getComic(comicId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (comic) => {
        setComic(comic);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const view = !(loading || error) && comic ? <View comic={comic} /> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {view}
        </>
    )
}

const View = ({comic}) => {
    const{title, description, thumbnail, pageCount, language, price} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/marvel-project/comics/" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;