import "./App.css";
import FileExplorerHome from "./pages/FileExplorerHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<FileExplorerHome />}></Route>
                    <Route
                        path="/:folderName"
                        element={<FileExplorerHome />}
                    ></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
