import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/signUp";
import AdminPanal from "../pages/AdminPanel";
import AllUser from "../components/AdminCompoments/AllUser";
import AllJob from "../components/AdminCompoments/AllJob";
import AllCustomer from "../components/AdminCompoments/AllCustomer";
import ViewDesginBoardPage from "../pages/ViewDesginBoardPage";
import ViewPrintBoardPage from "../pages/ViewPrintBoardPage";
import ViewBindBoardpage from "../pages/ViewBindBoardpage";
import ViewFinishedBoardPage from "../pages/ViewFinishedBoardPage";
import MenageJobCard from "../components/AdminCompoments/MenageJobCard";
import PeymentStatus from "../components/AdminCompoments/PeymentStatus";
import JobHistory from "../components/AdminCompoments/JobHistory";
import JobCategory from "../components/AdminComponents/JobCategory";
import WellComePage from "../pages/WellComePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <WellComePage/>,
      },
      {
        path: "/Home",
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
        path: "Home/admin-panel",
        element: <AdminPanal />,
        _children: [
          {
            path: "all-user",
            element: <AllUser />,
          },
          {
            path: "all-job",
            element: <AllJob />,
          },
          {
            path: "all-customer",
            element: <AllCustomer />,
          },
          {
            path: "Menage-Job-Card",
            element: <MenageJobCard />,
          },
          {
            path: "Peyment-Status",
            element: <PeymentStatus />,
          },
          {
            path: "Job-History",
            element: <JobHistory />,
          },
          {
            path: "Job-Category",
            element: <JobCategory />,
          },
        ],
        get children() {
          return this._children;
        },
        set children(value) {
          this._children = value;
        },
      },
      {
        path: "Home/view-board/Printing",
        element: <ViewPrintBoardPage />,
      },
      {
        path: "Home/view-board/Desgin",
        element: <ViewDesginBoardPage />,
      },
      {
        path: "Home/view-board/Other_work",
        element: <ViewBindBoardpage />,
      },
      {
        path: "Home/view-board/Completed",
        element: <ViewFinishedBoardPage />,
      },
    ],
  },
]);
export default router;
