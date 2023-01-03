import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newCharListLoading, setNewCharListLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        onCharListLoading();

        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewCharListLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onCharListLoading = () => {
        setNewCharListLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const renderItems = (charList) => {
        const items = charList.map(item => {
            const {id, thumbnail, name} = item;
            
            let imgStyle = {objectFit: 'cover'};
            if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'fill'};
            }

            return (
                <li 
                    className={id === props.selectedChar ? "char__item char__item_selected" : "char__item"}
                    tabIndex={0}
                    key={id}
                    onClick={() => props.onCharSelected(id)} 
                    onKeyDown={e => {
                        if(e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(id);
                        }
                    }}>
                        <img src={thumbnail} alt={name} style={imgStyle} />
                        <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}
            <button className="button button__main button__long"
                disabled={newCharListLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none' : 'block'}} >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;