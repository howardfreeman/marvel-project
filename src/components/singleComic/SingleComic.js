import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComic.scss';

const SingleComic = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { process, setProcess, getComic } = useMarvelService();

    useEffect(() => {
        updateComic(comicId);
    }, [comicId]);

    const updateComic = (id) => {
        getComic(id)
            .then(onComicLoaded)
            .then(() => setProcess('success'));
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    return (
        <div className="single-comic">
            {setContent(process, View, comic)}
        </div>
    )
}

const View = ({data}) => {
    const{title, description, thumbnail, pageCount, language, price} = data;
    return (
        <div className="single-comic__grid">
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