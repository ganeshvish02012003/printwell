import React, { useEffect } from "react";
import ViewKanbanBoardPage from "../components/pageKanbanBoard/ViewKanbanBoardPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const ViewFinishedBoardPage = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN && user?.role !== ROLE.EMPLOYEE) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <ViewKanbanBoardPage
      mainStatus="Completed"
      subStatuses={[
        "recent_job_end",
        "Draw Bill",
        "For Dispatch",
        "Store",
        "Out_of_Stock",
      ]}
      printSubStatus="Out_of_Stock"
      color="bg-gradient-to-r from-[#66BB6A] to-[#C8E6C9]"
       text="text-green-900"
       gradientColor="#66BB6A"
    />
  );
};

export default ViewFinishedBoardPage;
