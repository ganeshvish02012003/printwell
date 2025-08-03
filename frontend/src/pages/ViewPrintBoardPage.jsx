import React, { useEffect } from "react";
import ViewKanbanBoardPage from "../components/pageKanbanBoard/ViewKanbanBoardPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const ViewPrintBoardPage = () => {
    const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN && user?.role !== ROLE.EMPLOYEE) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <ViewKanbanBoardPage
      mainStatus="Printing"
      subStatuses={[
        // "print To Do",
        "Print",
        "SWIFT 1",
        "SWIFT 2",
        "SWIFT 3",
        "SAHIL",
        "RULLING",
        "SCREEN",
        "RISO",
        "RISO COM COLOR",
        "KONICA MINOLTA",
        "Binding",
      ]}
      printSubStatus="Binding"
      color="bg-gradient-to-r from-[#03A9F4] to-[#B3E5FC]" 
      text="text-blue-900"
    />
  );
};

export default ViewPrintBoardPage;
