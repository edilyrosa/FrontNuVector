import { Route, Routes } from "react-router-dom";
import ProjectForm from "./components/ProjectForm";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/Reports" element={<ProjectForm />} />

        <Route exact path="/FormAddAsset" element={<ProjectForm />} />
        <Route exact path="/TableAssets" element={<ProjectForm />} />
      </Routes>
    </>
  );
}

export default App;
