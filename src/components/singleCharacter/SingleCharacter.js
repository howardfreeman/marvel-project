import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleCharacter.scss';

const SingleCharacter = () => {
    const { charId } = useParams();
    const [ char, setChar ] = useState({});
    const { process, setProcess, getCharacter } = useMarvelService();

    useEffect(() => {
        updateChar(charId);
        // eslint-disable-next-line
    }, [charId]);

    const updateChar = (id) => {
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('success'));
    }

    const onCharLoaded = (character) => {
        setChar(character);
    }

    return (
        <div className="single-character">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const { thumbnail, name, description } = data;
    return (
        <div className="single-character__grid">
            <img src={thumbnail} alt={name} className="single-character__thumbnail"/>
            <div className="single-character__info">
                <h1 className="single-character__name">{name}</h1>
                <div className="single-character__descr">{description}</div>
            </div>
        </div>
    )
}

export default SingleCharacter;