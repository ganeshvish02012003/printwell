import React, { useEffect } from "react";
import ViewKanbanBoardPage from "../components/pageKanbanBoard/ViewKanbanBoardPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const ViewDesginBoardPage = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN && user?.role !== ROLE.EMPLOYEE) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <ViewKanbanBoardPage
      mainStatus="Desgin"
      subStatuses={[
        "To Do",
        "Designer 1",
        "Designer 2",
        "Proof",
        "Final",
        "Print",
        "send to print",
      ]}
      printSubStatus="Print"

    />
  );
};

export default ViewDesginBoardPage;
