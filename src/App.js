import "./App.css";
import FileExplorerHome from "./pages/FileExplorerHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Files from "./components/Files/Files";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="App">
                            <FileExplorerHome />
                        </div>
                    }
                ></Route>
				<Route
                    path="/:folderName"
                    element={
                        <div className="App">
                            <FileExplorerHome />
                        </div>
                    }
                ></Route>
                <Route
                    path="/:folderName/:fileName"
                    element={
                        <div className="App">
                            <Files />
                        </div>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
