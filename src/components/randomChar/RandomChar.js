import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    constructor(props) {
        super(props);
        this.updateCharacter();
    }

    state = {
        character: {}
    }

    marvelService = new MarvelService();

    onCharLoaded = (character) => {
        this.setState({character})
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * (1011334 - 1010914) + 1010914);
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded);
    }
    
    render() {
        const {character: {name, description, thumbnail, homepage, wiki}} = this.state;

        let descr = description;
        if(!descr?.length) {
            descr = `${name}'s description is unknown`;
        }
        if(descr?.length > 228) {
            descr = `${descr?.slice(0, 228)}...`;
        }

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {descr}
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
                             onClick={this.updateCharacter} >try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;