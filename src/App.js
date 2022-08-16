import { Route, Routes } from "react-router-dom"; //Route es el path donde debe renderizarse el elemento, ROUTES para indicar todas las rutas de la app y las envuelve
import Header from "./components/Header";
import Home from "./components/Home";
import ListSearchProject from "./project/ListSearchProject";
import CrudFormListProject from "./project/CrudFormListProject";
import CrudFormListTaskEntry from "./taskEntry/CrudFormListTaskEntry";
import ListSearchTask from "./taskEntry/ListSearchTask"; //TODO hacerlaaaa

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* //!HOME */}
        <Route exact path="/" element={<Home />} />

        {/* //todo: CLIENT  */}
        <Route exact path="/clients" element={<clients />} />

        {/* //!PROJECT */}
        <Route exact path="/form-project" element={<CrudFormListProject />} />
        <Route
          exact
          path="/list-search-project"
          element={<ListSearchProject />}
        />

        {/* //!TASK ENTRY*/}
        <Route exact path="/form-tack" element={<CrudFormListTaskEntry />} />
        <Route exact path="/list-search-task" element={<ListSearchTask />} />
      </Routes>
    </>
  );
}
//los COMPONENTES (funcion sin ejecutar) devuelven ELEMENTOS (la tag)
export default App;
