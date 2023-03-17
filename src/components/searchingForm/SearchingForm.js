import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';

import './searchingForm.scss';

const SearchingForm = () => {
    const [char, setChar] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [found, setFound] = useState(false);
    const {process, setProcess, getCharacterByName} = useMarvelService();

    const findChar = (name) => {

        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('success'));
    }

    const onCharLoaded = (character) => {
        if(Object.keys(character).length) {
            setChar(character);
            setNotFound(false);
            setFound(true);
        } else {
            setNotFound(true);
            setFound(false);
        }
    }

    const toPage = found ? <Found char={char} /> : null;

    return (
        <Formik
            initialValues={{
                searchBar: ''
            }}
            validationSchema={Yup.object({
                searchBar: Yup.string().required('This field is required')
            })}
            onSubmit={({searchBar}) => findChar(searchBar)}
        >
            <Form className="searching-form">
                <label htmlFor="searchBar" className="searching-form__title">Or find a character by name:</label>

                <div className="searching-form__search">
                    <Field 
                        id="searchBar"
                        name="searchBar"
                        type="text"
                        placeholder="Enter name"
                        className="searching-form__search-bar"
                    />
                    <button 
                        type="submit" 
                        className="button button__main"
                        disabled={process === 'loading'}>
                            <div className="inner">find</div>
                    </button>
                </div>
                {toPage}
                <ErrorMessage name="searchBar" className="searching-form__error" component="div" />
                { notFound ? <div className="searching-form__error">The character was not found. Check the name and try again</div> : null}
            </Form>
        </Formik>
    )
}

const Found = ({char}) => {
    const {name, id} = char;

    return (
        <div className="searching-form__found">
            <div className="searching-form__found-message">There is! Visit {name} page?</div>
            <Link to={`characters/${id}/`} className="button button__secondary">
                <div className="inner">to page</div>
            </Link>
        </div>
    )
}

export default SearchingForm;