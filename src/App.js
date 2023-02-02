import "./App.css";
import FileExplorerHome from "./pages/FileExplorerHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditFileModal from "./components/EditFileModal/EditFileModal";

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
                            <EditFileModal />
                        </div>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
