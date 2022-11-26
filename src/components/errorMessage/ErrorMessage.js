import './errorMessage.scss';
import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img className="error" src={img} alt="Error" />
    )
}

export default ErrorMessage;