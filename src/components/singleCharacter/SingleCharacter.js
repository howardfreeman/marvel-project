import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from '../../services/MarvelService';

import './singleCharacter.scss';
import xmen from '../../resources/img/x-men.png';

const SingleCharacter = () => {
    const { charId } = useParams();
    const [ char, setChar ] = useState({});
    const { loading, error, getCharacter } = useMarvelService();

    useEffect(() => {
        updateChar(charId);
    }, [charId]);

    const updateChar = (id) => {
        getCharacter(id)
            .then(onCharLoaded);
    }

    const onCharLoaded = (character) => {
        setChar(character);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null; 
    const view = !(loading || error) ? <View char={char} /> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {view}
        </>
    )
}

const View = ({char}) => {
    const { thumbnail, name, description } = char;
    return (
        <div className="single-character">
            <img src={thumbnail} alt={name} className="single-character__thumbnail"/>
            <div className="single-character__info">
                <h1 className="single-character__name">{name}</h1>
                <div className="single-character__descr">{description}</div>
            </div>
        </div>
    )
}

export default SingleCharacter;