import { Route, Routes } from "react-router-dom"; //Route es el path donde debe renderizarse el elemento, ROUTES para indicar todas las rutas de la app y las envuelve
import ProjectForm from "./components/ProjectForm";
import Header from "./components/Header";
import Home from "./components/Home";
import FormProject from "./project/FormProject";
import CrudTable from "./project/CrudTable";
import CrudApp from "./project/CrudApp";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Reports" element={<ProjectForm />} />

        {/* <Route exact path="/form-project" element={<ProjectForm />} /> */}
        <Route exact path="/form-project" element={<FormProject />} />
        <Route exact path="/table-project" element={<CrudTable />} />
      </Routes>
    </>
  );
}
//los COMPONENTES (funcion sin ejecutar) devuelven ELEMENTOS (la tag)
export default App;
