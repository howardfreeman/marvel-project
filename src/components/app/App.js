import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { Page404 } from "../pages";
import Spinner from '../spinner/Spinner';

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>} >
                        <Routes>
                            <Route path='marvel-project/' element={<MainPage/>} />
                            <Route path='marvel-project/comics/' element={<ComicsPage/>} />
                            <Route path='marvel-project/comics/:comicId' element={<SingleComicPage/>} />
                            <Route path='*' element={<Page404/>} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;