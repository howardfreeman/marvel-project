import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, SingleComicPage, Page404 } from "../pages";

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='marvel-project/' element={<MainPage/>} />
                        <Route path='marvel-project/comics/' element={<ComicsPage/>} />
                        <Route path='marvel-project/comics/:comicId' element={<SingleComicPage/>} />
                        <Route path='*' element={<Page404/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;