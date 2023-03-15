import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { Page404 } from "../pages";
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const CharacterPage = lazy(() => import('../pages/CharacterPage'));

const App = () => {
    const home = 'marvel-project';

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>} >
                        <Routes>
                            <Route path={home + '/'} element={<MainPage/>} />
                            <Route path={home + '/comics/'} element={<ComicsPage/>} />
                            <Route path={home + '/comics/:comicId'} element={<SingleComicPage/>} />
                            <Route path={home + '/characters/:charId'} element={<CharacterPage/>} />
                            <Route path='*' element={<Page404/>} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;