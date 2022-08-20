import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ListSearchProject from "./project/ListSearchProject";
import CrudFormListProject from "./project/CrudFormListProject";
import CrudFormListTaskEntry from "./taskEntry/CrudFormListTaskEntry";
import ListSearchTask from "./taskEntry/ListSearchTask";
import CrudFormListClient from "./client/CrudFormListClient";
import GraphBar from "./graphs/GraphBar";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import BarChart from "./graphs/BarChart";
import ProtectedComponent from "./components/ProtectedComponent";
function App() {
  return (
    <>
      <AuthProvider>
        <ProtectedComponent>
          <Header />
        </ProtectedComponent>

        <Routes>
          {/* //!LOGIN*/}
          <Route path="/login" element={<Login />} />

          {/* //!HOME */}
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* //!CLIENT  */}
          <Route
            exact
            path="/form-client"
            element={
              <ProtectedRoute>
                <CrudFormListClient />
              </ProtectedRoute>
            }
          />

          {/* //!PROJECT */}
          <Route
            exact
            path="/form-project"
            element={
              <ProtectedRoute>
                <CrudFormListProject />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/list-search-project"
            element={
              <ProtectedRoute>
                <ListSearchProject />
              </ProtectedRoute>
            }
          />

          {/* //!TASK ENTRY*/}
          <Route
            exact
            path="/form-tack"
            element={
              <ProtectedRoute>
                <CrudFormListTaskEntry />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/list-search-task"
            element={
              <ProtectedRoute>
                <ListSearchTask />
              </ProtectedRoute>
            }
          />

          {/* //!GRAPH*/}
          <Route
            exact
            path="/graph-by-client"
            element={
              <ProtectedRoute>
                <BarChart />
              </ProtectedRoute>
            }
          />

          {/* //!REGISTER*/}
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
