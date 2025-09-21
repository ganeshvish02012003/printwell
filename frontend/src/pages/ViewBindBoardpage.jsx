import React, { useEffect } from "react";
import ViewKanbanBoardPage from "../components/pageKanbanBoard/ViewKanbanBoardPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const ViewBindBoardpage = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN && user?.role !== ROLE.EMPLOYEE) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <ViewKanbanBoardPage
      mainStatus="Other_work"
      subStatuses={[
        "Binding",
        "To Binding",
        "Cutting",
        "perfeting",
        "Lamination",
        "Finished",
      ]}
      printSubStatus="Finished"
      color="bg-gradient-to-r from-[#FFD54F] to-[#FFF7B2]" 
      text="text-yellow-900"
      gradientColor="#FFD54F"
    />
  );
};

export default ViewBindBoardpage;
