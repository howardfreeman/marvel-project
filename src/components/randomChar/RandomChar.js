import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage'
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, []);

    const onCharLoaded = (character) => {
        setChar(character);
    }

    const updateCharacter = () => {
        clearError();
        
        const id = Math.floor(Math.random() * (1011334 - 1010914) + 1010914);

        getCharacter(id)
            .then(onCharLoaded);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const view = !(loading || error) ? <View character={char} /> : null;

    return (
        <div className="randomchar">
            {spinner}
            {errorMessage}
            {view}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner"
                            onClick={updateCharacter} >try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki} = character;

    let imgStyle = {objectFit: 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'fill'};
    }

    return (
        <div className="randomchar__block">
            <img className="randomchar__img" src={thumbnail} alt="Random character" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? `${description.slice(0, 210)}...` : null}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;