import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import useMarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null);
    const {loading, error, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        if(!charId) {
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded);
    }

    const onCharLoaded = (character) => {
        setChar(character);
    }

    const skeleton = loading || error || char ? null : <Skeleton/>;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const view = !(loading || error) && char ? <View character={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {view}
        </div>
    )
}

const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = character;
    
    let imgStyle = {objectFit: 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'fill'};
    }
    
    const comicsSlice = comics.slice(0, 10);

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length ? null : 'There is no comics for this character'}
                {
                    comicsSlice.map((item, i) => {
                        return (
                            <li className="char__comics-item"
                                key={i} >
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;