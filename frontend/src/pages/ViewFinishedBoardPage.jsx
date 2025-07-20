import React from "react";
import ViewKanbanBoardPage from "../components/pageKanbanBoard/ViewKanbanBoardPage";

const ViewFinishedBoardPage = () => {
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
    />
  );
};

export default ViewFinishedBoardPage;
