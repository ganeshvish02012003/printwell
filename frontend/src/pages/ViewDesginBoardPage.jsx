import React from "react";
import ViewKanbanBoardPage from "../components/pageKanbanBoard/ViewKanbanBoardPage";

const ViewDesginBoardPage = () => {
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
