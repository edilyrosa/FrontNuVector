import { Route, Routes } from "react-router-dom"; //Route es el path donde debe renderizarse el elemento, ROUTES para indicar todas las rutas de la app y las envuelve
import ProjectForm from "./components/ProjectForm";
import Header from "./components/Header";
import Home from "./components/Home";
import ListSearchProject from "./project/ListSearchProject";
import CrudFormListProject from "./project/CrudFormListProject";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Reports" element={<ProjectForm />} />

        {/* <Route exact path="/form-project" element={<FormProject />} /> */}
        <Route exact path="/form-project" element={<CrudFormListProject />} />
        <Route
          exact
          path="/list-search-project"
          element={<ListSearchProject />}
        />
      </Routes>
    </>
  );
}
//los COMPONENTES (funcion sin ejecutar) devuelven ELEMENTOS (la tag)
export default App;
