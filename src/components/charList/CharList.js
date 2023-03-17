import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const setContent = (process, Component, newCharListLoading) => {
    switch(process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newCharListLoading ? <Component/> : <Spinner/>;
        case 'success':
            return <Component/>;
        case 'failure':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newCharListLoading, setNewCharListLoading] = useState(false);
    const [offset, setOffset] = useState(200);
    const [charEnded, setCharEnded] = useState(false);
    const {process, setProcess, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewCharListLoading(false) : setNewCharListLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('success'));
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewCharListLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
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

    const content = useMemo(() => {
        return setContent(process, () => renderItems(charList), newCharListLoading);
        // eslint-disable-next-line
    }, [process]);

    return (
        <div className="char__list">
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