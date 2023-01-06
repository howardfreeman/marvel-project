import { Link, NavLink } from 'react-router-dom';

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="marvel-project/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                        to="marvel-project/"
                        style={({isActive}) => ({color: isActive ? '#9F0013' : null})} 
                        end >Characters</NavLink></li>
                    /
                    <li><NavLink 
                        to="marvel-project/comics/"
                        style={({isActive}) => ({color: isActive ? '#9F0013' : null})} >Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;