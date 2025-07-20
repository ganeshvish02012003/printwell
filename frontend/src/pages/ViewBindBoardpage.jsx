import React from "react";
import ViewKanbanBoardPage from "../components/pageKanbanBoard/ViewKanbanBoardPage";

const ViewBindBoardpage = () => {
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
    />
  );
};

export default ViewBindBoardpage;
