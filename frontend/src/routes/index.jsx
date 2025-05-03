import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/signUp";
import AdminPanal from "../pages/AdminPanel"
import AllUser from "../pages/AllUser";
import AllJob from "../pages/AllJob";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
     
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "admin-panel",
        element: <AdminPanal/>,
        children: [
          {
            path: "all-user",
            element: <AllUser />,
          },
          {
            path: "all-job",
            element: <AllJob />,
          },
        ],
      },
    ],
  },
]);
export default router;
