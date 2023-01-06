import SingleComic from '../singleComic/SingleComic';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const SingleComicPage = () => {
    return (
        <ErrorBoundary>
            <SingleComic/>
        </ErrorBoundary>
    )
}

export default SingleComicPage;