import AppBanner from "../appBanner/AppBanner";
import SingleCharacter from '../singleCharacter/SingleCharacter';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const CharacterPage = () => {
    return (
        <>
            <AppBanner/>
            <ErrorBoundary>
                <SingleCharacter/>
            </ErrorBoundary>
        </>
    )
};

export default CharacterPage;