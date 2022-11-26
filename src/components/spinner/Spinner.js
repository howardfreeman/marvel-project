import spinner from './spinner.gif';
import './spinner.scss';

const Spinner = () => {
    return (
        <img className="spinner" src={spinner} alt="Spinner"  />
    );
}

export default Spinner;